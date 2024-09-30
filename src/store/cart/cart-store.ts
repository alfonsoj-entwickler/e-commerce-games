import type { CartGame } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartGame[];
    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };
    addGameToCart: (game: CartGame) => void;
    removeGameInCart: (game: CartGame) => void;
    updateGameQuantity: (game: CartGame, quantity: number) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],
            // Methods
            getTotalItems: () => {
                const { cart } = get();

                return cart.reduce((total, item) => total + item.quantity, 0 );
            },
            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce((subTotal, game) => (game.quantity * game.price) + subTotal, 0)
                const tax = 0.15 * subTotal;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal, tax, total, itemsInCart
                }
            },
            addGameToCart: (game: CartGame) => {
                const { cart } = get();
                const gameInCart = cart.some((item) => item.id === game.id && item.size === game.size);
                
                if (!gameInCart) {
                    set({ cart: [...cart, game] })
                    return
                }
    
                const updateCardGames = cart.map(item => {
                    if (item.id === game.id && item.size === game.size) {
                        return { ...item, quantity: item.quantity + game.quantity }
                    }
                    return item;
                })
    
                set({ cart: updateCardGames });
            },
            removeGameInCart: (game: CartGame) => {
                const { cart } = get();

                const updateCardGames = cart.filter(item => item.id !== game.id || item.size !== game.size)
    
                set({ cart: updateCardGames });
            },
            updateGameQuantity: (game: CartGame, quantity: number) => {
                const { cart } = get(); 
    
                const updateCardGames = cart.map(item => {
                    if (item.id === game.id && item.size === game.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item;
                })
    
                set({ cart: updateCardGames });
            }
        }),
        {
            name: "shopping-cart",
        }
    )
)