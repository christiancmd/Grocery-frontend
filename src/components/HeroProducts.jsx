import { useEffect, useState } from "react";
import ProductCard from "./Card/ProductCard";
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

  return (
    <section className="w-full flex-1 overflow-y-auto">
      <div className="w-full min-h-full bg-gray-900 text-white flex flex-col items-center py-10 px-4 gap-7">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Bienvenido a Nuestra Tienda
        </h1>
        <article className="w-full max-w-6xl grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-lg">
              Datos no encontrados
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
