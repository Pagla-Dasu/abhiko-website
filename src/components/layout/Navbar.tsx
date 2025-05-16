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

export default function AbhikoNavbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Main navigation links
	const navItems = [
		{ name: "About", href: "/about" },
		{ name: "Restaurant Partner", href: "/(restaurant)/dashboard" },
		{ name: "Suttler", href: "/abhryder" },
		{ name: "Contact", href: "/contact" }, // update route if needed
	];

	return (
		<div className="relative w-full z-50">
			<Navbar>
				{/* Desktop View */}
				<NavBody>
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
					<div className="flex items-center gap-4">
						<Link href="/(auth)/login">
							<NavbarButton variant="primary">Login</NavbarButton>
						</Link>
					</div>
				</NavBody>

				{/* Mobile View */}
				<MobileNav>
					<MobileNavHeader>
						{/* Logo */}
						<NavbarLogo />
						<MobileNavToggle
							isOpen={isMobileMenuOpen}
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
						/>
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
							href={"/(auth)/login"}
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
