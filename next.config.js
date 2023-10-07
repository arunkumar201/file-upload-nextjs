/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: false,
	compress: true, 
	images: {
		domains: ["files.edgestore.dev"],
	},
	swcMinify: true,

	experimental: {
		swcMinify: true,
	},
};

module.exports = nextConfig;
