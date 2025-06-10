"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	image?: string;
	isAvailable: boolean;
}

interface MenuItemCardProps {
	item: MenuItem;
	onDelete: (id: string) => void;
	onEdit: (item: MenuItem) => void;
	onToggleAvailability: (id: string, isAvailable: boolean) => void;
}

export function MenuItemCard({
	item,
	onDelete,
	onEdit,
	onToggleAvailability,
}: MenuItemCardProps) {
	const [isAvailable, setIsAvailable] = useState(item.isAvailable);

	const handleAvailabilityToggle = (checked: boolean) => {
		setIsAvailable(checked);
		onToggleAvailability(item.id, checked);
	};

	return (
		<Card className="relative">
			{item.image && (
				<div className="relative h-48 w-full">
					<Image
						src={item.image}
						alt={item.name}
						fill
						className="object-cover rounded-t-lg"
					/>
				</div>
			)}
			<CardHeader>
				<div className="flex items-start justify-between">
					<div>
						<CardTitle>{item.name}</CardTitle>
						<CardDescription>₹{item.price}</CardDescription>
					</div>
					<div className="flex items-center space-x-2">
						<Switch
							id={`available-${item.id}`}
							checked={isAvailable}
							onCheckedChange={handleAvailabilityToggle}
						/>
						<Label
							htmlFor={`available-${item.id}`}
							className="text-sm text-muted-foreground"
						>
							{isAvailable ? "Available" : "Not Available"}
						</Label>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground mb-4">
					{item.description}
				</p>
				<div className="flex justify-end space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onEdit(item)}
					>
						<Pencil className="h-4 w-4 mr-2" />
						Customize
					</Button>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive" size="sm">
								<Trash2 className="h-4 w-4 mr-2" />
								Delete
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you sure you want to delete this item?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete the menu item.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => onDelete(item.id)}
								>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardContent>
		</Card>
	);
}
