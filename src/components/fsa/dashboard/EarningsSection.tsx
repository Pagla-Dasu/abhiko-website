"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data - replace with actual data from your API
const mockEarnings = {
	totalEarned: 25000,
	pendingApproval: 5000,
	paidTillDate: 20000,
	currentMonthTotal: 8000,
};

const mockPaymentHistory = [
	{
		id: 1,
		date: "2024-03-15",
		restaurants: 3,
		qrBonus: 1500,
		premiumBonus: 2000,
		total: 3500,
		status: "paid",
	},
	{
		id: 2,
		date: "2024-03-01",
		restaurants: 2,
		qrBonus: 1000,
		premiumBonus: 1500,
		total: 2500,
		status: "pending",
	},
	// Add more mock data as needed
];

export function EarningsSection() {
	return (
		<div className="space-y-6">
			{/* Commission Summary */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Earned
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							₹{mockEarnings.totalEarned}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Approval
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							₹{mockEarnings.pendingApproval}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Paid Till Date
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							₹{mockEarnings.paidTillDate}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Current Month Total
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							₹{mockEarnings.currentMonthTotal}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Payment History Table */}
			<Card>
				<CardHeader>
					<CardTitle>Payment History</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px]">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Date</TableHead>
									<TableHead>Restaurants</TableHead>
									<TableHead>QR Bonus</TableHead>
									<TableHead>Premium Bonus</TableHead>
									<TableHead>Total</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{mockPaymentHistory.map((payment) => (
									<TableRow key={payment.id}>
										<TableCell>{payment.date}</TableCell>
										<TableCell>
											{payment.restaurants}
										</TableCell>
										<TableCell>
											₹{payment.qrBonus}
										</TableCell>
										<TableCell>
											₹{payment.premiumBonus}
										</TableCell>
										<TableCell>₹{payment.total}</TableCell>
										<TableCell>
											<Badge
												variant={
													payment.status === "paid"
														? "default"
														: "secondary"
												}
											>
												{payment.status}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}
