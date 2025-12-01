import { api } from "@/lib/strapi";
import ProductCard from "@/app/components/ProductCard";

interface ProductsResponse {
  data: Array<{
    id: number;
    attributes: {
      name: string;
      description: string;
      price: number;
      images?: {
        data: Array<{
          id: number;
          attributes: {
            url: string;
            alternativeText?: string;
          };
        }>;
      };
      slug: string;
      inventory: number;
      category?: string;
      featured?: boolean;
    };
  }>;
}

export default async function StorePage() {
  const response = await api<ProductsResponse>(
    // Strapi field is "Images" (capital I) in this schema
    "/api/products?populate=Images&sort=createdAt:desc"
  );

  const products = response.data.map((item: any) => {
    // Strapi v5 may return flat fields (no attributes); support both
    const a: any = item?.attributes ?? item ?? {};

    // description is "blocks" in Strapi; pick a plain-text excerpt for cards
    const desc = Array.isArray(a?.description)
      ? (a.description.find((b: any) => b?.type === "paragraph")?.children || [])
          .map((c: any) => c?.text || "")
          .join(" ")
      : a?.description || "";

    // Normalize to the Product type our UI expects
    return {
      id: item.id,
      name: a?.Name || a?.name || "Untitled",
      description: desc,
      price: Number(a?.price ?? 0),
      images: Array.isArray(a?.Images)
        ? {
            data: a.Images.map((m: any) => ({
              id: m.id,
              attributes: {
                url: m.formats?.medium?.url || m.url,
                alternativeText: m.alternativeText || undefined,
              },
            })),
          }
        : a?.images, // already in { data: [...] } shape
      slug: a?.slug || String(item.id),
      inventory: Number(a?.inventory ?? 0),
      category: a?.category || a?.catagory,
      featured: Boolean(a?.featured),
    } as any;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Store</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      )}
    </main>
  );
}
