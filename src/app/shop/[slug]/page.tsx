import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import Footer from "@/app/layout/Footer";
import ProductDetails from "@/components/product/ProductDetails";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetails product={product} />
      <Footer />
    </>
  );
}
