"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Mock data - replace with actual data from your API
const mockRestaurants = [
	{
		id: 1,
		name: "Spice Garden",
		city: "Mumbai",
		date: "2024-03-15",
		qrPlaced: true,
		plan: "premium",
	},
	{
		id: 2,
		name: "Tasty Bites",
		city: "Delhi",
		date: "2024-03-14",
		qrPlaced: true,
		plan: "free",
	},
	// Add more mock data as needed
];

export function ActivityTimeline() {
	const [date, setDate] = useState<Date>();
	const [selectedCity, setSelectedCity] = useState<string>("all");
	const [selectedPlan, setSelectedPlan] = useState<string>("all");

	const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai"];
	const plans = ["free", "premium"];

	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle>Restaurants Onboarded</CardTitle>
				<div className="flex flex-wrap gap-2 pt-4">
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="w-[240px] justify-start text-left font-normal"
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? format(date, "PPP") : "Select date"}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

					<Select
						value={selectedCity}
						onValueChange={setSelectedCity}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select City" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Cities</SelectItem>
							{cities.map((city) => (
								<SelectItem key={city} value={city}>
									{city}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={selectedPlan}
						onValueChange={setSelectedPlan}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Plan" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Plans</SelectItem>
							{plans.map((plan) => (
								<SelectItem key={plan} value={plan}>
									{plan.charAt(0).toUpperCase() +
										plan.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[400px] pr-4">
					<div className="space-y-4">
						{mockRestaurants.map((restaurant) => (
							<div
								key={restaurant.id}
								className="flex items-center justify-between rounded-lg border p-4"
							>
								<div className="space-y-1">
									<p className="font-medium">
										{restaurant.name}
									</p>
									<p className="text-sm text-muted-foreground">
										{restaurant.city} • {restaurant.date}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<Badge
										variant={
											restaurant.qrPlaced
												? "default"
												: "secondary"
										}
									>
										{restaurant.qrPlaced
											? "QR Placed"
											: "QR Pending"}
									</Badge>
									<Badge
										variant={
											restaurant.plan === "premium"
												? "default"
												: "outline"
										}
									>
										{restaurant.plan}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
