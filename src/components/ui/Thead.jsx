import { ArrowDown } from "lucide-react";

export default function Thead({
  titles,
  categories = [],
  categoryToFilter,
  setCategoryToFilter,
}) {
  return (
    <thead className="bg-gray-300 text-gray-800 text-sm tracking-wider">
      <tr>
        {titles.map((title, index) => (
          <th
            className="relative px-1 py-3 text-center border-l-2 border-gray-300"
            key={index}
          >
            {title === "Categoria" ? (
              <div className="relative inline-block w-full">
                <span className="pr-2">Categoria</span>
                <select
                  value={categoryToFilter}
                  onChange={(e) => setCategoryToFilter(e.target.value)}
                  className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
                >
                  <option value="Todos">Todos</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute top-0 right-0 h-full flex items-center pr-1">
                  <ArrowDown className="size-4" />
                </div>
              </div>
            ) : (
              title
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
