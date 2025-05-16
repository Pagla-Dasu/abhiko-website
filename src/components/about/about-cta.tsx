"use client";

import { motion } from "framer-motion";

export default function AboutCTA() {
	return (
		<section className="relative w-full py-24 bg-gradient-to-br from-black to-gray-900 text-white text-center overflow-hidden">
			<div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-orange-400/20 rounded-full blur-[150px] z-0" />

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7 }}
				className="max-w-3xl mx-auto space-y-6 relative z-10"
			>
				<h2 className="text-3xl md:text-4xl font-bold">
					Ready to transform your restaurant?
				</h2>
				<p className="text-gray-300 text-lg">
					Join Abhiko today and shape the future of food.
				</p>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.97 }}
					className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-xl transition-all"
				>
					Partner With Us
				</motion.button>
			</motion.div>
		</section>
	);
}
