"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

// Mock data - replace with actual data from your API
const mockPayoutData = {
	pendingBalance: 5000,
	lastPayoutDate: "2024-03-01",
	payoutCountThisMonth: 1,
};

export function PayoutRequest() {
	const [requestStatus, setRequestStatus] = useState<"idle" | "under_review">(
		"idle",
	);
	const [isRequestDisabled, setIsRequestDisabled] = useState(
		mockPayoutData.payoutCountThisMonth >= 2,
	);

	const handlePayoutRequest = () => {
		setRequestStatus("under_review");
		// Here you would typically make an API call to request the payout
	};

	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle>Payout Request</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<p className="text-sm text-muted-foreground">
						Pending Balance
					</p>
					<p className="text-3xl font-bold">
						₹{mockPayoutData.pendingBalance}
					</p>
				</div>

				{isRequestDisabled && (
					<Alert>
						<InfoIcon className="h-4 w-4" />
						<AlertTitle>Payout Limit Reached</AlertTitle>
						<AlertDescription>
							You have already requested 2 payouts this month.
							Next payout will be available on the 1st of next
							month.
						</AlertDescription>
					</Alert>
				)}

				{requestStatus === "under_review" ? (
					<div className="space-y-2">
						<Badge
							variant="secondary"
							className="w-full justify-center py-2"
						>
							Under Review
						</Badge>
						<p className="text-sm text-center text-muted-foreground">
							Your payout request is being processed. You will be
							notified once approved.
						</p>
					</div>
				) : (
					<Button
						className="w-full"
						onClick={handlePayoutRequest}
						disabled={
							isRequestDisabled ||
							mockPayoutData.pendingBalance <= 0
						}
					>
						Request Payout
					</Button>
				)}

				<div className="text-sm text-muted-foreground">
					<p>Last payout: {mockPayoutData.lastPayoutDate}</p>
					<p>
						Payouts this month:{" "}
						{mockPayoutData.payoutCountThisMonth}/2
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
