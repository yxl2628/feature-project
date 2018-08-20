export default {
  plugins: ['umi-plugin-dva'],
  outputPath: './dist',
  pages: {
    '/mobile/': { document: './src/pages/mobile.ejs' },
    '/pc/': { document: './src/pages/pc.ejs' },
  },
  exportStatic: {}
}
