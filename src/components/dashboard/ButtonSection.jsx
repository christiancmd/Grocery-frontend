import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { downloadProductsExcel } from "../../api/request";
import { useDownload } from "../../Hooks/useDownload";

export default function ButtonSection({ clickDownloadPdf }) {
  const download = useDownload();
  return (
    <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-2">
      <Button
        onClick={() => {
          download(
            downloadProductsExcel,
            "productos.xlsx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
        }}
        className="w-56 py-3.5 bg-gradient-to-br from-green-400 to-green-200 text-green-900 border-2 border-white rounded-sm cursor-pointer hover:from-green-400 hover:to-green-600 hover:text-white hover:font-semibold a"
      >
        Exportar Excel
      </Button>

      <Link to={"/Product"}>
        <Button className="w-56 py-3.5 bg-gradient-to-br from-blue-400 to-blue-200 text-blue-900 border-2 border-white rounded-sm cursor-pointer hover:from-blue-400 hover:to-blue-600 hover:text-white hover:font-semibold ">
          Crear Producto
        </Button>
      </Link>

      <Button
        onClick={() => {
          clickDownloadPdf(true);
        }}
        className="w-56 py-3.5 bg-gradient-to-br from-red-400 to-red-200 text-red-900 border-2 border-white rounded-sm cursor-pointer hover:from-red-400 hover:to-red-600 hover:text-white hover:font-semibold"
      >
        Exportar PDF
      </Button>
    </div>
  );
}
