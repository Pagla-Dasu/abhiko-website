"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutTeam() {
	return (
		<section className="w-full py-24 bg-white">
			<div className="max-w-7xl mx-auto px-6 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-3xl md:text-4xl font-bold text-slate-900"
				>
					Our Team
				</motion.h2>
				<p className="text-slate-600 mt-4 max-w-2xl mx-auto">
					Meet the creators behind the movement.
				</p>

				<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{[1, 2, 3, 4].map((member, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							whileHover={{ scale: 1.05 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-md border-4 border-white hover:shadow-xl transition">
								<Image
									src={`/api/placeholder/200/${200 + idx}`}
									alt={`Team member ${idx + 1}`}
									fill
									className="object-cover"
								/>
							</div>
							<h3 className="mt-4 text-lg font-semibold text-slate-800">
								Team Member {member}
							</h3>
							<p className="text-orange-500 text-sm font-medium">
								Position
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
