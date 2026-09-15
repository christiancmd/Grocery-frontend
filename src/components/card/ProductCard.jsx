import { Leaf } from "lucide-react";

export default function ProductCard({ product }) {
  const { name, price, stock, description } = product;

  return (
    <article className="card group flex flex-col h-full">
      <div className="relative h-36 bg-sky-pale flex items-center justify-center overflow-hidden">
        <Leaf
          className="text-sky-600 opacity-40 group-hover:opacity-60 transition-opacity duration-200"
          size={48}
          strokeWidth={1.5}
        />
        {stock <= 5 && stock > 0 && (
          <span className="absolute top-2 right-2 text-xs font-heading font-medium bg-carrot/90 text-slate-50 px-2 py-0.5 rounded-full">
            Últimas unidades
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sky-deep text-base font-semibold leading-snug m-0">
            {name}
          </h2>
          <span className="text-carrot font-heading font-bold text-base whitespace-nowrap">
            ${price}
          </span>
        </div>

        {description && (
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 m-0">
            {description}
          </p>
        )}

        <div className="mt-auto pt-3">
          <button className="btn-primary w-full text-center">
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
