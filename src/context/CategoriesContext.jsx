// CategoriesContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { getAllCategories } from "../api/request"; // ajusta la ruta si es necesario

export const CategoriesContext = createContext({
  categories: [],
  setCategories: () => {},
});

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  // Cargar categorías al montar el contexto
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getAllCategories();

        setCategories(categories);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
