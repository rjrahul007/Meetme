import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    ...(config.extra || {}),
    MAPTILER_KEY: process.env.MAPTILER_KEY,
  },
});
