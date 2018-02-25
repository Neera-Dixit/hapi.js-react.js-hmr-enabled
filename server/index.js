const Path = require('path');
const Hapi = require('Hapi');
const Webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const Config = require('../webpack.config.js');

const server = new Hapi.Server();
const host = 'localhost';
const port = 3000;
server.connection({ host, port });

const compiler = Webpack(Config);
compiler.apply(new DashboardPlugin());

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    host,
    port,
    historyApiFallback: true,
    publicPath: Config.output.publicPath,
    quiet: true  // important for webpack-dashboard to work
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

server.ext('onRequest', (request, reply) => {

    devMiddleware(request.raw.req, request.raw.res, (err) => {

        if (err) {
            return reply(err);
        }

        reply.continue();
    });
});

server.ext('onRequest', (request, reply) => {

  hotMiddleware(request.raw.req, request.raw.res, (err) => {

      if (err) {
          return reply(err);
      }

      reply.continue();
  });
});

server.register([{
    register: require('inert')   
}, {
  register: require('vision')
}], (err) =>  {

  if (err) return console.error(err);
  
    // Add the React-rendering view engine
    server.views({
        engines: {
            jsx: require('hapi-react-views')
        },
        compileOptions: {},
        relativeTo: __dirname,
        path: './views'
    });

    // Add a route to serve static assets (CSS, JS, IMG)
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'build'
        }
      }
    });

     // Add main app route
    server.route({
      method: 'GET',
      path: '/',
      handler: {
        view: 'index'
      }
    });

    server.start(err => {
        if (err) {
            console.error( 'Error was handled!' );
            console.error( err );
        }
        console.log( `Server started at address ${ server.info.uri }` );
    });
});
