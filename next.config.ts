/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '5mb',
			allowedOrigins: ['*'],
			disableDynamicValues: true, // Ensure no dynamic values are used
		},
	},
	images: {
		domains: ["img.clerk.com", "utfs.io", "res.cloudinary.com"],
	},
};

module.exports = nextConfig;
