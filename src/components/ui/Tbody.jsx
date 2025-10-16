import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Check, X, Trash, Edit } from "lucide-react";

export default function Tbody({ products, handleDelete, handleEdit }) {
  const navigate = useNavigate();

  const handleDetailProduct = (id) => {
    if (!id) {
      console.warn("ID no definido");
      return;
    }

    navigate(`/detailsProduct/${id}`);
  };

  return (
    <tbody className="text-sm divide-y  divide-gray-300">
      {products ? (
        products.map((product, index) => (
          <tr
            onClick={() => handleDetailProduct(product.id)}
            key={index}
            className="h-12 border-gray-300 border hover:bg-blue-300 transition"
          >
            <td className="px-2 py-1 text-xs whitespace-nowrap truncate border-l-2 border-gray-300">
              <div className="bg-gray-300 p-6"></div>
            </td>
            <td className="px-2 py-1 text-xs whitespace-nowrap truncate border-l-2 border-gray-300">
              {product.name ? product.name : "No disponible"}
            </td>
            <td className="px-2 py-1 text-xs whitespace-nowrap truncate border-l-2 border-gray-300">
              {product.price ? product.price : 0}
            </td>
            <td className="px-2 py-1 text-xs whitespace-nowrap truncate border-l-2 border-gray-300">
              {product.stock ? product.stock : 0}
            </td>
            <td className="px-2 py-1 text-xs whitespace-nowrap truncate border-l-2 border-gray-300">
              {product.category_detail.name
                ? product.category_detail.name
                : "No definido"}
            </td>
            <td className="px-2 py-1 text-xs whitespace-nowrap truncate border-x-2 border-gray-300">
              <div className="flex items-center justify-center">
                {product.is_active ? (
                  <Check className="text-green-500 bg-green-200 rounded-full p-1" />
                ) : (
                  <X className="text-red-500 bg-red-200 rounded-full p-1" />
                )}
              </div>
            </td>
            <td className="h-full flex justify-center items-center flex-wrap gap-1 px-2 mt-1 py-1 text-xs whitespace-nowrap truncate">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(product.id);
                }}
                className="text-blue-800 bg-blue-300 p-0.5 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white transition"
              >
                <Edit className="scale-60 " />
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product.id);
                }}
                className="text-red-700 bg-red-300 p-0.5 rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition"
              >
                <Trash className="scale-60 " />
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <strong>Sin datos disponibles</strong>
      )}
    </tbody>
  );
}
