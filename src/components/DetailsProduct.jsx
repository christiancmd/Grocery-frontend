import MiniCard from "./ui/MiniCard";
import Button from "./ui/Button";
import { getProduct } from "../api/request";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { downloadProductPdf } from "../api/request";
import { useDownload } from "../Hooks/useDownload";

import {
  BadgeCheck,
  CalendarDays,
  DollarSign,
  Package,
  Tag,
  Timer,
  Info,
  ImageIcon,
  Layers,
  AlertCircle,
  DownloadCloud,
} from "lucide-react";

export default function DetailsProductCard() {
  const [product, setProduct] = useState({});

  const params = useParams();
  const download = useDownload();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const id = params.id;
        try {
          const res = await getProduct(id);
          setProduct(res);
        } catch (error) {
          console.error("Error al cargar el producto: ", error);
        }
      }
    }

    loadProduct();
  }, [params.id]);

  const name = product.name || "Nombre No Disponible";
  const price = product.price || 0;
  const purchase_price = product.purchase_price || 0;
  const description = product.description || "No aplica";
  const stock = product.stock ?? "No especificado"; // permite 0 como válido
  const is_active =
    typeof product.is_active === "boolean" ? product.is_active : false;

  const expiration_date = product.expiration_date
    ? new Date(product.expiration_date).toLocaleDateString()
    : "No aplica";

  const created_at = product.created_at
    ? new Date(product.created_at).toLocaleDateString()
    : "No disponible";

  const updated_at = product.updated_at
    ? new Date(product.updated_at).toLocaleDateString()
    : "No disponible";

  const category_detail = product.category_detail || {};
  const percent =
    purchase_price > 0 ? ((price - purchase_price) / purchase_price) * 100 : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl mt-4 shadow-sm p-4 max-w-xl mx-auto">
      {/* Top Section */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
          <ImageIcon className="text-gray-400 w-10 h-10" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-blue-800">{name}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Layers className="w-4 h-4 text-gray-400" />
            {category_detail?.name}
          </p>

          {is_active === true ? (
            <div className="mt-2 inline-flex items-center gap-1 font-semibold text-green-600 text-sm">
              <BadgeCheck className="w-4 h-4" />
              Disponibles
            </div>
          ) : (
            <div className="mt-2 inline-flex items-center gap-1 font-semibold  text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              No Disponibles
            </div>
          )}

          {percent > 0 ? (
            <p className="text-green-600 font-semibold">
              {percent.toFixed(2)}% Ganancia
            </p>
          ) : (
            <p className="text-red-900">{percent.toFixed(2)}% </p>
          )}
        </div>

        <Button
          onClick={() => {
            download(
              downloadProductPdf,
              params.id,
              "productos.pdf",
              "application/pdf"
            );
          }}
        >
          <div className="border-2 border-red-700 rounded-full p-2 bg-red-500 text-white cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors">
            <DownloadCloud className="w-4 h-4 " />
          </div>
        </Button>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" />
          Descripción
        </h3>
        <p className="text-gray-700 text-sm mt-1">{description}</p>
      </div>

      {/* Pricing & Stock */}
      <div
        className={`grid grid-cols-2 gap-4 mb-4 border p-4 rounded-lg ${
          is_active === true ? "border-green-600" : "border-red-600"
        }`}
      >
        <MiniCard
          title="Precio de Compra"
          value={`${purchase_price}$`}
          bg={"bg-gradient-to-br from-gray-500 to-gray-600 "}
          icon={<Tag className="w-4 h-4 text-white" />}
        />

        <MiniCard
          title="Precio de Venta"
          value={`${price}$`}
          bg={"bg-gradient-to-br from-gray-500 to-gray-600 "}
          icon={<DollarSign className="w-4 h-4 text-white" />}
        />

        <MiniCard
          title="Stock"
          value={`${stock} unidades`}
          bg={"bg-gradient-to-br from-gray-500 to-gray-600 "}
          icon={<Package className="w-4 h-4 text-white" />}
        />

        <MiniCard
          title="Vencimiento"
          value={expiration_date}
          bg={"bg-gradient-to-br from-gray-500 to-gray-600 "}
          icon={<Timer className="w-4 h-4 text-white" />}
        />
      </div>

      <div
        className={`pt-3 text-xs text-gray-400 space-y-1 border-t ${
          is_active === true ? "border-green-600" : "border-red-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <CalendarDays className="w-3 h-3" />
          Creado: {new Date(created_at).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-3 h-3" />
          Actualizado: {new Date(updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
