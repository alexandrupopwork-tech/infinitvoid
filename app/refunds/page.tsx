import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `How returns and refunds work for ${SITE_NAME} orders.`,
  alternates: { canonical: `${SITE_URL}/refunds` },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updated="6 September 2026">
      <p>
        {SITE_URL} is currently a pre-launch waitlist — no purchases can be made yet. This policy
        describes how returns and refunds will work once the first drop opens, so it&rsquo;s clear
        before you buy.
      </p>

      <section>
        <h2>1. Your 14-day right of withdrawal</h2>
        <p>
          If you are a consumer ordering from within the EU, you can cancel your order for any
          reason within <strong>14 calendar days</strong> of receiving it, under the EU Consumer
          Rights Directive. To do this, email{" "}
          <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a> with your order
          number and, once we confirm, send the item back to us within 14 days of telling us.
        </p>
      </section>

      <section>
        <h2>2. Condition of returned items</h2>
        <ul>
          <li>Items must be unworn, unwashed, and returned with any original tags attached.</li>
          <li>You are responsible for the item until it reaches us, so we recommend a tracked shipping method.</li>
          <li>
            If a returned item shows signs of wear beyond what&rsquo;s needed to check it fits, we
            may deduct a reasonable amount from your refund to reflect that reduced value — this
            is standard under EU consumer law and not a way to avoid genuine returns.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Refund timing and method</h2>
        <p>
          We refund the price paid (including standard delivery cost) to your original payment
          method within 14 days of receiving the returned item back, or of you providing proof of
          postage — whichever is earlier.
        </p>
      </section>

      <section>
        <h2>4. Faulty or incorrect items</h2>
        <p>
          If an item arrives damaged, faulty, or different from what you ordered, contact{" "}
          <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a> with photos as
          soon as possible. We&rsquo;ll cover return shipping for genuine faults and offer a
          replacement, repair, or full refund as appropriate — this is separate from, and in
          addition to, your 14-day withdrawal right above.
        </p>
      </section>

      <section>
        <h2>5. Exchanges</h2>
        <p>
          Because each drop is a limited run, we may not be able to offer a like-for-like exchange
          once a size sells out. Where possible we&rsquo;ll offer an exchange; otherwise we&rsquo;ll
          process a refund under the standard return process above.
        </p>
      </section>

      <section>
        <h2>6. Questions</h2>
        <p>
          Email <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a> — see also
          our <a href="/terms">Terms &amp; Conditions</a>.
        </p>
      </section>
    </LegalPage>
  );
}
