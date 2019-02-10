import * as express from 'express'
import * as compression from 'compression'
import * as proxy from 'express-http-proxy'

const LOCAL_SERVER_PATH = 'http://localhost:3000';
const STAGING_SERVER_PATH = 'https://musci-player-demo.herokuapp.com';
const PRODUCTION_SERVER_PATH = 'https://musci-player-demo.herokuapp.com';
const API_PATH = '/api';

let SERVER_PATH = LOCAL_SERVER_PATH;

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'development';

switch (process.env.NODE_ENV) {

  case 'development':
    SERVER_PATH = LOCAL_SERVER_PATH;
    break;
  case 'staging':
    SERVER_PATH = STAGING_SERVER_PATH;
    break;
  case 'production':
    SERVER_PATH = PRODUCTION_SERVER_PATH;
    break;
  default:
    SERVER_PATH = LOCAL_SERVER_PATH;
    break;
}

let app = express();

// The number of milliseconds in one day
let oneDay = 86400000;

// Use compress middleware to gzip content
app.use(compression());

// Serve up content from dist directory
app.use(express.static(__dirname + '/dist', { maxAge: oneDay }));

app.use(API_PATH, proxy(SERVER_PATH, {
  proxyReqPathResolver: (req) => {
    return API_PATH + require('url').parse(req.url).path;
  }
}));


app.listen(process.env.PORT, () => {
  console.log(`Server is started in ${process.env.NODE_ENV} mode at port ${process.env.PORT}` )
  // scheduler.scheduleMessengerCleanUp();
});

