"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { AddMenuItemDialog } from "./AddMenuItemDialog";
import { MenuItemCard } from "./MenuItemCard";
import { EditMenuItemDialog } from "./EditMenuItemDialog";

interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	image?: string;
	isAvailable: boolean;
}

export function Menu() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

	const categories = [
		"All",
		"Starters",
		"Main Course",
		"Desserts",
		"Beverages",
	];

	const handleAddItem = (item: Omit<MenuItem, "id" | "isAvailable">) => {
		const newItem: MenuItem = {
			...item,
			id: Math.random().toString(36).substr(2, 9),
			isAvailable: true,
		};
		setMenuItems([...menuItems, newItem]);
	};

	const handleDeleteItem = (id: string) => {
		setMenuItems(menuItems.filter((item) => item.id !== id));
	};

	const handleEditItem = (item: MenuItem) => {
		setEditingItem(item);
	};

	const handleSaveEdit = (editedItem: MenuItem) => {
		setMenuItems(
			menuItems.map((item) =>
				item.id === editedItem.id ? editedItem : item,
			),
		);
		setEditingItem(null);
	};

	const handleToggleAvailability = (id: string, isAvailable: boolean) => {
		setMenuItems(
			menuItems.map((item) =>
				item.id === id ? { ...item, isAvailable } : item,
			),
		);
	};

	const filteredItems = menuItems.filter((item) => {
		const matchesSearch = item.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === "all" || item.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const getItemsByCategory = (category: string) => {
		if (category === "all") {
			return filteredItems;
		}
		return filteredItems.filter(
			(item) => item.category === category.toLowerCase(),
		);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search menu items..."
							className="pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<Select
						value={selectedCategory}
						onValueChange={setSelectedCategory}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select category" />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem
									key={category.toLowerCase()}
									value={category.toLowerCase()}
								>
									{category}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<AddMenuItemDialog onAddItem={handleAddItem} />
			</div>

			<Tabs defaultValue="all" className="w-full">
				<TabsList>
					{categories.map((category) => (
						<TabsTrigger
							key={category.toLowerCase()}
							value={category.toLowerCase()}
						>
							{category}
						</TabsTrigger>
					))}
				</TabsList>

				{categories.map((category) => (
					<TabsContent
						key={category.toLowerCase()}
						value={category.toLowerCase()}
						className="mt-6"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{getItemsByCategory(category.toLowerCase()).map(
								(item) => (
									<MenuItemCard
										key={item.id}
										item={item}
										onDelete={handleDeleteItem}
										onEdit={handleEditItem}
										onToggleAvailability={
											handleToggleAvailability
										}
									/>
								),
							)}
							{getItemsByCategory(category.toLowerCase())
								.length === 0 && (
								<div className="col-span-full text-center py-8 text-muted-foreground">
									No items found in this category
								</div>
							)}
						</div>
					</TabsContent>
				))}
			</Tabs>

			{editingItem && (
				<EditMenuItemDialog
					item={editingItem}
					open={!!editingItem}
					onOpenChange={(open) => !open && setEditingItem(null)}
					onSave={handleSaveEdit}
				/>
			)}
		</div>
	);
}
