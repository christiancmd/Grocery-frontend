import { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "../../api/request";
import { useNavigate } from "react-router-dom";
import Thead from "../ui/Thead";
import Tbody from "../ui/Tbody";
import Table from "../ui/Table";
import CrudOverviewPanel from "./CrudOverviewPanel";
import Pagination from "./Pagination";
import ButtonSection from "./ButtonSection";
import { generateDashboardPDF } from "../../utils/generateDashboardPDF";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [clickPdf, setClickPdf] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryToFilter, setCategoryToFilter] = useState("Todos");
  const [analysData, setAnalysData] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12); // productos por página

  const [title, setTitle] = useState([
    "Imagen",
    "Nombre",
    "Precio",
    "Stock",
    "Categoria",
    "Activo",
    "Detalles",
  ]);

  const navigate = useNavigate();

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const normalizedSearch = searchProduct.trim().toLowerCase();

    const filter = products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .startsWith(normalizedSearch);
      const matchesCategory =
        categoryToFilter === "Todos" ||
        product.category_detail.name === categoryToFilter;

      return matchesName && matchesCategory;
    });

    setFilteredProducts(filter);
    setCurrentPage(1);
  }, [searchProduct, categoryToFilter, products]);

  const refreshProducts = async () => {
    const response = await getAllProducts();
    setProducts(response);
  };

  const handleGetData = async () => {
    const response = await getAllProducts();
    setProducts(response);
  };

  const handleEdit = (id) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = async (id) => {
    const res = await deleteProduct(id);
    if (res.status !== 204) {
      toast.error("¡Hubo un error!");
      return;
    }

    toast.success("¡Usuario eliminado exitosamente!");
    refreshProducts();
  };

  useEffect(() => {
    const dataAnalysis = () => {
      let inventoryManage = {
        totalProducts: products.length,
      };

      const categories = products.reduce((acc, product) => {
        const category = product.category_detail.name;
        if (!acc.includes(category)) {
          acc.push(category);
        }
        return acc;
      }, []);

      setCategories(categories);

      inventoryManage = { ...inventoryManage, categories };

      const productsByCategory = products.reduce((acc, product) => {
        const category = product.category_detail.name;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      inventoryManage = { ...inventoryManage, productsByCategory };

      const valueInventory = products.reduce((acc, product) => {
        const price = parseFloat(product.price);
        const stock = parseFloat(product.stock);
        const subtotal = isNaN(price) || isNaN(stock) ? 0 : price * stock;
        return acc + subtotal;
      }, 0);

      inventoryManage = { ...inventoryManage, valueInventory };

      const totalStock = products.reduce((acc, product) => {
        return acc + parseFloat(product.stock);
      }, 0);

      inventoryManage = { ...inventoryManage, totalStock };

      const activeProduct = products.reduce((acc, product) => {
        return product.is_active === true ? acc + 1 : acc;
      }, 0);

      inventoryManage = { ...inventoryManage, activeProduct };

      const inactiveProduct = products.reduce((acc, product) => {
        return product.is_active === false ? acc + 1 : acc;
      }, 0);

      inventoryManage = { ...inventoryManage, inactiveProduct };

      setAnalysData(inventoryManage);
    };

    dataAnalysis();
  }, [products]);

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (!clickPdf) return;

    // Validación básica de estructura
    const isValidData =
      analysData &&
      typeof analysData === "object" &&
      analysData.activeProduct != null &&
      analysData.inactiveProduct != null &&
      analysData.totalStock != null &&
      Array.isArray(analysData.categories) &&
      analysData.valueInventory != null &&
      typeof analysData.productsByCategory === "object";

    if (!isValidData) {
      console.warn(
        "❌ Datos incompletos o mal formateados. No se generará el PDF."
      );
      setClickPdf(false);
      return;
    }

    // Normalización de datos
    const active = analysData.activeProduct || 0;
    const inactive = analysData.inactiveProduct || 0;
    const totalProducts = active + inactive;
    const totalStock = analysData.totalStock || "0 unidades";
    const categories = analysData.categories?.length || 0;
    const valueInventory = analysData.valueInventory || 0;
    const statusDistribution = { active, inactive };
    const categoryDistribution = analysData.productsByCategory || {};

    const dashboardData = {
      activeProducts: active,
      inactiveProducts: inactive,
      currentStock: totalStock,
      categoryCount: categories,
      totalProducts,
      totalInventoryValue: valueInventory,
      statusDistribution,
      categoryDistribution,
    };

    // Validación final antes de exportar
    if (totalProducts === 0 || categories === 0) {
      console.warn("⚠️ No hay suficientes datos para generar el PDF.");
      setClickPdf(false);
      return;
    }

    // Generar PDF
    generateDashboardPDF(dashboardData);
    setClickPdf(false);
  }, [clickPdf]);

  return (
    <section className="w-full flex-1 overflow-y-auto bg-cyan-950 h-full p-6">
      <div>
        <ButtonSection clickDownloadPdf={setClickPdf} />

        <div className="w-full mb-1">
          <input
            type="text"
            className="px-5 py-1  border-2 border-gray-400 rounded-sm bg-gray-100"
            placeholder="Buscar Producto"
            onChange={(e) => {
              setSearchProduct(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Vista dividida: tabla a la izquierda, info a la derecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1.5">
        {/* Tabla */}
        <div>
          <Table>
            <Thead
              titles={title}
              categories={categories}
              categoryToFilter={categoryToFilter}
              setCategoryToFilter={setCategoryToFilter}
            />
            <Tbody
              products={paginatedProducts}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Table>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>

        <CrudOverviewPanel analysisData={analysData} />
      </div>
    </section>
  );
}
