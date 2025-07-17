import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: [
			"abhiko-delivery-assets.s3.ap-south-1.amazonaws.com",
			// add any other domains you need here
		],
	},
};

export default nextConfig;
