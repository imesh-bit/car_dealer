"use client";

import { OPEN_SETTINGS_EVENT } from "@/app/components/common/CookieConsent";

const ManageCookiePreferencesButton = () => {
  return (
    <button
      type="button"
      className="btn btn-thm btn-sm"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      Manage Cookie Preferences
    </button>
  );
};

export default ManageCookiePreferencesButton;
