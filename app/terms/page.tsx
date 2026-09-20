import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern use of ${SITE_NAME} and any purchase made through it.`,
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="6 September 2026">
      <p>
        These terms govern your use of {SITE_URL} and any purchase you make through it. By using
        the site or joining the waitlist, you agree to them. {SITE_NAME} is operated by{" "}
        {BUSINESS.legalName}, trading as {SITE_NAME}, {BUSINESS.country}.
      </p>

      <section>
        <h2>1. The site, right now</h2>
        <p>
          {SITE_URL} is currently taking pre-orders for its first drop. Production is underway;
          pre-orders ship as soon as it&rsquo;s complete, and we email you the moment that happens.
          The sections below on orders, pricing, and withdrawal apply to these purchases. You can
          also still submit your email to be notified without ordering.
        </p>
      </section>

      <section>
        <h2>2. Orders, pricing, and pre-orders</h2>
        <ul>
          <li>Prices are shown in the currency displayed at checkout and include applicable VAT unless stated otherwise.</li>
          <li>An order is only accepted once we confirm it by email — adding an item to a cart is not an acceptance of an offer.</li>
          <li>Every order placed while the first drop is in production is a pre-order: payment is taken at checkout, and the item ships once production and quality checks are complete. We email you the moment your order ships.</li>
          <li>We may limit quantities per customer to keep a limited drop fair to everyone on the waitlist.</li>
          <li>If an item is listed at an incorrect price due to an error, we may cancel the order and refund you in full.</li>
        </ul>
      </section>

      <section>
        <h2>3. Your right of withdrawal (EU consumers)</h2>
        <p>
          If you are a consumer buying from within the EU, you have a legal right to withdraw from
          an online purchase within <strong>14 calendar days</strong> of receiving your order,
          without giving a reason, under the EU Consumer Rights Directive (2011/83/EU) as
          implemented in Belgian law. To withdraw, email{" "}
          <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a> within that
          window. See our <a href="/refunds">Refund Policy</a> for how returns and refunds are
          handled in practice.
        </p>
        <p>
          This right does not apply to goods made to your specification or clearly personalised,
          or to sealed goods unsealed after delivery for hygiene reasons, to the extent any such
          items are ever sold here.
        </p>
      </section>

      <section>
        <h2>4. Product descriptions</h2>
        <p>
          We describe pieces as accurately as we can, including materials and construction.
          Because pieces are produced in small runs, minor variations between the photos and the
          physical item (fabric texture, embroidery placement) can occur and are not a defect.
        </p>
      </section>

      <section>
        <h2>5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site for any unlawful purpose or to attempt to gain unauthorised access to it</li>
          <li>Scrape, resell, or misrepresent the content of the site</li>
          <li>Submit false information through the waitlist or checkout forms</li>
        </ul>
      </section>

      <section>
        <h2>6. Intellectual property</h2>
        <p>
          The {SITE_NAME} name, logo, graphics, and site content are owned by {BUSINESS.legalName}
          or used under licence. You may not reproduce or commercially use them without our
          written permission.
        </p>
      </section>

      <section>
        <h2>7. Liability</h2>
        <p>
          Nothing in these terms limits any liability that cannot legally be limited, including
          for fraud or death or personal injury caused by negligence. Subject to that, we are not
          liable for indirect or consequential losses arising from your use of the site.
        </p>
      </section>

      <section>
        <h2>8. Governing law</h2>
        <p>
          These terms are governed by Belgian law. If you are a consumer, this does not remove any
          protection given to you by the mandatory laws of the country where you live. Disputes
          are subject to the courts of Belgium, without prejudice to your right as a consumer to
          bring proceedings in your own country of residence, and to use the EU Online Dispute
          Resolution platform at{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
