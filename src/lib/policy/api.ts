import { BACKEND_URL } from "@/lib/api";

export async function fetchPolicyTerms(type: string) {
	const url = BACKEND_URL
		? `${BACKEND_URL}/api/public/terms/${type}`
		: `/api/public/terms/${type}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error("Failed to fetch policy terms");
	return res.json();
}
