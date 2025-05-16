"use client";

import FeatureCard from "./feature-card";

export default function FeaturesSection() {
	return (
		<section className="bg-white py-16 px-6">
			<div className="max-w-6xl mx-auto text-center">
				<h2 className="text-3xl font-bold mb-10 text-gray-900">
					Why Abhiko?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
					<FeatureCard
						title="Customer First"
						desc="Order from local restaurants with ease — dine-in, takeaway, or delivery, all in one place."
						icon="/assets/icons/customer.svg"
					/>
					<FeatureCard
						title="Restaurant Empowerment"
						desc="Manage orders, menus, earnings, and QR codes seamlessly from your dashboard."
						icon="/assets/icons/restaurant.svg"
					/>
					<FeatureCard
						title="Sales Agent Growth"
						desc="Track commissions, onboard restaurants, and view your performance in real-time."
						icon="/assets/icons/fsa.svg"
					/>
				</div>
			</div>
		</section>
	);
}
