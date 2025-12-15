import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "newimg.otpusk.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
