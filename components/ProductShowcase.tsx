import ProductCard from "@/components/ProductCard";
import { PRODUCT } from "@/lib/config";

export default function ProductShowcase() {
  return (
    <section id="collection" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
        <span className="text-xs tracking-[0.4em] text-cyan uppercase">A Glimpse Inside</span>
        <h2 className="mt-4 font-display text-4xl tracking-wide text-ghost sm:text-5xl md:text-6xl">
          {PRODUCT.name}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ghost-dim sm:text-base">
          {PRODUCT.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-10">
        {PRODUCT.images.map((image, index) => (
          <ProductCard key={image.id} label={image.label} image={image.src} index={index} />
        ))}
      </div>
    </section>
  );
}
