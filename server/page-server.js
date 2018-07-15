import path from 'path';
import express from 'express';

const server = express();
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.info(`✔️ Page server is listening. Visit: 🔗 http://localhost:${port}/`);
});

// Simply serve the content of the "build" directory as static resources.
server.use(express.static(path.resolve(__dirname, '..', 'build')));
