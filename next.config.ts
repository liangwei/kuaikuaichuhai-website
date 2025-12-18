import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 暂时注释掉 output: 'export' 以支持服务端渲染
  // 如需静态导出，需要改用客户端组件获取数据
  // output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
