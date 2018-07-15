import express from 'express';
import proxy from 'express-http-proxy';
import 'ignore-styles'; // Ignore CSS module imports during server-side rendering.
import serverSideRenderer from './server-side-renderer';
import serverSideComponents from '../src/server-side-components';

const server = express();
const port = process.env.PORT || 3000;
const pageServerBaseUrl = process.env.PAGE_SERVER_BASE_URL || 'http://localhost:4000';

server.listen(port, () => {
  console.info(`✔️ Render server is listening. Visit: 🔗 http://localhost:${port}/`);
});

// Proxy all requests to upstream page server.
server.use(proxy(pageServerBaseUrl, {
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    // If special response header for server-side rendering is present post-process the response.
    if (proxyRes.headers['x-react-server-side-render'] === 'true') {
      return serverSideRenderer(proxyResData.toString('utf8'), serverSideComponents);
    } else {
      return proxyResData;
    }
  }
}));
