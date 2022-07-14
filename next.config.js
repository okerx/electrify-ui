const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },

  env: {
    API_URL: process.env.API_URL,
  },
};

const nextPlugins = [
  [
    withPWA,
    { pwa: { dest: 'public', disable: process.env.NODE_ENV !== 'production' } },
  ],
  [withBundleAnalyzer],
];

module.exports = withPlugins(nextPlugins, nextConfig);
