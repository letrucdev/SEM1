/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: '_next',
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8000',
				pathname: '/storage/**',
			},
			{
				protocol: 'https',
				hostname: 'api.eproject.neondev.app',
				port: '',
				pathname: '/storage/**',
			},
		],
	},
}

export default nextConfig
