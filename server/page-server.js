import path from 'path';
import express from 'express';
import jsonfile from 'jsonfile';

const server = express();
const port = process.env.PORT || 4000;
const serverSideRenderPaths = jsonfile
  .readFileSync(path.resolve(__dirname, 'server-side-render-paths.json'))
  .map((path) => new RegExp(path));

server.listen(port, () => {
  console.info(`✔️ Page server is listening. Visit: 🔗 http://localhost:${port}/`);
});

// Set special response header to enable server-side rendering of React components.
server.use(serverSideRenderPaths, (req, res, next) => {
  res.setHeader('x-react-server-side-render', 'true');
  next();
});

// Simply serve the content of the "build" directory as static resources.
server.use(express.static(path.resolve(__dirname, '..', 'build')));
