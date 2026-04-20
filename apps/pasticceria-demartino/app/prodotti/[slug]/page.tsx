import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { CartDrawer } from "@/app/components/CartDrawer";
import { ProductDetail } from "./ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 3);

  return (
    <main>
      <Navbar />
      <div className="bg-[var(--color-ivory)] px-6 py-4 text-sm text-[var(--color-muted)]">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[var(--color-coffee)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#catalogo" className="hover:text-[var(--color-coffee)]">
            Dolci
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-coffee)]">{product.name}</span>
        </div>
      </div>

      <ProductDetail product={product} related={related} />

      <Footer />
      <CartDrawer />
    </main>
  );
}
