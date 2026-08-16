import Link from "next/link";
import { CONTACT, SITE_NAME } from "@/lib/site-config";
import ManageCookiePreferencesButton from "./ManageCookiePreferencesButton";

const LAST_UPDATED = "August 16, 2026";

const SECTIONS = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-it", label: "How We Use Your Information" },
  { id: "cookies", label: "Cookies & Similar Technologies" },
  { id: "third-parties", label: "Third-Party Services" },
  { id: "data-retention-security", label: "Data Retention & Security" },
  { id: "your-rights", label: "Your Rights & Choices" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact-us", label: "Contact Us" },
];

const PrivacyPolicy = () => {
  return (
    <div className="row">
      <div className="col-md-8 col-xl-9">
        <div className="terms_condition_grid">
          <div className="grids mb60">
            <h4 className="title">Privacy Policy</h4>
            <p className="mb25">
              This Privacy Policy explains how {SITE_NAME} (&quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects
              information when you browse our listings, submit an inquiry, or
              add a listing on this website. By using this site, you agree to
              the practices described below.
            </p>
            <p className="mb0">
              <strong>Last updated:</strong> {LAST_UPDATED}
            </p>
          </div>

          <div id="information-we-collect" className="grids mb60">
            <h4 className="title">Information We Collect</h4>
            <p className="mb25">We collect information in a few ways:</p>
            <ul className="mb25">
              <li>
                <strong>Information you provide directly</strong> — such as
                your name, email address, phone number, and message content
                when you submit a quote request, contact form, or WhatsApp
                inquiry.
              </li>
              <li>
                <strong>Listing information</strong> — when you add a vehicle,
                auto part, or trade goods listing through our dashboard,
                including any photos, descriptions, and pricing you upload.
              </li>
              <li>
                <strong>Automatically collected data</strong> — basic
                technical information such as your browser type, device type,
                pages visited, and approximate location, typically gathered
                through cookies and similar technologies (see the Cookies
                section below).
              </li>
            </ul>
            <p className="mb0">
              We do not knowingly collect sensitive personal information
              (such as government ID numbers, financial account details, or
              health data) through this website.
            </p>
          </div>

          <div id="how-we-use-it" className="grids mb60">
            <h4 className="title">How We Use Your Information</h4>
            <p className="mb25">We use the information we collect to:</p>
            <ul className="mb0">
              <li>Respond to your inquiries and quote requests;</li>
              <li>Publish and manage listings you submit;</li>
              <li>Coordinate sourcing, shipping, and export logistics for buyers;</li>
              <li>
                Operate, maintain, and improve the website, including
                understanding how visitors use it;
              </li>
              <li>
                Communicate with you about your inquiry, listing, or account,
                including via WhatsApp when you choose to contact us that way;
              </li>
              <li>Detect, prevent, and address technical issues or misuse.</li>
            </ul>
          </div>

          <div id="cookies" className="grids mb60">
            <h4 className="title">Cookies &amp; Similar Technologies</h4>
            <p className="mb25">
              We use cookies and similar technologies to keep the site
              working correctly, remember your preferences (such as your
              chosen language), and understand how the site is used. Cookies
              generally fall into these categories:
            </p>
            <ul className="mb25">
              <li>
                <strong>Necessary</strong> — required for core site
                functionality (navigation, security, remembering your cookie
                choice). These cannot be turned off.
              </li>
              <li>
                <strong>Analytics</strong> — help us understand visitor
                behaviour so we can improve the site.
              </li>
              <li>
                <strong>Marketing</strong> — help us measure and improve
                inquiries, such as quote requests and WhatsApp conversations.
              </li>
            </ul>
            <p className="mb25">
              You can accept all cookies, reject non-essential cookies, or
              choose exactly which categories to allow. Your choice is asked
              once, the first time you visit — to change it later, use the
              button below.
            </p>
            <ManageCookiePreferencesButton />
          </div>

          <div id="third-parties" className="grids mb60">
            <h4 className="title">Third-Party Services</h4>
            <p className="mb25">
              We work with a small number of trusted service providers to run
              this website, including:
            </p>
            <ul className="mb25">
              <li>
                Hosting and database providers, used to store listing data
                and, where applicable, uploaded images;
              </li>
              <li>
                WhatsApp, when you choose to start a conversation with us
                through a WhatsApp link on this site — that conversation is
                subject to WhatsApp&apos;s own privacy policy;
              </li>
              <li>
                Analytics providers, where enabled, used only if you have
                allowed analytics cookies.
              </li>
            </ul>
            <p className="mb0">
              These providers only receive the information necessary to
              perform their function for us and are not permitted to use your
              information for their own independent purposes.
            </p>
          </div>

          <div id="data-retention-security" className="grids mb60">
            <h4 className="title">Data Retention &amp; Security</h4>
            <p className="mb25">
              We keep inquiry and listing data for as long as reasonably
              necessary to fulfil the purposes described in this policy, or
              as required by law. We use reasonable technical and
              organisational measures to protect your information, but no
              method of transmission or storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </div>

          <div id="your-rights" className="grids mb60">
            <h4 className="title">Your Rights &amp; Choices</h4>
            <p className="mb25">
              Depending on where you are located, you may have the right to
              request access to, correction of, or deletion of the personal
              information we hold about you, or to object to certain
              processing. To make a request, contact us using the details
              below — we will respond within a reasonable timeframe.
            </p>
            <p className="mb0">
              You can also withdraw cookie consent at any time using the
              &quot;Manage Cookie Preferences&quot; button in the Cookies
              section above, and you can control cookies through your browser
              settings.
            </p>
          </div>

          <div id="children" className="grids mb60">
            <h4 className="title">Children&apos;s Privacy</h4>
            <p className="mb0">
              This website is intended for business and trade use and is not
              directed at children. We do not knowingly collect personal
              information from children.
            </p>
          </div>

          <div id="changes" className="grids mb60">
            <h4 className="title">Changes to This Policy</h4>
            <p className="mb0">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for legal reasons. We will update
              the &quot;Last updated&quot; date above when we do. We encourage
              you to review this page periodically.
            </p>
          </div>

          <div id="contact-us" className="grids mb0">
            <h4 className="title">Contact Us</h4>
            <p className="mb0">
              If you have questions about this Privacy Policy or how your
              information is handled, contact us at{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>,{" "}
              <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}>
                {CONTACT.phone}
              </a>
              , or {CONTACT.address}. See also our{" "}
              <Link href="/terms-conditions">Terms &amp; Conditions</Link>.
            </p>
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-md-4 col-xl-3">
        <div className="terms_condition_widget">
          <div className="widget_list">
            <h5 className="title">On This Page</h5>
            <ul className="list_details">
              {SECTIONS.map((section) => (
                <li className="single-list" key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
