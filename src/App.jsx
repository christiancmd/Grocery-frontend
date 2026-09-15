import Header from "./components/Header";
import HeroProducts from "./components/HeroProducts";
import Dashboard from "./components/dashboard/Dashboard";
import ProductForm from "./components/ProductForm";
import DetailsProduct from "./components/DetailsProduct";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CategoriesProvider } from "./context/CategoriesContext";

export default function App() {
  return (
    <BrowserRouter>
      <CategoriesProvider>
        <div className="w-full flex flex-col min-h-screen bg-slate-100">
          <Header />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Navigate to="/Home" />} />

              <Route path="/Home" element={<HeroProducts />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product" element={<ProductForm />} />
              <Route path="/product/:id" element={<ProductForm />} />
              <Route path="/detailsProduct/:id" element={<DetailsProduct />} />
            </Routes>

            <Toaster position="bottom-right" />
          </main>

          <Footer />
        </div>
      </CategoriesProvider>
    </BrowserRouter>
  );
}
