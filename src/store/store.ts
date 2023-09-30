import { atom } from "jotai";
import { User } from "../types/user";
import { Carrito } from "../types/carrito";

export const userAtom = atom<User>(null)
export const carritoAtom = atom<Carrito>([])