var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,
  // the main entry point for our application's frontend JS
  entry: ['bootstrap-loader', './app/jsx/entry.cjsx'],
};

config.output = {
  // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
  path: path.join(__dirname, 'app', 'assets', 'javascripts'),
  // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
  filename: 'bundle.js',
  // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
  publicPath: '/assets',
};

config.resolve = {
  // tell webpack which extensions to auto search when it resolves modules. With this,
  // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
  extensions: ['', '.js', '.coffee', '.cjsx'],
  // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
  // Bower, we want it to look in there too
  modulesDirectories: [ 'node_modules' ],
};
config.resolveLoader = {
  modulesDirectories: ['node_modules']
}

config.module = {
  loaders: [
    { test: /\.cjsx$/, loaders: ['coffee', 'cjsx'] },
    { test: /\.json$/, loader: "json-loader" },
    { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
    { test: /\.(ttf|eot)$/, loader: 'file' },
  ]
}

config.plugins = [
  // we need this plugin to teach webpack how to find module entry points for bower files,
  // as these may not have a package.json file
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
  ]),
  new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
  })
];
