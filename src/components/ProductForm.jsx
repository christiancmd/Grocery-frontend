import { Tag, DollarSign, FileText, Layers, Calculator } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { saveProduct, getProduct, updateProduct } from "../api/request";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCategories } from "../context/CategoriesContext";
import Button from "./ui/Button";

export default function ProductForm() {
  const { categories } = useCategories();
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const id = params.id;
        const data = await getProduct(id);

        const {
          name,
          purchase_price,
          description,
          is_active,
          price,
          stock,
          expiration_date,
          category_detail,
        } = data;
        setValue("name", name);
        setValue("description", description);
        setValue("price", price);
        setValue("purchase_price", purchase_price);
        setValue("stock", stock);
        setValue("is_active", is_active);
        setValue("expiration_date", expiration_date);
        setValue("category", category_detail.id);
      }
    }

    loadProduct();
  }, []);

  const handleSaveSata = handleSubmit(async (data) => {
    const parsedData = {
      ...data,
      price: Number(data.price),
      purchase_price: Number(data.purchase_price),
      stock: Number(data.stock),
      category: Number(data.category),
    };

    if (!params.id) {
      console.log(parsedData);

      const res = await saveProduct(data);
      if (res.status !== 201) {
        toast.error("¡Hubo un error!");
        return;
      }

      toast.success("¡Producto creado!");
    } else {
      const res = await updateProduct(params.id, data);
      if (res.status !== 200) {
        toast.error("¡Hubo un error!");
        return;
      }

      toast.success("¡Actualizacion exitosa!");
    }

    navigate("/dashboard");
  });

  return (
    <section className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Crear Producto</h1>
        <p className="text-sm text-gray-500">
          Completa los campos para registrar un nuevo producto
        </p>
      </div>

      <form onSubmit={handleSaveSata} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del producto
          </label>
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <Tag className="w-5 h-5 text-gray-400 mr-2" />
            <input
              {...register("name", { required: "Este campo es obligatorio" })}
              type="text"
              placeholder="Ej. Manzana"
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
          {errors.name && (
            <span className="text-red-800 bg-red-300 text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Precio De Compra*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio De Compra
          </label>
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
            <input
              {...register("purchase_price", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  parseFloat(value) >= 0 || "No valores negativos",
              })}
              step={"0.01"}
              type="number"
              placeholder="Ej. 5.99"
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>

          {errors.purchase_price && (
            <span className="text-red-800 bg-red-300 text-sm">
              {errors.purchase.message}
            </span>
          )}
        </div>

        {/* Precio De Venta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio De Venta
          </label>
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
            <input
              {...register("price", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  parseFloat(value) >= 0 || "No valores negativos",
              })}
              step={"0.01"}
              type="number"
              placeholder="Ej. 9.99"
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>

          {errors.price && (
            <span className="text-red-800 bg-red-300 text-sm">
              {errors.price.message}
            </span>
          )}
        </div>

        {/* Categoría y Stock */}
        <div className="grid grid-cols-2 gap-4">
          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Layers className="w-5 h-5 text-gray-400 mr-2" />
              <select
                {...register("category", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full bg-transparent text-sm text-gray-700 outline-none"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.category && (
              <span className="text-red-800 bg-red-300 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Actual
            </label>

            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Calculator className="w-5 h-5 text-gray-400 mr-2" />

              <input
                {...register("stock", {
                  required: "Este campo es obligatorio",
                  validate: (value) =>
                    Number(value) >= 0 || "No valores negativos",
                })}
                type="number"
                placeholder="Ej. 20"
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>

            {errors.stock && (
              <span className="text-red-800 bg-red-300 text-sm">
                {errors.stock.message}
              </span>
            )}
          </div>
        </div>

        {/* Activo */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              {...register("is_active")}
              type="checkbox"
              id="activo"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="availible" className="ml-2 text-sm text-gray-700">
              Producto Disponible
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Vencimiento
            </label>

            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Calculator className="w-5 h-5 text-gray-400 mr-2" />

              <input
                {...register("expiration_date")}
                type="date"
                placeholder="Ej. 20"
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>

            {errors.expiration_date && (
              <span className="text-red-800 bg-red-300 text-sm">
                {errors.expiration_date.message}
              </span>
            )}
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <div className="flex items-start border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FileText className="w-5 h-5 text-gray-400 mt-1 mr-2" />
            <textarea
              {...register("description", {
                required: "Este campo es obligatorio",
              })}
              placeholder="Breve descripción del producto"
              rows="3"
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent resize-none"
            />
          </div>

          {errors.description && (
            <span className="text-red-800 bg-red-300 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Botón */}
        <Button
          type="submit"
          className="text-white w-full bg-gradient-to-br from-blue-600 to-blue-400 border-2 border-white hover:bg-none hover:shadow-2xl hover:text-blue-600 hover:border-blue-400 active:border-blue-700"
        >
          Guardar producto
        </Button>
      </form>
    </section>
  );
}
