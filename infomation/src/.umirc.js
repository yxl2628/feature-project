export default {
  plugins: ['umi-plugin-dva'],
  hd: true,
  outputPath: './kindergarten',
  pages: {
    '/home': { Route: './src/routes/PrivateRoute.js' },
    '/video': { Route: './src/routes/PrivateRoute.js' },
  },
  exportStatic: {}
}
