import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `What cookies ${SITE_NAME} uses and why.`,
  alternates: { canonical: `${SITE_URL}/cookies` },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="6 September 2026">
      <p>
        {SITE_NAME} keeps cookies to a minimum. We do not run analytics, advertising, or
        third-party tracking scripts of any kind, so this page is short.
      </p>

      <section>
        <h2>1. The only cookie this site sets</h2>
        <p>
          If you are a visitor to {SITE_URL}, browsing the waitlist page and joining the list sets{" "}
          <strong>no cookies at all</strong>. The single cookie the site can set is a session cookie
          used to keep the site owner logged into the password-protected admin dashboard
          (<code>/admin</code>) — it is never set for regular visitors, contains no personal data
          about you, and exists purely to keep that internal page secure.
        </p>
        <p>
          Because this cookie is strictly necessary for that security function, it does not
          require consent under the ePrivacy rules (Article 5(3) of Directive 2002/58/EC, as
          implemented in Belgian law) — but we&rsquo;re telling you about it anyway, for
          transparency.
        </p>
      </section>

      <section>
        <h2>2. What we don&rsquo;t use</h2>
        <ul>
          <li>No Google Analytics or any other analytics tool</li>
          <li>No advertising or retargeting pixels</li>
          <li>No third-party embeds that could set their own cookies</li>
          <li>No cross-site tracking of any kind</li>
        </ul>
        <p>If that changes in the future, we will update this policy and add a consent banner before any non-essential cookie is set.</p>
      </section>

      <section>
        <h2>3. Fonts and local storage</h2>
        <p>
          Web fonts used on this site are bundled and served from our own domain at build time
          (not loaded from Google&rsquo;s servers at runtime), so no font-related request is sent
          to a third party. We do not currently use your browser&rsquo;s local storage either — if
          that ever changes for a genuine on-device convenience, we&rsquo;ll describe it here.
        </p>
      </section>

      <section>
        <h2>4. Questions</h2>
        <p>
          Email <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a> with any
          questions about cookies on this site. See also our <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>
    </LegalPage>
  );
}
