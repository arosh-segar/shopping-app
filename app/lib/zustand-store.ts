import { create } from "zustand";
import { Book, CartItem } from "./definitions";
import books from "./placeholder-data";

// Define the state and actions types
type State = {
  cartItems: CartItem[];
  books: Book[];
  totalCost: number;
};

type Actions = {
  addItem: (book: Book) => void;
  removeItem: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  makeOrder: () => void;
};

const calculateTotalCost = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.totalPrice, 0);
};

const useCartStore = create<State & Actions>((set) => ({
  cartItems: [],
  books: books,
  totalCost: 0,

  addItem: (book: Book) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === book.id);

      let updatedCartItems;
      if (existingItem) {
        updatedCartItems = state.cartItems.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.book.price,
              }
            : item
        );
      } else {
        updatedCartItems = [
          ...state.cartItems,
          { book, id: book.id, quantity: 1, totalPrice: book.price * 1 },
        ];
      }
      return {
        cartItems: updatedCartItems,
        totalCost: calculateTotalCost(updatedCartItems),
      };
    }),

  removeItem: (bookId: number) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== bookId
      );
      return {
        cartItems: updatedCartItems,
        totalCost: calculateTotalCost(updatedCartItems),
      };
    }),

  updateQuantity: (bookId: number, quantity: number) =>
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === bookId
          ? {
              ...item,
              quantity: quantity,
              totalPrice: quantity * item.book.price,
            }
          : item
      );
      return {
        cartItems: updatedCartItems,
        totalCost: calculateTotalCost(updatedCartItems),
      };
    }),

  makeOrder: () =>
    set((state) => {
      const updatedBooks = state.books.map((book) => {
        const cartItem = state.cartItems.find((item) => item.id === book.id);
        if (cartItem) {
          return {
            ...book,
            quantity: book.quantity - cartItem.quantity,
          };
        }
        return book;
      });
      return {
        cartItems: [],
        books: updatedBooks,
        totalCost: 0,
      };
    }),
}));

export default useCartStore;
