"use client";

import Head from "next/head";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import AbhryderSection from "@/components/landing/abhryder-section";
import AppCtaRibbon from "@/components/landing/app-cta-ribbon";
import WhyAbhikoSection from "@/components/landing/why-abhiko-section";
import FooterSection from "@/components/landing/footer-section";

export default function Home() {

	return (
		<>
			<Head>
				<title>
					Abhiko - Order Food, Manage Restaurants, Track Sales
				</title>
				<meta
					name="description"
					content="Multi-role food ordering and restaurant management platform. Try Abhiko now!"
				/>
				<link rel="canonical" href="https://www.abhiko.com/" />
			</Head>

			<HeroSection />
			<FeaturesSection />
			<AbhryderSection />
			<WhyAbhikoSection />
			<FooterSection />
			<AppCtaRibbon />
		</>
	);
}
