export async function fetchRestaurants({
	search = "",
	filter = "",
	sort = "",
}: {
	search?: string;
	filter?: string;
	sort?: string;
}) {
	const query = new URLSearchParams();

	if (search) query.append("search", search);
	if (filter) query.append("filter", filter);
	if (sort) query.append("sort", sort);

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/restaurants?${query.toString()}`,
	);

	if (!res.ok) throw new Error("Failed to fetch restaurants");

	return res.json();
}
