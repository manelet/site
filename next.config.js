module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = { fs: 'empty' }
    }
    return config
  },
  images: { domains: ['scontent-mad1-1.cdninstagram.com'] },
  publicRuntimeConfig: {
    ogBaseUrl: process.env.OG_URL,
    baseUrl: process.env.BASE_URL,
  },
  serverRuntimeConfig: {
    sendgrid: {
      key: process.env.SENDGRID_API_KEY,
    },
    instagram: {
      token: process.env.INSTAGRAM_ACCESS_TOKEN,
    },
  },
}
