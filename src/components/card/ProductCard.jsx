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
        <div className="card relative bg-white">
          <header className="bg-gray-200 w-full h-36 flex justify-center items-center">
            <span className="text-gray-600">IMAGE</span>
          </header>
          <div className="h-full bg-gray-800 px-2 pt-2 space-y-2">
            <div className="w-full flex justify-between items-center">
              <h2>{name}</h2>
              <small className="font-medium">{price}$</small>
            </div>
            <p>{description}</p>
          </div>
          <Button className="mb-2.5 bg-gradient-to-br from-blue-600 to-blue-500 text-white border-2 border-white px-10 absolute bottom-0 left-1/2 -translate-x-1/2 hover:bg-none  hover:border-blue-500 active:border-white">
            Agregar
          </Button>
        </div>
      )}
    </>
  );
}
