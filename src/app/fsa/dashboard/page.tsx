"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Bell,
	LogOut,
	Wallet,
	Building2,
	History,
	User,
	Menu,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Components
import { NotificationsPanel } from "@/components/fsa/dashboard/NotificationsPanel";
import { FSAStats } from "@/components/fsa/dashboard/FSAStats";
import { ActivityTimeline } from "@/components/fsa/dashboard/ActivityTimeline";
import { PayoutRequest } from "@/components/fsa/dashboard/PayoutRequest";
import { EarningsSection } from "@/components/fsa/dashboard/EarningsSection";
import { ProfileSection } from "@/components/fsa/dashboard/ProfileSection";

export default function FSADashboard() {
	const [activeTab, setActiveTab] = useState("overview");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [unreadCount, setUnreadCount] = useState(2); // Initial unread count

	const handleLogout = () => {
		// Add logout logic here
		console.log("Logging out...");
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Top Bar */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden hover:bg-muted/50"
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
						>
							<Menu className="h-5 w-5" />
						</Button>
						<h1 className="text-2xl font-bold tracking-tight">
							FSA Dashboard
						</h1>
					</div>
					<div className="flex items-center gap-2 md:gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="relative hover:bg-muted/50"
								>
									<Bell className="h-5 w-5" />
									{unreadCount > 0 && (
										<span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-medium">
											{unreadCount}
										</span>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-[350px] p-0"
							>
								<NotificationsPanel
									onUnreadCountChange={setUnreadCount}
								/>
							</DropdownMenuContent>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="hover:bg-muted/50"
								>
									<Avatar className="h-8 w-8 border-2 border-muted">
										<AvatarImage
											src="/placeholder-avatar.jpg"
											alt="User"
										/>
										<AvatarFallback className="bg-primary/10 text-primary">
											JD
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem
									onClick={() => setActiveTab("profile")}
									className="cursor-pointer"
								>
									<User className="mr-2 h-4 w-4" />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={handleLogout}
									className="cursor-pointer text-red-500 focus:text-red-500"
								>
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-7xl py-6 px-4 md:px-6">
				{/* Mobile Navigation */}
				<Card
					className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} mb-6 shadow-sm max-w-2xl mx-auto`}
				>
					<ScrollArea className="h-[calc(100vh-8rem)]">
						<nav className="p-4 space-y-1">
							<Button
								variant={
									activeTab === "overview"
										? "secondary"
										: "ghost"
								}
								className="w-full justify-start h-10"
								onClick={() => {
									setActiveTab("overview");
									setIsMobileMenuOpen(false);
								}}
							>
								<Building2 className="mr-2 h-4 w-4" />
								Overview
							</Button>
							<Button
								variant={
									activeTab === "earnings"
										? "secondary"
										: "ghost"
								}
								className="w-full justify-start h-10"
								onClick={() => {
									setActiveTab("earnings");
									setIsMobileMenuOpen(false);
								}}
							>
								<Wallet className="mr-2 h-4 w-4" />
								Earnings
							</Button>
							<Button
								variant={
									activeTab === "activity"
										? "secondary"
										: "ghost"
								}
								className="w-full justify-start h-10"
								onClick={() => {
									setActiveTab("activity");
									setIsMobileMenuOpen(false);
								}}
							>
								<History className="mr-2 h-4 w-4" />
								Activity
							</Button>
							<Button
								variant={
									activeTab === "profile"
										? "secondary"
										: "ghost"
								}
								className="w-full justify-start h-10"
								onClick={() => {
									setActiveTab("profile");
									setIsMobileMenuOpen(false);
								}}
							>
								<User className="mr-2 h-4 w-4" />
								Profile
							</Button>
						</nav>
					</ScrollArea>
				</Card>

				{/* Main Content */}
				<div className="space-y-8 max-w-5xl mx-auto">
					{/* Desktop Tabs */}
					<div className="hidden md:block">
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="w-full"
						>
							<TabsList className="grid w-full max-w-md mx-auto grid-cols-4 h-11 bg-muted/50">
								<TabsTrigger
									value="overview"
									className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
								>
									Overview
								</TabsTrigger>
								<TabsTrigger
									value="earnings"
									className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
								>
									Earnings
								</TabsTrigger>
								<TabsTrigger
									value="activity"
									className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
								>
									Activity
								</TabsTrigger>
								<TabsTrigger
									value="profile"
									className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
								>
									Profile
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					{/* Content */}
					<div className="space-y-8">
						{activeTab === "overview" && (
							<>
								<FSAStats />
								<div className="grid gap-6 md:grid-cols-2">
									<ActivityTimeline />
									<PayoutRequest />
								</div>
							</>
						)}
						{activeTab === "earnings" && <EarningsSection />}
						{activeTab === "activity" && <ActivityTimeline />}
						{activeTab === "profile" && <ProfileSection />}
					</div>
				</div>
			</main>
		</div>
	);
}
