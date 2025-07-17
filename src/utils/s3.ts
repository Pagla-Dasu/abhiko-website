// S3 image URL helper for menu images

const S3_BUCKET = "abhiko-restaurant-assets";
const S3_REGION = "ap-south-1";

/**
 * Returns a full S3 URL if the input is just a key, otherwise returns the input as-is.
 * @param imageUrl string | undefined
 */
export function getS3ImageUrl(imageUrl?: string) {
	if (!imageUrl) return undefined;
	if (imageUrl.startsWith("http")) return imageUrl;
	// Remove leading slash if present
	const key = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
	return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${key}`;
}
