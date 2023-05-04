const path = require('path');

module.exports = {
  mount: {
    // Mount "public" to the root URL path ("/*") /build dir
    //public: {url: '/', static: true},
    // Mount "src" to the root of the /build dir
    src: '/',
  },
  plugins: [
    // "@snowpack/plugin-svelte",
    "@snowpack/plugin-babel",
    [
      '@snowpack/plugin-webpack',
      {
        outputPattern: {
          js: "index.js",
          css: "index.css",
        },
        extendConfig: config => {
          delete config.optimization.splitChunks;
          delete config.optimization.runtimeChunk;
          config.module.rules[0] = {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env'] }
              },
              {
                loader: path.resolve(__dirname, './node_modules/@snowpack/plugin-webpack/plugins/import-meta-fix.js')
              },
              {
                loader: path.resolve(__dirname, './node_modules/@snowpack/plugin-webpack/plugins/proxy-import-resolve.js')
              }
            ]
          }
          return config;
        }
      }
    ]
  ],
  optimize: {
    preload: false,
    bundle: false,
    splitting: false,
    treeshake: true,
    manifest: false,
    minify: false,
  },
};