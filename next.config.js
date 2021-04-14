module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = { fs: 'empty' }
    }

    return config
  },

  images: { domains: ['scontent-mad1-1.cdninstagram.com'] },

  serverRuntimeConfig: {
    sendgrid: {
      key: process.env.SENDGRID_API_KEY,
    },
  },
}
