/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['shopping-phinf.pstatic.net', 'pilly.kr'],
  },
  env: {
    REACT_APP_API_URL: 'https://o-nu.com/api',
    REACT_APP_KAKAO_URL:
      'https://o-nu.com/api/oauth2/authorize/kakao?redirect_uri=https://o-nu.com/user/redirect',
    REACT_APP_TEST_URL:
      'https://o-nu.com/api/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/user/redirect',
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
