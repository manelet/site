module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = { fs: 'empty' }
    }

    return config
  },
  images: { domains: ['scontent-mad1-1.cdninstagram.com'] },
}