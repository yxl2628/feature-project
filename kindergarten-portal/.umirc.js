export default {
  plugins: ['umi-plugin-dva'],
  pages: {
    '/home': { Route: './src/routes/PrivateRoute.js' },
  },
}
