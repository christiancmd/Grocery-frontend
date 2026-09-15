import { useEffect, useState } from "react";
import ProductCard from "./card/ProductCard";
import { getAllProducts } from "../api/request";

export default function HeroProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getAllProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error al obtener los productos: ", error);
      }
    }

    loadProducts();
  }, []);

  const activeProducts = products?.filter((p) => p.is_active && p.stock > 0);

  return (
    <section className="w-full flex-1 overflow-y-auto bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <header className="mb-8 md:mb-10">
          <h1 className="text-sky-deep text-2xl md:text-3xl font-bold mb-2">
            Lo mejor para ti
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Explorá nuestra selección de productos de calidad.
          </p>
        </header>

        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {activeProducts && activeProducts.length > 0 ? (
            activeProducts.map((product, index) => (
              <ProductCard key={product.id ?? index} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500 py-10">
              No hay productos disponibles por el momento.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
