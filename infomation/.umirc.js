let copy = null
if (process.env.NODE_ENV === 'development') {
  copy = [{
    from: 'src/static',
    to: './static',
    ignore: 'conf.js'
  },{
    from: 'src/dev',
    to: './static'
  }]
} else {
  copy = [{
    from: 'src/static',
    to: './static'
  }]
}
export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      pwa: true,
      routes: {
        exclude: [],
      },
      polyfills: ['ie9'],
      hardSource: true,
    }],
  ],
  targets: { ie: 9 },
  hash: true,
  base: '/',
  publicPath: '/',
  outputPath: './dist',
  copy: copy,
  theme: {
    'brand-primary': '#d43d3d',
    'brand-primary-tap': '#d43d3d',
    'button-height-sm': '24px',
    'button-font-size-sm': '13px'
  },
  exportStatic: {}
}
