"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";

interface FeatureCardProps {
	title: string;
	desc: string;
	icon: string;
}

export default function FeatureCard({ title, desc, icon }: FeatureCardProps) {
	const ref = useRef<HTMLDivElement>(null);

	// Motion values for mouse position
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const bounds = ref.current?.getBoundingClientRect();
		if (!bounds) return;

		const x = e.clientX - bounds.left;
		const y = e.clientY - bounds.top;

		mouseX.set(x);
		mouseY.set(y);
	};

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			whileHover={{ scale: 1.015 }}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			style={{
				background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 176, 0, 0.15), transparent 80%)`,
			}}
			className="relative group rounded-xl border border-white/20 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
		>
			<div className="relative z-10">
				<Image
					src={icon}
					alt={title}
					width={40}
					height={40}
					className="mb-4"
				/>
				<h3 className="text-xl font-semibold text-gray-900 mb-2">
					{title}
				</h3>
				<p className="text-gray-600">{desc}</p>
			</div>

			{/* Optional border glow */}
			<div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent group-hover:border-yellow-400 transition duration-300" />
		</motion.div>
	);
}
