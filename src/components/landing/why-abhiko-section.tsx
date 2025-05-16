"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WHY_ABHIKO_CARDS = [
	{
		title: "Choose your favorite food",
		image: "/assets/icons/food.png",
	},
	{
		title: "Get delivery at your door step",
		image: "/assets/icons/delivery.png",
	},
	{
		title: "We have 400+ Review\nOn our app",
		image: "/assets/icons/review.png",
	},
];

export default function WhyAbhikoSection() {
	return (
		<section className="w-full bg-gradient-to-br from-orange-50 to-yellow-50 py-20 px-6">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
				{/* Text Column */}
				<div className="md:col-span-2 space-y-6">
					<motion.button
						whileHover={{ scale: 1.05 }}
						className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow"
					>
						Why order form US?
					</motion.button>

					<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
						Why we are <br /> the Best
					</h2>

					<p className="text-slate-600 text-base sm:text-lg leading-relaxed">
						Abhiko offers zero commission for restaurants, ensuring
						you get food at dine-in prices with no hidden charges
						while enjoying fast, seamless delivery.
					</p>
				</div>

				{/* Cards */}
				<div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{WHY_ABHIKO_CARDS.map((card, idx) => (
						<motion.div
							key={idx}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1, duration: 0.5 }}
							className={`rounded-2xl bg-white p-6 shadow-md border ${
								idx === 0
									? "border-yellow-400 shadow-yellow-200"
									: "border-white"
							}`}
						>
							<div className="flex justify-center mb-4">
								<Image
									src={card.image}
									alt={card.title}
									width={80}
									height={80}
									className="object-contain"
								/>
							</div>
							<h3 className="text-lg font-semibold text-slate-900 text-center whitespace-pre-line">
								{card.title}
							</h3>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
