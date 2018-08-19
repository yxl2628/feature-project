export default {
  plugins: ['umi-plugin-dva'],
  outputPath: './information',
  pages: {
    '/mobile/': { document: './src/pages/mobile.ejs' },
    '/pc/': { document: './src/pages/pc.ejs' },
  },
  exportStatic: {}
}
