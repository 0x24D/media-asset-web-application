module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 80,
        historyApiFallback: {
          rewrites: [
            { from: /\/index/, to: '/index.html' },
            { from: /\/login/, to: '/login.html' },
            { from: /\/logout/, to: '/logout.html' },
            { from: /\/allFiles/, to: '/allFiles.html' },
          ]
        }
    },
    pages: {
      index: {
        entry: './src/pages/index/main.js',
        template: 'public/index.html',
        title: 'Index'
      },
      login: {
        entry: './src/pages/login/main.js',
        template: 'public/index.html',
        title: 'Login'
      },
      logout: {
        entry: './src/pages/logout/main.js',
        template: 'public/index.html',
        title: 'Logout'
      },
      allFiles: {
        entry: './src/pages/allFiles/main.js',
        template: 'public/index.html',
        title: 'Logout'
      },
    }
};
