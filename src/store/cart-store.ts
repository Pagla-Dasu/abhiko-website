import { create } from "zustand";

export type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	customizations?: string[];
};

interface CartStore {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	increaseQty: (id: string) => void;
	decreaseQty: (id: string) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
	items: [],
	addItem: (item) =>
		set((state) => {
			const existingItem = state.items.find((i) => i.id === item.id);
			if (existingItem) {
				return {
					items: state.items.map((i) =>
						i.id === item.id
							? { ...i, quantity: i.quantity + 1 }
							: i,
					),
				};
			}
			return { items: [...state.items, item] };
		}),

	removeItem: (id) =>
		set((state) => ({
			items: state.items.filter((item) => item.id !== id),
		})),

	increaseQty: (id) =>
		set((state) => ({
			items: state.items.map((item) =>
				item.id === id
					? { ...item, quantity: item.quantity + 1 }
					: item,
			),
		})),

	decreaseQty: (id) =>
		set((state) => ({
			items: state.items.map((item) =>
				item.id === id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item,
			),
		})),

	clearCart: () => set({ items: [] }),
}));
