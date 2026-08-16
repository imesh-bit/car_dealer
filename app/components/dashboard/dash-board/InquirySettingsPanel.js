"use client";

import { useEffect, useState } from "react";

const defaultSettings = {
  defaultCurrency: "JPY",
  currencies: {
    JPY: { symbol: "¥", label: "Japanese Yen (JPY)", rate: 1, decimals: 0 },
    USD: { symbol: "$", label: "US Dollar (USD)", rate: 0.0067, decimals: 2 },
    EUR: { symbol: "€", label: "Euro (EUR)", rate: 0.0062, decimals: 2 },
    GBP: { symbol: "£", label: "British Pound (GBP)", rate: 0.0053, decimals: 2 },
    LKR: { symbol: "Rs.", label: "Sri Lankan Rupee (LKR)", rate: 2.05, decimals: 0 },
    INR: { symbol: "₹", label: "Indian Rupee (INR)", rate: 0.56, decimals: 0 },
  },
  portRates: {
    "Sri Lanka": [
      { name: "Colombo", price: 4379 },
      { name: "Hambantota", price: 4799 },
      { name: "Galle", price: 4599 },
    ],
    "South Africa": [
      { name: "Durban", price: 6850 },
      { name: "Cape Town", price: 7200 },
      { name: "Port Elizabeth", price: 6980 },
    ],
    Japan: [
      { name: "Yokohama", price: 9050 },
      { name: "Kobe", price: 9200 },
      { name: "Nagoya", price: 9400 },
    ],
  },
};

const InquirySettingsPanel = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/inquiry-settings", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (data && typeof data === "object") {
          setSettings({
            ...defaultSettings,
            ...data,
            currencies: { ...defaultSettings.currencies, ...(data.currencies || {}) },
            portRates: data.portRates || defaultSettings.portRates,
          });
        }
      } catch (error) {
        console.error("Failed to load inquiry settings", error);
      }
    };

    loadSettings();
  }, []);

  const handleCurrencyChange = (code, field, value) => {
    setSettings((prev) => ({
      ...prev,
      currencies: {
        ...prev.currencies,
        [code]: {
          ...prev.currencies[code],
          [field]: field === "rate" || field === "decimals" ? Number(value) : value,
        },
      },
    }));
  };

  const handlePortPriceChange = (country, index, value) => {
    setSettings((prev) => {
      const nextRates = { ...prev.portRates };
      nextRates[country] = (nextRates[country] || []).map((port, portIndex) =>
        portIndex === index ? { ...port, price: Number(value) } : port
      );
      return { ...prev, portRates: nextRates };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus("");

    try {
      const response = await fetch("/api/inquiry-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setStatus("Inquiry settings saved.");
    } catch (error) {
      console.error("Failed to save inquiry settings", error);
      setStatus("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="application_statics mt50">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb25">
        <div>
          <h4 className="mb-1">Inquiry Settings</h4>
          <p className="mb-0 text-muted">Update the default display currency and port price values.</p>
        </div>
        <button type="button" className="btn btn-thm" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {status && (
        <div className="alert alert-light border mb20" role="alert">
          {status}
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="mb20">Default Currency</h5>
              <div className="form-group mb0">
                <label className="form-label fz13 fw-semibold">Display Currency</label>
                <select
                  className="form-control form-control-sm"
                  value={settings.defaultCurrency}
                  onChange={(event) =>
                    setSettings((prev) => ({
                      ...prev,
                      defaultCurrency: event.target.value,
                    }))
                  }
                >
                  {Object.entries(settings.currencies || {}).map(([code, currency]) => (
                    <option key={code} value={code}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="mb20">Currency Rates</h5>
              <div className="table-responsive">
                <table className="table table-sm mb0">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Symbol</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(settings.currencies || {}).map(([code, currency]) => (
                      <tr key={code}>
                        <td>{code}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={currency.symbol}
                            onChange={(event) =>
                              handleCurrencyChange(code, "symbol", event.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.0001"
                            className="form-control form-control-sm"
                            value={currency.rate}
                            onChange={(event) =>
                              handleCurrencyChange(code, "rate", event.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mt30">
        <div className="card-body p-4">
          <h5 className="mb20">Port Prices</h5>
          <div className="row g-3">
            {Object.entries(settings.portRates || {}).map(([country, ports]) => (
              <div key={country} className="col-lg-6">
                <div className="border rounded-3 p-3 h-100">
                  <h6 className="mb20">{country}</h6>
                  {(ports || []).map((port, index) => (
                    <div key={`${country}-${port.name}-${index}`} className="d-flex align-items-center gap-2 mb10">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={port.name}
                        readOnly
                        style={{ maxWidth: 150 }}
                      />
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={port.price}
                        onChange={(event) =>
                          handlePortPriceChange(country, index, event.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquirySettingsPanel;
