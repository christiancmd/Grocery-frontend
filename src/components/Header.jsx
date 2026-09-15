import { Link } from "react-router-dom";
import { Store } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-16 bg-sky-900 flex items-center justify-between px-6 md:px-10">
      <Link to="/Home" className="flex items-center gap-2 no-underline">
        <Store className="text-slate-50" size={24} />
        <span className="font-heading font-bold text-lg text-slate-50 tracking-tight">
          Grocery
        </span>
      </Link>

      <Link to="/dashboard" className="btn-outline no-underline">
        Gestión
      </Link>
    </header>
  );
}
