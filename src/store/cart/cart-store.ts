import type { CartGame } from "@/interfaces";
import { create } from "zustand";

interface State {
    cart: CartGame[];
    addGameToCart: (game: CartGame) => void;
}

export const useCartStore = create<State>()(
    (set, get) => ({
        cart: [],

        // Methods
        addGameToCart: (game: CartGame) => {
            const { cart } = get();
        }
    })
)