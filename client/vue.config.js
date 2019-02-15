module.exports = {
  devServer: {
    port: 8080,
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
        { from: /\/all/, to: '/all.html' },
        { from: /\/edit/, to: '/edit.html' },
        { from: /\/file/, to: '/file.html' },
        { from: /\/new/, to: '/new.html' },
      ],
    },
  },
  pages: {
    index: {
      entry: './src/pages/index/main.js',
      template: 'public/index.html',
      title: 'Index',
    },
    all: {
      entry: './src/pages/all/main.js',
      template: 'public/index.html',
      title: 'All Files',
    },
    edit: {
      entry: './src/pages/edit/main.js',
      template: 'public/index.html',
      title: 'Edit File',
    },
    file: {
      entry: './src/pages/file/main.js',
      template: 'public/index.html',
      title: 'View File',
    },
    new: {
      entry: './src/pages/new/main.js',
      template: 'public/index.html',
      title: 'New File',
    },
  },
};
