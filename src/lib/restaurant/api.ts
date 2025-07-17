import { BACKEND_URL } from "@/lib/api";

export async function loginRestaurant(phone: string) {
	const res = await fetch(`${BACKEND_URL}/api/auth/restaurant/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ phone: `+91${phone}` }),
	});
	if (!res.ok) throw new Error("Failed to send OTP");
	const json = await res.json();
	return { session: json.data?.session };
}

export async function verifyRestaurantLoginOtp(
	phone: string,
	otp: string,
	session: string,
) {
	const res = await fetch(
		`${BACKEND_URL}/api/auth/restaurant/verify-login-otp`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ phone: `+91${phone}`, otp, session }),
		},
	);
	if (!res.ok) throw new Error("Failed to verify OTP");
	const json = await res.json();
	return { token: json.data?.token || json.token };
}

export async function logoutRestaurant() {
	const token = localStorage.getItem("restaurant_jwt");
	const res = await fetch(`${BACKEND_URL}/api/auth/restaurant/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Failed to logout");
	return res.json();
}

// Fetch dashboard performance summary (all main stats in one call)
export async function fetchDashboardSummary() {
	const token = localStorage.getItem("restaurant_jwt");
	const res = await fetch(`${BACKEND_URL}/api/restaurant/profile/summary`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Failed to fetch dashboard summary");
	const json = await res.json();
	return json.data;
}

// Fetch assigned Abhryders
export async function fetchAssignedAbhryders() {
	const token = localStorage.getItem("restaurant_jwt");
	const res = await fetch(`${BACKEND_URL}/api/restaurant/abhryders`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Failed to fetch Abhryders");
	const json = await res.json();
	return json.data;
}

// Fetch recent orders (limit 5-10, adjust as per backend)
export async function fetchRecentOrders() {
	const token = localStorage.getItem("restaurant_jwt");
	const res = await fetch(`${BACKEND_URL}/api/orders/restaurant/all`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Failed to fetch recent orders");
	const json = await res.json();
	return json.data;
}

// Fetch all orders (for Orders tab)
export async function fetchAllOrders() {
	const token = localStorage.getItem("restaurant_jwt");
	const res = await fetch(`${BACKEND_URL}/api/orders/restaurant/all`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("Failed to fetch orders");
	const json = await res.json();
	return json.data;
}

// Fetch Abhryder order summary (today or 30days)
export async function fetchAbhryderOrderSummary(
	partnerId: string,
	range: "today" | "30days",
) {
	const token = localStorage.getItem("restaurant_jwt");
	const res = await fetch(
		`${BACKEND_URL}/api/restaurant/abhryders/${partnerId}/order-summary?range=${range}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	if (!res.ok) throw new Error("Failed to fetch Abhryder order summary");
	const json = await res.json();
	return json.data;
}
