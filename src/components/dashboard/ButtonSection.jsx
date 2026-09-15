import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { downloadProductsExcel } from "../../api/request";
import { useDownload } from "../../Hooks/useDownload";

export default function ButtonSection({ clickDownloadPdf }) {
  const download = useDownload();
  return (
    <div className="w-full flex flex-col sm:flex-row mb-8 lg:mb-0  justify-center items-center gap-4 bg-none">
      <Button
        onClick={() => {
          download(
            downloadProductsExcel,
            "productos.xlsx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          );
        }}
        className="w-56 h-14 text-white bg-gradient-to-br from-emerald-500 to-emerald-400 border-2 border-white hover:bg-none hover:border-green-400 "
      >
        Exportar Excel
      </Button>

      <Link to={"/Product"}>
        <Button className="w-56 h-14 text-white bg-gradient-to-br from-blue-600 to-blue-400 border-2 border-white hover:bg-none hover:border-blue-400">
          Crear Producto
        </Button>
      </Link>

      <Button
        onClick={() => {
          clickDownloadPdf(true);
        }}
        className="w-56 h-14 text-white bg-gradient-to-br from-red-600 to-red-400 border-2 border-white hover:bg-none hover:border-red-400"
      >
        Exportar PDF
      </Button>
    </div>
  );
}
