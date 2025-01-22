/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '1mb',
			allowedOrigins: ['*'],
		},
	},
	images: {
		domains: ["img.clerk.com", "utfs.io", "res.cloudinary.com"],
	},
};

module.exports = nextConfig;
