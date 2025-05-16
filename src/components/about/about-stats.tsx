"use client";

import { motion } from "framer-motion";

const stats = [
	{ number: "500+", label: "Restaurant Partners" },
	{ number: "50,000+", label: "Happy Customers" },
	{ number: "20+", label: "Cities Covered" },
	{ number: "₹0", label: "Commission Fees" },
];

export default function AboutStats() {
	return (
		<section className="w-full py-20 bg-orange-50">
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
				{stats.map((stat, idx) => (
					<motion.div
						key={idx}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: idx * 0.1 }}
					>
						<h3 className="text-5xl font-bold text-orange-500">
							{stat.number}
						</h3>
						<p className="text-slate-700 text-lg mt-2">
							{stat.label}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}
