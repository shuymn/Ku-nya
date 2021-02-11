const path = require('path')
const webpack = require('webpack')

/** @type import("webpack").Configuration */
const config = {
  context: path.join(__dirname, 'src'),
  entry: {
    'dist/main': './main.tsx',
    'dist/popup': './popup.tsx',
    background: './background.tsx',
    sw: './sw.js',
  },
  output: {
    path: path.join(__dirname, 'release'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN || null),
    }),
  ],
}

module.exports = (_env, argv) => {
  config.optimization = { minimize: argv.mode === 'production' }
  return config
}
