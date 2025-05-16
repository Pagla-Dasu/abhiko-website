"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as lucideReact from "lucide-react";

// Type definitions
type FooterLink = {
	title: string;
	href: string;
};

type FooterColumnProps = {
	title: string;
	links: FooterLink[];
};

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			duration: 0.5,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5 },
	},
};

// Footer column component
function FooterColumn({ title, links }: FooterColumnProps) {
	return (
		<motion.div variants={itemVariants} className="flex flex-col space-y-4">
			<h3 className="text-lg font-medium text-gray-800 mb-3">{title}</h3>
			<ul className="space-y-3">
				{links.map((link, index) => (
					<motion.li key={index} variants={itemVariants}>
						<Link
							href={link.href}
							className="text-gray-600 hover:text-gray-900 transition duration-200"
						>
							{link.title}
						</Link>
					</motion.li>
				))}
			</ul>
		</motion.div>
	);
}

// Main footer component
export default function FooterSection() {
	// Footer data
	const footerData = {
		company: [
			{ title: "Home", href: "/" },
			{ title: "About Us", href: "/about" },
			{ title: "Blog", href: "/blog" },
		],
		services: [
			{ title: "Apply For City-Captain", href: "/apply" },
			{ title: "Wish List", href: "/wishlist" },
			{ title: "My account", href: "/account" },
			{ title: "Terms & Conditions", href: "/terms" },
		],
		support: [
			{ title: "Policy", href: "/policy" },
			{ title: "Business", href: "/business" },
			{ title: "Support Carrer", href: "/careers" },
		],
		contact: [
			{ title: "Support 24", href: "/support" },
			{ title: "Quick Chat", href: "/chat" },
		],
	};

	return (
		<footer className="w-full bg-pink-50">
			<div className="max-w-7xl mx-auto pt-20 pb-12 px-6">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12"
				>
					{/* Logo and description section */}
					<motion.div
						variants={itemVariants}
						className="lg:col-span-1"
					>
						<div className="flex flex-col items-start">
							<div className="bg-gray-900 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-6">
								<lucideReact.Rocket
									className="text-white"
									size={26}
								/>
							</div>
							<p className="text-gray-600 text-base mt-5 max-w-xs leading-relaxed">
								Retail food delivery is a courier service in
								which a restaurant, store, or independent
								food-delivery
							</p>
							<div className="flex mt-8 space-x-5">
								<motion.a
									whileHover={{ scale: 1.1 }}
									href="#"
									className="bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700 transition duration-300"
								>
									<lucideReact.Facebook size={20} />
								</motion.a>
								<motion.a
									whileHover={{ scale: 1.1 }}
									href="#"
									className="bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700 transition duration-300"
								>
									<lucideReact.Instagram size={20} />
								</motion.a>
								<motion.a
									whileHover={{ scale: 1.1 }}
									href="#"
									className="bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700 transition duration-300"
								>
									<lucideReact.Linkedin size={20} />
								</motion.a>
							</div>
						</div>
					</motion.div>

					{/* Footer columns */}
					<FooterColumn title="Company" links={footerData.company} />
					<FooterColumn
						title="Services"
						links={footerData.services}
					/>
					<FooterColumn title="Support" links={footerData.support} />
					<FooterColumn title="Contact" links={footerData.contact} />
				</motion.div>
			</div>

			{/* Copyright section */}
			<div className="bg-red-500 text-white py-5 w-full">
				<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="text-sm md:text-base"
					>
						Copyright © 2025 Suttle Technology Private Limited
					</motion.p>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
						className="text-sm md:text-base mt-3 md:mt-0"
					>
						Created by Suttle
					</motion.p>
				</div>
			</div>
		</footer>
	);
}
