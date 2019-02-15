module.exports = {
  devServer: {
    port: 8080,
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
        { from: /\/allFiles/, to: '/allFiles.html' },
      ],
    },
  },
  pages: {
    index: {
      entry: './src/pages/index/main.js',
      template: 'public/index.html',
      title: 'Index',
    },
    allFiles: {
      entry: './src/pages/allFiles/main.js',
      template: 'public/index.html',
      title: 'Logout',
    },
  },
};
