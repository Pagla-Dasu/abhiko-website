"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	image?: string;
	isAvailable: boolean;
}

interface EditMenuItemDialogProps {
	item: MenuItem;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (item: MenuItem) => void;
}

export function EditMenuItemDialog({
	item,
	open,
	onOpenChange,
	onSave,
}: EditMenuItemDialogProps) {
	const [formData, setFormData] = useState<MenuItem>(item);
	const [preview, setPreview] = useState<string | null>(item.image || null);

	useEffect(() => {
		setFormData(item);
		setPreview(item.image || null);
	}, [item]);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result as string;
				setPreview(base64String);
				setFormData((prev) => ({ ...prev, image: base64String }));
			};
			reader.readAsDataURL(file);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".jpeg", ".jpg", ".png", ".webp"],
		},
		maxFiles: 1,
	});

	const categories = ["Starters", "Main Course", "Desserts", "Beverages"];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Menu Item</DialogTitle>
					<DialogDescription>
						Make changes to your menu item here. Click save when
						you're done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Item Name</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="price">Price (₹)</Label>
							<Input
								id="price"
								type="number"
								value={formData.price}
								onChange={(e) =>
									setFormData({
										...formData,
										price: parseFloat(e.target.value),
									})
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="category">Category</Label>
							<Select
								value={formData.category}
								onValueChange={(value) =>
									setFormData({
										...formData,
										category: value,
									})
								}
								required
							>
								<SelectTrigger>
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
						<div className="grid gap-2">
							<Label>Item Image</Label>
							<div
								{...getRootProps()}
								className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
									isDragActive
										? "border-primary bg-primary/10"
										: "border-muted-foreground/25 hover:border-primary/50"
								}`}
							>
								<input {...getInputProps()} />
								{preview ? (
									<div className="relative h-48 w-full">
										<Image
											src={preview}
											alt="Preview"
											fill
											className="object-cover rounded-lg"
										/>
										<Button
											type="button"
											variant="destructive"
											size="sm"
											className="absolute top-2 right-2"
											onClick={(e) => {
												e.stopPropagation();
												setPreview(null);
												setFormData((prev) => ({
													...prev,
													image: "",
												}));
											}}
										>
											Remove
										</Button>
									</div>
								) : (
									<div className="flex flex-col items-center gap-2">
										<Upload className="h-8 w-8 text-muted-foreground" />
										<p className="text-sm text-muted-foreground">
											{isDragActive
												? "Drop the image here"
												: "Drag & drop an image, or click to select"}
										</p>
										<p className="text-xs text-muted-foreground">
											Supports: JPG, PNG, WEBP
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save Changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
