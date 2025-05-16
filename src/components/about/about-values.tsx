"use client";

import { motion } from "framer-motion";

const values = [
	{
		icon: "💰",
		title: "Zero Commission",
		description:
			"We believe in fair pricing for restaurant owners with no hidden fees.",
	},
	{
		icon: "🚀",
		title: "Seamless Technology",
		description:
			"Digital-first solutions for ordering, tracking, and operations.",
	},
	{
		icon: "⭐",
		title: "Premium Experience",
		description:
			"Smooth, delightful user experience for both customers and vendors.",
	},
];

export default function AboutValues() {
	return (
		<section className="relative w-full py-24 bg-gradient-to-br from-white via-orange-50 to-white z-10">
			<div className="max-w-7xl mx-auto px-6 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-3xl md:text-4xl font-bold text-gray-900"
				>
					Our Core Values
				</motion.h2>
				<p className="text-slate-600 mt-4 max-w-2xl mx-auto">
					Principles that guide our mission to improve food service
					for everyone.
				</p>

				<div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{values.map((val, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: idx * 0.1 }}
							whileHover={{ scale: 1.03, rotate: 1 }}
							className="bg-white border border-orange-100 shadow-xl rounded-2xl p-8 text-left transform transition-transform hover:shadow-orange-200 hover:border-orange-300"
						>
							<div className="text-4xl mb-4">{val.icon}</div>
							<h3 className="text-xl font-semibold mb-2 text-gray-900">
								{val.title}
							</h3>
							<p className="text-slate-600">{val.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
