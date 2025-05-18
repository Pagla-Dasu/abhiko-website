"use client";

import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	NavbarButton,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
	NavbarLogo,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../ui/theme-toggle";

export default function AbhikoNavbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Main navigation links
	const navItems = [
		{ name: "About", href: "/about" },
		{ name: "Restaurant Partner", href: "/(restaurant)/dashboard" },
		{ name: "Abhryder", href: "/abhryder" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<div className="fixed top-0 left-0 right-0 w-full z-50 bg-background/80 backdrop-blur-sm">
			<Navbar>
				{/* Desktop View */}
				<NavBody className="relative">
					{/* Logo */}
					<NavbarLogo />

					{/* Nav Links */}
					<NavItems
						items={navItems.map((item) => ({
							name: item.name,
							link: item.href,
						}))}
					/>

					{/* Right CTA */}
					<div className="flex items-center gap-4 relative z-[55]">
						<div className="inline-block">
							<ThemeToggle />
						</div>
						<Link href="/login">
							<NavbarButton variant="primary">Login</NavbarButton>
						</Link>
					</div>
				</NavBody>

				{/* Mobile View */}
				<MobileNav>
					<MobileNavHeader>
						{/* Logo */}
						<NavbarLogo />
						<div className="flex items-center gap-2">
							<ThemeToggle />
							<MobileNavToggle
								isOpen={isMobileMenuOpen}
								onClick={() =>
									setIsMobileMenuOpen(!isMobileMenuOpen)
								}
							/>
						</div>
					</MobileNavHeader>

					<MobileNavMenu
						isOpen={isMobileMenuOpen}
						onClose={() => setIsMobileMenuOpen(false)}
					>
						{navItems.map((item, idx) => (
							<Link
								key={`mobile-nav-${idx}`}
								href={item.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className="w-full text-center text-base text-slate-700 dark:text-slate-200 hover:text-orange-500"
							>
								{item.name}
							</Link>
						))}
						<Link
							href={"/login"}
							className="w-full items-center justify-center text-center"
						>
							<NavbarButton
								onClick={() => setIsMobileMenuOpen(false)}
								variant="primary"
								className="w-full mt-4 items-center justify-center text-center"
							>
								Login
							</NavbarButton>
						</Link>
					</MobileNavMenu>
				</MobileNav>
			</Navbar>
		</div>
	);
}
