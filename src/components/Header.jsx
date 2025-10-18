import Button from "./ui/Button";
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
        <Button className="w-34 border-2 bg-gradient-to-br from-blue-600 to-blue-500 text-white border-white px-10 hover:bg-none hover:border-blue-500 active:border-white">
          Gestion
        </Button>
      </Link>
    </header>
  );
}
