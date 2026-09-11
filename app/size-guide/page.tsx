import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BUSINESS, PRODUCT, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Size Guide",
  description: `Measurements for the ${PRODUCT.name}.`,
  alternates: { canonical: `${SITE_URL}/size-guide` },
};

// Chest is confirmed against a reference oversized zip hoodie with the same
// relaxed fit we're going for, measured as full chest circumference (not
// flat pit-to-pit). Length and sleeve are still placeholders — replace once
// the real sample is measured.
const SIZE_CHART: Record<(typeof PRODUCT.sizes)[number], { chest: number; length: number; sleeve: number }> = {
  S: { chest: 99, length: 68, sleeve: 60 },
  M: { chest: 104, length: 70, sleeve: 62 },
  L: { chest: 109, length: 72, sleeve: 64 },
  XL: { chest: 114, length: 74, sleeve: 66 },
};

export default function SizeGuidePage() {
  return (
    <LegalPage title="Size Guide" updated="6 September 2026">
      <p>
        Measurements below are for the {PRODUCT.name}, in centimetres. It&rsquo;s an oversized,
        relaxed fit — if you&rsquo;re between sizes, size down for a closer fit or stay true to
        size for the full oversized look.
      </p>

      <section>
        <h2>Measurements (cm)</h2>
        <div className="overflow-x-auto">
          <table className="mt-2 w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-white/15 px-3 py-2.5 text-left text-ghost">Size</th>
                <th className="border-b border-white/15 px-3 py-2.5 text-right text-ghost">Chest</th>
                <th className="border-b border-white/15 px-3 py-2.5 text-right text-ghost">Length</th>
                <th className="border-b border-white/15 px-3 py-2.5 text-right text-ghost">Sleeve</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCT.sizes.map((size) => (
                <tr key={size}>
                  <td className="border-b border-white/5 px-3 py-2.5">{size}</td>
                  <td className="border-b border-white/5 px-3 py-2.5 text-right">{SIZE_CHART[size].chest} cm</td>
                  <td className="border-b border-white/5 px-3 py-2.5 text-right">{SIZE_CHART[size].length} cm</td>
                  <td className="border-b border-white/5 px-3 py-2.5 text-right">{SIZE_CHART[size].sleeve} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>How to measure</h2>
        <ul>
          <li><strong>Chest</strong> — wrap a tape measure around the fullest part of your chest, under your arms, keeping it level and relaxed (not pulled tight).</li>
          <li><strong>Length</strong> — from the highest point of the shoulder seam down to the hem.</li>
          <li><strong>Sleeve</strong> — from the shoulder seam to the end of the cuff.</li>
        </ul>
      </section>

      <section>
        <h2>Still unsure?</h2>
        <p>
          Email us at <a href={`mailto:${BUSINESS.contactEmail}`}>{BUSINESS.contactEmail}</a> with
          your usual size in other brands and we&rsquo;ll help you pick.
        </p>
      </section>
    </LegalPage>
  );
}
