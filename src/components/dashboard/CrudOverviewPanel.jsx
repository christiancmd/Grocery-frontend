import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import MiniCard from "../ui/MiniCard";
import ChartGrafic from "../ui/ChartGrafic";
import {
  Box,
  AlertTriangle,
  CheckLine,
  FileBadge,
  ShoppingCart,
  PiggyBank,
} from "lucide-react";

export default function CrudOverviewPanel({ analysisData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const chartRef1 = useRef(null); // Primer chart: Distribución por Estado
  const chartRef2 = useRef(null); // Segundo chart: Distribución por Categorías

  useEffect(() => {
    if (
      analysisData &&
      typeof analysisData === "object" &&
      !Array.isArray(analysisData)
    ) {
      setIsLoading(false);
      setData(analysisData);
    }
  }, [analysisData]);

  const safeData = data || {};

  const active = safeData.activeProduct || 0;
  const inactive = safeData.inactiveProduct || 0;
  const totalProducts = active + inactive;
  const totalStock = safeData.totalStock || "0 unidades";
  const categories = safeData.categories?.length || 0;
  const valueInventory = Number(safeData.valueInventory || 0).toFixed(2);
  const miniCards = [
    {
      title: "Productos Activos",
      icon: <CheckLine />,
      value: active, // Usa fallback
      bg: "bg-gradient-to-br from-yellow-400 to-yellow-800 border border-yellow-200",
    },
    {
      title: "Productos Inactivos",
      icon: <AlertTriangle />,
      value: inactive, // Usa fallback
      bg: "bg-gradient-to-br from-red-400 to-red-800 border border-red-800",
    },
    {
      title: "Stock Actual",
      icon: <Box />,
      value: totalStock, // Usa fallback
      bg: "bg-gradient-to-br from-gray-800 to-gray-500 border border-gray-700",
    },
    {
      title: "Categorias",
      icon: <FileBadge />,
      value: categories, // Usa fallback
      bg: "bg-gradient-to-br from-blue-400 to-blue-800 border border-blue-700",
    },
    {
      title: "Productos Totales",
      icon: <ShoppingCart />,
      value: totalProducts, // Calculado con fallback
      bg: "bg-gradient-to-br from-purple-400 to-purple-800 border border-purple-700",
    },
    {
      title: "Valor Total Del Inventario",
      icon: <PiggyBank />,
      value: valueInventory + " $", // Usa fallback
      bg: "bg-gradient-to-br from-green-500 to-green-900 border border-green-700",
    },
  ];

  useEffect(() => {
    if (!chartRef1.current) return;

    const xValues1 = ["Activos", "Inactivos"];
    const yValues1 = [active, inactive];
    const barColors1 = ["#f59e0b", "#fb2c36"];

    if (totalProducts === 0) return;

    const chartInstance1 = new Chart(chartRef1.current, {
      type: "pie",
      data: {
        labels: xValues1,
        datasets: [
          {
            backgroundColor: barColors1,
            borderColor: ["#d97706", "#fb2c36"],
            hoverOffset: 4,
            data: yValues1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Distribución por Estado (Total: ${totalProducts})`,
            font: { size: 12, weight: "bold" },
            color: "#374151",
          },
          legend: {
            position: "bottom",
            labels: { padding: 15, usePointStyle: true, font: { size: 10 } },
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.label}: ${(
                  (context.parsed / totalProducts) *
                  100
                ).toFixed(1)}%`,
            },
          },
        },
        animation: { animateRotate: true, duration: 1000 },
        layout: { padding: 10 },
      },
    });

    return () => {
      if (chartInstance1) chartInstance1.destroy();
    };
  }, [analysisData, active, inactive, totalProducts]);

  useEffect(() => {
    if (!chartRef2.current || !analysisData?.productsByCategory) return;

    const labels = Object.keys(analysisData.productsByCategory);
    const data = Object.values(analysisData.productsByCategory);
    const total = data.reduce((acc, val) => acc + val, 0);
    const colors = labels.map((_, i) => {
      const lightness = 40 + i * 10; // ajusta el rango si hay muchas categorías
      return `hsl(220, 70%, ${Math.min(lightness, 80)}%)`; // tono azul fijo (220°)
    });
    const chartInstance2 = new Chart(chartRef2.current, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            hoverOffset: 4,
            data,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Distribución por Categorías (Total: ${categories})`,
            font: { size: 12, weight: "bold" },
            color: "#374151",
          },
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              usePointStyle: true,
              font: { size: 10 },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.label}: ${((context.parsed / total) * 100).toFixed(
                  1
                )}%`,
            },
          },
        },
        animation: { animateRotate: true, duration: 1000 },
        layout: { padding: 10 },
      },
    });

    return () => {
      chartInstance2.destroy();
    };
  }, [analysisData]);

  return (
    <div
      id="pdf-content"
      className="relative bg-white border border-gray-200 rounded-lg shadow-sm text-gray-800 overflow-auto"
    >
      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200">
        Información del sistema
      </h2>

      <div className="px-6 pb-6">
        <p className="text-sm text-gray-600  mb-6 leading-relaxed">
          Este panel resume el estado actual del sistema CRUD, incluyendo
          métricas de productos activos, inactivos y totales.
        </p>

        {isLoading ? (
          <p>Cargando datos...</p>
        ) : (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
              {miniCards.map((card, i) => (
                <MiniCard
                  key={i}
                  title={card.title}
                  value={card.value}
                  bg={card.bg}
                  icon={card.icon}
                />
              ))}
            </div>

            <div className="bg-white border border-orange-400 rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartGrafic
                  chartRef={chartRef1}
                  ariaLabel="Gráfico de distribución de productos por estado"
                />
                <ChartGrafic
                  chartRef={chartRef2}
                  ariaLabel="Gráfico de distribución de productos por categorías"
                />
              </div>

              {/* Placeholder si no hay datos (para ambos) */}
              {totalProducts === 0 && (
                <p className="text-center text-gray-500 mt-4 col-span-full">
                  No hay datos disponibles para los gráficos.
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
