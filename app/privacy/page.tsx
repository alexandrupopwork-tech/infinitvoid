import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your personal data.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="6 September 2026">
        <p>
          This policy explains what personal data {SITE_NAME} ({BUSINESS.legalName}, trading as{" "}
          {BUSINESS.tradingAs}) collects through {SITE_URL}, why, and what rights you have over it.
          We are established in {BUSINESS.country} and process data in line with the EU General
          Data Protection Regulation (GDPR) and the Belgian Act of 30 July 2018 on the protection
          of natural persons with regard to the processing of personal data.
        </p>

        <section>
          <h2>1. Who we are</h2>
          <p>
            {BUSINESS.legalName}, trading as {SITE_NAME}, is the data controller for information
            collected through this site. You can reach us at{" "}
            <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a>
            {BUSINESS.address ? <> or at {BUSINESS.address}</> : null}.
          </p>
        </section>

        <section>
          <h2>2. What we collect</h2>
          <p>We only collect what the site actually needs to function:</p>
          <ul>
            <li>
              <strong>Waitlist email address</strong> — when you submit the notify-me form, we
              store your email address and the date you joined.
            </li>
            <li>
              <strong>Basic technical logs</strong> — our hosting provider (Vercel) automatically
              records standard request logs (e.g. IP address, browser type, timestamps) for
              security and reliability, as any web server does. We do not use this for tracking
              or advertising.
            </li>
          </ul>
          <p>
            We do not collect your name, phone number, physical address, or payment details
            through the waitlist form. We do not run any analytics, advertising, or tracking
            scripts on this site.
          </p>
        </section>

        <section>
          <h2>3. Why we process it, and our legal basis</h2>
          <ul>
            <li>
              <strong>Sending you the launch notification and drop updates</strong> — legal basis:
              your consent, given when you submit the form (GDPR Art. 6(1)(a)). You can withdraw
              this at any time.
            </li>
            <li>
              <strong>Keeping the site secure and working</strong> — legal basis: our legitimate
              interest in operating a functioning, secure website (GDPR Art. 6(1)(f)).
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Who we share it with</h2>
          <p>We use a small number of processors to run the site. None of them may use your data for their own purposes:</p>
          <ul>
            <li>
              <strong>Supabase</strong> (hosted in the EU, Ireland) — stores the waitlist database.
            </li>
            <li>
              <strong>Resend</strong> — sends the waitlist confirmation email on our behalf.
            </li>
            <li>
              <strong>Vercel</strong> — hosts the website itself.
            </li>
          </ul>
          <p>
            Where a processor is located outside the EU/EEA, we rely on that provider&rsquo;s
            Standard Contractual Clauses or equivalent safeguards for the transfer. We do not sell
            or rent your data to anyone, ever.
          </p>
        </section>

        <section>
          <h2>5. How long we keep it</h2>
          <p>
            We keep your waitlist email until the first drop has launched and any related
            communications are complete, or until you unsubscribe or ask us to delete it —
            whichever comes first.
          </p>
        </section>

        <section>
          <h2>6. Your rights</h2>
          <p>Under the GDPR, you can ask us to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data (&ldquo;right to be forgotten&rdquo;)</li>
            <li>Restrict or object to processing</li>
            <li>Receive your data in a portable format</li>
            <li>Withdraw consent at any time, without affecting past processing</li>
          </ul>
          <p>
            To exercise any of these, email{" "}
            <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a>. You also have
            the right to lodge a complaint with the Belgian Data Protection Authority (
            <a href="https://www.dataprotectionauthority.be" target="_blank" rel="noopener noreferrer">
              www.dataprotectionauthority.be
            </a>
            ) or your local supervisory authority.
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            See our <a href="/cookies">Cookie Policy</a> for details on the one strictly-necessary
            cookie this site uses.
          </p>
        </section>

        <section>
          <h2>8. Children</h2>
          <p>This site is not directed at children, and we do not knowingly collect data from anyone under 16.</p>
        </section>

        <section>
          <h2>9. Changes to this policy</h2>
          <p>
            If this policy changes, we&rsquo;ll update the date at the top of this page. Material
            changes will be communicated to waitlist subscribers by email.
          </p>
        </section>
    </LegalPage>
  );
}
