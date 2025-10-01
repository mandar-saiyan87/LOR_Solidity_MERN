/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        authInterrupts: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`
            }
        ]
    }
};

export default nextConfig;
