export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
      >
        ← Anterior
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
      >
        Siguiente →
      </button>
    </div>
  );
}
