import path from 'path';
import express from 'express';
import proxy from 'express-http-proxy';
import jsonfile from 'jsonfile';
import 'ignore-styles'; // Ignore CSS module imports during server-side rendering.
import serverSideRenderer from './server-side-renderer';
import serverSideComponents from '../src/server-side-components';

const server = express();
const port = process.env.PORT || 3000;
const pageServerBaseUrl = process.env.PAGE_SERVER_BASE_URL || 'http://localhost:4000';
const serverSideRenderPaths = jsonfile
  .readFileSync(path.resolve(__dirname, 'server-side-render-paths.json'))
  .map((path) => new RegExp(path));

server.listen(port, () => {
  console.info(`Render server using upstream page server ${pageServerBaseUrl}`);
  console.info(`Render server enabled for these paths: ${serverSideRenderPaths}`);
  console.info(`✔️ Render server is listening. Visit: 🔗 http://localhost:${port}/`);
});

// Configure only specific paths to be handled by server-side rendering. See server-side-render-paths.json
server.use(serverSideRenderPaths, proxy(pageServerBaseUrl, {
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) =>
    serverSideRenderer(proxyResData.toString('utf8'), serverSideComponents)
}));

// Proxy any other path to upstream page server.
server.use(proxy(pageServerBaseUrl));
