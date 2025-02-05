/** @type {import('@remix-run/dev').RemixConfig} */
module.exports = {
  browserNodeBuiltinsPolyfill: {
    modules: {
      buffer: true,
      events: true,
    },
  },
};
