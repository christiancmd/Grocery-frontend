import { useEffect } from "react";
import Button from "../ui/Button";

export default function ProductCard({ index, product }) {
  useEffect(() => {
    if (
      !product ||
      typeof product !== "object" ||
      typeof product.name !== "string" ||
      typeof product.price !== "number" ||
      typeof product.stock !== "number" ||
      typeof product.is_active !== "boolean" ||
      typeof product.description !== "string"
    ) {
      console.warn("Error en el tipado de datos");
      return;
    }
  }, [product, index]);

  const { name, price, stock, is_active, description } = product;
  const category = product.category ? product.category.name : "Sin categoría";

  return (
    <>
      {is_active && stock > 0 && (
        <div
          key={index}
          className="w-78 sm:w-64 bg-white rounded-xl shadow-lg overflow-hidden transform border hover:shadow-blue-500 border-gray-100"
        >
          <div className="h-40 w-full bg-gray-600 flex items-center justify-center">
            {/* <img src={product.image} alt={`Imagen de ${product.name}`} className="w-full h-full object-cover" /> */}
          </div>

          <div className="px-16 md:px-12 py-4">
            <div className="w-full flex  justify-between items-center">
              <h2 className="text-xl font-bold text-blue-800 truncate">
                {name}
              </h2>
              <p className="text-lg font-extrabold text-green-600">${price}</p>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p className="line-clamp-2 italic text-gray-600">{description}</p>
              <p>
                <span className="font-semibold text-gray-900">Categoría:</span>
                <span className="ml-1 text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded-full text-xs">
                  {category || "Sin categoría"}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-900">Stock:</span>
                <span
                  className={`ml-1 font-bold ${
                    stock > 20 ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {stock} unidades
                </span>
              </p>
            </div>

            <Button
              onClick={() => alert(`Has agregado ${name} al carrito`)}
              className="mt-4 w-full bg-blue-600 text-white text-sm py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 ease-in-out shadow-md cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:ring-blue-700"
            >
              🛒 Agregar al Carrito
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
