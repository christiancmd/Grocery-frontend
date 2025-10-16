import { Link } from "react-router-dom";
import { Store } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-16 py-2 bg-sky-900 text-white flex justify-around items-center">
      <div>
        <Link to={"/Home"}>
          <h1 className=" font-bold flex gap-2">
            <span>
              <Store />
            </span>
            Grocery
          </h1>
        </Link>
      </div>
      <Link to={"/dashboard"}>
        <button className="bg-sky-600 w-34 border-2 py-2 rounded cursor-pointer hover:bg-sky-700 active:bg-sky-950">
          Gestion
        </button>
      </Link>
    </header>
  );
}
