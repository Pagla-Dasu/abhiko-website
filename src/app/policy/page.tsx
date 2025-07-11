"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fetchPolicyTerms } from "@/lib/policy/api";
import { BackgroundBeams } from "@/components/ui/background-beams";

const POLICY_TYPES = [
	{ label: "Website Terms & Conditions", value: "website" },
	{ label: "FSA Terms & Conditions", value: "fsa" },
];

type PolicySection = {
	_id: string;
	key: string;
	content: string;
};

export default function PolicyPage() {
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [policySections, setPolicySections] = useState<
		PolicySection[] | null
	>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSelect = async (type: string) => {
		setSelectedType(type);
		setLoading(true);
		setError(null);
		setPolicySections(null);
		try {
			const data = await fetchPolicyTerms(type);
			if (
				data.success &&
				Array.isArray(data.data) &&
				data.data.length > 0
			) {
				setPolicySections(data.data as PolicySection[]);
			} else {
				setError("No policy sections found.");
			}
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "An error occurred.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen w-full flex items-center justify-center py-20 px-4 overflow-auto">
			<BackgroundBeams className="fixed inset-0 z-0" />
			<div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen">
				<Card className="w-full max-w-2xl shadow-xl bg-white/90 dark:bg-black/80 backdrop-blur-md max-h-[90vh] overflow-y-auto">
					<CardHeader>
						<CardTitle className="text-2xl md:text-3xl font-bold text-orange-600 text-center">
							Policy & Terms
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="mb-8">
							<p className="text-gray-700 text-center mb-4 text-lg">
								Please select the type of policy you want to
								view:
							</p>
							<Tabs
								value={selectedType ?? undefined}
								onValueChange={handleSelect}
								className="w-full flex flex-col items-center"
							>
								<TabsList className="mb-4">
									{POLICY_TYPES.map((type) => (
										<TabsTrigger
											key={type.value}
											value={type.value}
											className="min-w-[120px]"
										>
											{type.label}
										</TabsTrigger>
									))}
								</TabsList>
								{POLICY_TYPES.map((type) => (
									<TabsContent
										key={type.value}
										value={type.value}
										className="w-full"
									>
										{loading &&
										selectedType === type.value ? (
											<div className="text-center text-orange-500 py-8">
												Loading...
											</div>
										) : error &&
										  selectedType === type.value ? (
											<div className="text-center text-red-500 py-8">
												{error}
											</div>
										) : policySections &&
										  selectedType === type.value ? (
											<div className="space-y-8">
												{policySections.map(
													(section) => (
														<div
															key={section._id}
															className="prose max-w-none text-gray-800 bg-orange-50 rounded-lg p-6 border border-orange-100 shadow-inner"
														>
															<h2 className="text-xl font-semibold mb-2 capitalize">
																{section.key.replace(
																	/_/g,
																	" ",
																)}
															</h2>
															<div
																dangerouslySetInnerHTML={{
																	__html: section.content,
																}}
															/>
														</div>
													),
												)}
											</div>
										) : (
											<div className="text-center text-gray-400 py-8">
												Select a policy type to view
												details.
											</div>
										)}
									</TabsContent>
								))}
							</Tabs>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
