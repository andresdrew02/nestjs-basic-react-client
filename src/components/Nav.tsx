import { Link } from "react-router-dom";
import { User } from "../types/user";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SearchButton from "./SearchButton";
import { useAtom } from "jotai";
import { carritoAtom } from "../store/store";

export default function Nav({ user }: { user: User }) {
  const [carrito] = useAtom(carritoAtom)

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <a href="https://github.com/andresdrew02/nestjs-basic-react-client" target="_blank">Info</a>
            </li>
            <li>
              <a
                href="https://andresdrew.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            </li>
            {user && (
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          NestJS Shop
        </Link>
      </div>
      <div className="navbar-end">
        {!user ? (
          <>
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link to="/register" className="btn btn-ghost">
            Register
          </Link>
          </>
        ) : (
          <p className="select-none mr-2">{user.name}</p>
        )}
        {user && <Link to="/orders" className="btn btn-ghost">Mis pedidos</Link>}
        <SearchButton />
        <Link to="/carrito">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator text-xl">
              <div className="indicator-item indicator-end badge badge-secondary w-4 h-4">{carrito.length}</div>
              <AiOutlineShoppingCart/>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
