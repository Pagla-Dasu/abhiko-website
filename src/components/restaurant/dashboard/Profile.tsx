"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliverySettingsDialog } from "./DeliverySettingsDialog";
import { NotificationsDialog, NotificationsData } from "./NotificationsDialog";

interface BusinessHours {
	day: string;
	open: string;
	close: string;
	isOpen: boolean;
}

interface SocialMedia {
	platform: string;
	url: string;
}

const STORAGE_KEY = "restaurant_profile_data";

export function Profile() {
	const [restaurantInfo, setRestaurantInfo] = useState({
		name: "",
		description: "",
		cuisine: "",
		priceRange: "",
		capacity: "",
	});

	const [contactInfo, setContactInfo] = useState({
		phone: "",
		email: "",
		website: "",
	});

	const [businessHours, setBusinessHours] = useState<BusinessHours[]>([
		{ day: "Monday", open: "09:00", close: "22:00", isOpen: true },
		{ day: "Tuesday", open: "09:00", close: "22:00", isOpen: true },
		{ day: "Wednesday", open: "09:00", close: "22:00", isOpen: true },
		{ day: "Thursday", open: "09:00", close: "22:00", isOpen: true },
		{ day: "Friday", open: "09:00", close: "22:00", isOpen: true },
		{ day: "Saturday", open: "09:00", close: "22:00", isOpen: true },
		{ day: "Sunday", open: "09:00", close: "22:00", isOpen: true },
	]);

	const [locationInfo, setLocationInfo] = useState({
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
	});

	const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([
		{ platform: "Facebook", url: "" },
		{ platform: "Instagram", url: "" },
		{ platform: "Twitter", url: "" },
	]);

	const [orderTypes, setOrderTypes] = useState({
		dineIn: true,
		takeaway: true,
		delivery: true,
	});

	const [maxDeliveryDistance, setMaxDeliveryDistance] = useState(5);

	const [notifications, setNotifications] = useState<NotificationsData>({
		newOrders: true,
		orderUpdates: true,
		deliveryUpdates: true,
		promotions: true,
	});

	const [bankDetails, setBankDetails] = useState({
		accountHolderName: "",
		accountType: "Savings",
		accountNumber: "",
		bankName: "",
		ifscCode: "",
		upiId: "",
	});

	const [isDeliverySettingsOpen, setIsDeliverySettingsOpen] = useState(false);
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

	useEffect(() => {
		const savedData = localStorage.getItem(STORAGE_KEY);
		if (savedData) {
			const data = JSON.parse(savedData);
			setRestaurantInfo(data.restaurantInfo || restaurantInfo);
			setContactInfo(data.contactInfo || contactInfo);
			setBusinessHours(data.businessHours || businessHours);
			setLocationInfo(data.locationInfo || locationInfo);
			setSocialMedia(data.socialMedia || socialMedia);
			setOrderTypes(data.orderTypes || orderTypes);
			setMaxDeliveryDistance(
				data.maxDeliveryDistance || maxDeliveryDistance,
			);
			setNotifications(data.notifications || notifications);
			setBankDetails(data.bankDetails || bankDetails);
		}
	}, []);

	const handleRestaurantInfoChange = (
		field: keyof typeof restaurantInfo,
		value: string,
	) => {
		setRestaurantInfo((prev) => ({ ...prev, [field]: value }));
	};

	const handleContactInfoChange = (
		field: keyof typeof contactInfo,
		value: string,
	) => {
		setContactInfo((prev) => ({ ...prev, [field]: value }));
	};

	const handleLocationInfoChange = (
		field: keyof typeof locationInfo,
		value: string,
	) => {
		setLocationInfo((prev) => ({ ...prev, [field]: value }));
	};

	const handleBusinessHoursChange = (
		index: number,
		field: keyof BusinessHours,
		value: string | boolean,
	) => {
		setBusinessHours((prev) =>
			prev.map((hours, i) =>
				i === index ? { ...hours, [field]: value } : hours,
			),
		);
	};

	const handleSocialMediaChange = (
		index: number,
		field: keyof SocialMedia,
		value: string,
	) => {
		setSocialMedia((prev) =>
			prev.map((social, i) =>
				i === index ? { ...social, [field]: value } : social,
			),
		);
	};

	const handleOrderTypeChange = (
		type: keyof typeof orderTypes,
		value: boolean,
	) => {
		setOrderTypes((prev) => ({ ...prev, [type]: value }));
	};

	const handleNotificationChange = (
		key: keyof NotificationsData,
		value: boolean,
	) => {
		setNotifications((prev) => ({ ...prev, [key]: value }));
	};

	const handleBankDetailsChange = (
		field: keyof typeof bankDetails,
		value: string,
	) => {
		setBankDetails((prev) => ({ ...prev, [field]: value }));
	};

	const handleSaveChanges = () => {
		const dataToSave = {
			restaurantInfo,
			contactInfo,
			businessHours,
			locationInfo,
			socialMedia,
			orderTypes,
			maxDeliveryDistance,
			notifications,
			bankDetails,
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
		console.log("Profile saved successfully!");
	};

	return (
		<div className="space-y-6">
			<Tabs defaultValue="restaurant" className="w-full">
				<TabsList className="grid w-full grid-cols-7">
					<TabsTrigger value="restaurant">
						Restaurant Info
					</TabsTrigger>
					<TabsTrigger value="contact">Contact Info</TabsTrigger>
					<TabsTrigger value="hours">Business Hours</TabsTrigger>
					<TabsTrigger value="location">Location</TabsTrigger>
					<TabsTrigger value="social">Social Media</TabsTrigger>
					<TabsTrigger value="bankDetails">Bank Details</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>

				<TabsContent value="restaurant">
					<Card>
						<CardHeader>
							<CardTitle>Restaurant Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Restaurant Name</Label>
								<Input
									id="name"
									value={restaurantInfo.name}
									onChange={(e) =>
										handleRestaurantInfoChange(
											"name",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									value={restaurantInfo.description}
									onChange={(e) =>
										handleRestaurantInfoChange(
											"description",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="cuisine">Cuisine Type</Label>
								<Input
									id="cuisine"
									value={restaurantInfo.cuisine}
									onChange={(e) =>
										handleRestaurantInfoChange(
											"cuisine",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="priceRange">Price Range</Label>
								<Select
									value={restaurantInfo.priceRange}
									onValueChange={(value) =>
										handleRestaurantInfoChange(
											"priceRange",
											value,
										)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select price range" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="$">$</SelectItem>
										<SelectItem value="$$">$$</SelectItem>
										<SelectItem value="$$$">$$$</SelectItem>
										<SelectItem value="$$$$">
											$$$$
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="capacity">
									Seating Capacity
								</Label>
								<Input
									id="capacity"
									type="number"
									value={restaurantInfo.capacity}
									onChange={(e) =>
										handleRestaurantInfoChange(
											"capacity",
											e.target.value,
										)
									}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="contact">
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="phone">Phone Number</Label>
								<Input
									id="phone"
									type="tel"
									value={contactInfo.phone}
									onChange={(e) =>
										handleContactInfoChange(
											"phone",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									value={contactInfo.email}
									onChange={(e) =>
										handleContactInfoChange(
											"email",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									type="url"
									value={contactInfo.website}
									onChange={(e) =>
										handleContactInfoChange(
											"website",
											e.target.value,
										)
									}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="hours">
					<Card>
						<CardHeader>
							<CardTitle>Business Hours</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{businessHours.map((hours, index) => (
								<div
									key={hours.day}
									className="flex items-center space-x-4"
								>
									<div className="w-32">
										<Label>{hours.day}</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Switch
											checked={hours.isOpen}
											onCheckedChange={(checked) =>
												handleBusinessHoursChange(
													index,
													"isOpen",
													checked,
												)
											}
										/>
										<Label>Open</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Input
											type="time"
											value={hours.open}
											onChange={(e) =>
												handleBusinessHoursChange(
													index,
													"open",
													e.target.value,
												)
											}
											disabled={!hours.isOpen}
										/>
										<span>to</span>
										<Input
											type="time"
											value={hours.close}
											onChange={(e) =>
												handleBusinessHoursChange(
													index,
													"close",
													e.target.value,
												)
											}
											disabled={!hours.isOpen}
										/>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="location">
					<Card>
						<CardHeader>
							<CardTitle>Location Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="address">Street Address</Label>
								<Input
									id="address"
									value={locationInfo.address}
									onChange={(e) =>
										handleLocationInfoChange(
											"address",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									value={locationInfo.city}
									onChange={(e) =>
										handleLocationInfoChange(
											"city",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="state">State/Province</Label>
								<Input
									id="state"
									value={locationInfo.state}
									onChange={(e) =>
										handleLocationInfoChange(
											"state",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="zipCode">ZIP/Postal Code</Label>
								<Input
									id="zipCode"
									value={locationInfo.zipCode}
									onChange={(e) =>
										handleLocationInfoChange(
											"zipCode",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="country">Country</Label>
								<Input
									id="country"
									value={locationInfo.country}
									onChange={(e) =>
										handleLocationInfoChange(
											"country",
											e.target.value,
										)
									}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="social">
					<Card>
						<CardHeader>
							<CardTitle>Social Media Links</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{socialMedia.map((social, index) => (
								<div
									key={social.platform}
									className="space-y-2"
								>
									<Label htmlFor={social.platform}>
										{social.platform}
									</Label>
									<Input
										id={social.platform}
										type="url"
										value={social.url}
										onChange={(e) =>
											handleSocialMediaChange(
												index,
												"url",
												e.target.value,
											)
										}
										placeholder={`Enter your ${social.platform} URL`}
									/>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="bankDetails">
					<Card>
						<CardHeader>
							<CardTitle>Bank Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="accountHolderName">
									Account Holder Name
								</Label>
								<Input
									id="accountHolderName"
									value={bankDetails.accountHolderName}
									onChange={(e) =>
										handleBankDetailsChange(
											"accountHolderName",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="accountType">
									Account Type
								</Label>
								<Select
									value={bankDetails.accountType}
									onValueChange={(value) =>
										handleBankDetailsChange(
											"accountType",
											value,
										)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select account type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Savings">
											Savings
										</SelectItem>
										<SelectItem value="Current">
											Current
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="accountNumber">
									Account Number
								</Label>
								<Input
									id="accountNumber"
									value={bankDetails.accountNumber}
									onChange={(e) =>
										handleBankDetailsChange(
											"accountNumber",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="bankName">Bank Name</Label>
								<Input
									id="bankName"
									value={bankDetails.bankName}
									onChange={(e) =>
										handleBankDetailsChange(
											"bankName",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="ifscCode">IFSC Code</Label>
								<Input
									id="ifscCode"
									value={bankDetails.ifscCode}
									onChange={(e) =>
										handleBankDetailsChange(
											"ifscCode",
											e.target.value,
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="upiId">UPI ID</Label>
								<Input
									id="upiId"
									value={bankDetails.upiId}
									onChange={(e) =>
										handleBankDetailsChange(
											"upiId",
											e.target.value,
										)
									}
								/>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="settings">
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Order Types</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<Label htmlFor="dine-in">Dine-in</Label>
									<Switch
										id="dine-in"
										checked={orderTypes.dineIn}
										onCheckedChange={(checked) =>
											handleOrderTypeChange(
												"dineIn",
												checked,
											)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label htmlFor="takeaway">Takeaway</Label>
									<Switch
										id="takeaway"
										checked={orderTypes.takeaway}
										onCheckedChange={(checked) =>
											handleOrderTypeChange(
												"takeaway",
												checked,
											)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label htmlFor="delivery">Delivery</Label>
									<Switch
										id="delivery"
										checked={orderTypes.delivery}
										onCheckedChange={(checked) =>
											handleOrderTypeChange(
												"delivery",
												checked,
											)
										}
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>More Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<Button
									variant="outline"
									className="w-full justify-start"
									onClick={() =>
										setIsDeliverySettingsOpen(true)
									}
								>
									Delivery Settings
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start"
									onClick={() => setIsNotificationsOpen(true)}
								>
									Notifications
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start"
								>
									Help and Support
								</Button>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>

			<div className="flex justify-end">
				<Button onClick={handleSaveChanges}>Save Changes</Button>
			</div>

			<DeliverySettingsDialog
				open={isDeliverySettingsOpen}
				onOpenChange={setIsDeliverySettingsOpen}
				maxDistance={maxDeliveryDistance}
				onMaxDistanceChange={setMaxDeliveryDistance}
			/>

			<NotificationsDialog
				open={isNotificationsOpen}
				onOpenChange={setIsNotificationsOpen}
				notifications={notifications}
				onNotificationChange={handleNotificationChange}
			/>
		</div>
	);
}
