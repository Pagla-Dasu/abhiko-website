"use client";

import AboutCTA from "@/components/about/about-cta";
import AboutHero from "@/components/about/about-hero";
import AboutMission from "@/components/about/about-mission";
import AboutStats from "@/components/about/about-stats";
import AboutTeam from "@/components/about/about-team";
import AboutValues from "@/components/about/about-values";

export default function AboutPage() {
	return (
		<main className="w-full min-h-screen relative z-10">
			<AboutHero />
			<AboutMission />
			<AboutValues />
			<AboutTeam />
			<AboutStats />
			<AboutCTA />
		</main>
	);
}
