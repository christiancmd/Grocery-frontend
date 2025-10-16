import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateDashboardPDF(dashboardData) {
  const {
    activeProducts,
    inactiveProducts,
    currentStock,
    categoryCount,
    totalProducts,
    totalInventoryValue,
    statusDistribution,
    categoryDistribution
  } = dashboardData;

  const doc = new jsPDF();
  // 🧩 Header function
  const addHeader = () => {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Título principal alineado a la izquierda
  doc.setFontSize(16);
  doc.setTextColor(33, 37, 41); // gris oscuro
  doc.text('Informacion Del Inventario', 14, 15, { align: 'left' });

  // Fecha alineada a la derecha
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Generado en: ${new Date().toLocaleDateString()}`, pageWidth - 14, 15, { align: 'right' });

  // Subtítulo justificado (simulado con ancho limitado)
  doc.setFontSize(10);
  doc.setTextColor(80);
  const subtitle = 'Este reporte resume el estatus actual del inventario, incluyendo la actividad de los productos, los niveles de stock y la distribución de categorias';
  const maxWidth = pageWidth - 28; // 14px padding on both sides
  doc.text(subtitle, 14, 21, { maxWidth, align: 'justify' });

  // Línea divisoria
  doc.setDrawColor(180);
  doc.setLineWidth(0.3);
  doc.line(14, 26, pageWidth - 14, 26);
};

  // 🧩 Footer function
  const addFooter = () => {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Pagina ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }
  };

  addHeader();


  const summary = [
    ['Productos Activos', activeProducts],
    ['Productos Inactivos', inactiveProducts],
    ['Stock Actual', currentStock],
    ['Categorias', categoryCount],
    ['Totalidad De Productos', totalProducts],
    ['Valor Total Del Inventario ($)', totalInventoryValue.toFixed(2)]
  ];

  autoTable(doc, {
    startY: 35,
    head: [['Metrica', 'Valores']],
    body: summary,
    theme: 'grid',
    styles: { halign: 'center' }
  });

  const statusY = doc.lastAutoTable.finalY + 10;
  doc.text('Distribución De Status:', 14, statusY);

const statusLabels = {
  active: 'Activo',
  inactive: 'Inactivo'
};

const statusData = Object.entries(statusDistribution).map(([status, count]) => [
  statusLabels[status] || status, // usa el valor traducido si existe, o el original si no
  count
]);

autoTable(doc, {
  startY: statusY + 5,
  head: [['Status', 'Cantidad']],
  body: statusData,
  theme: 'striped',
  styles: { halign: 'center' }
});

  const categoryY = doc.lastAutoTable.finalY + 10;
  doc.text('Distribución De Categorias:', 14, categoryY);

const categoryData = Object.entries(categoryDistribution).map(([category, count]) => [category, count]);
  autoTable(doc, {
    startY: categoryY + 5,
    head: [['Categoria', 'Cantidad']],
    body: categoryData,
    theme: 'striped',
    styles: { halign: 'center' }
  });

  // 🧾 Footer on all pages
  addFooter();

  doc.save('Resumen_del_Sistema.pdf');
}