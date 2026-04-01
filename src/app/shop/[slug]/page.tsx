// src/app/shop/page.tsx
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';
import ProductDetails from '@/components/product/ProductDetails';

interface PageProps {
    params: { slug: string };
}

export default function ProductPage({ params }: PageProps) {
    const product = getProductById(params.slug);

    if (!product) {
        notFound();
    }

    return <ProductDetails product={product} />;
}