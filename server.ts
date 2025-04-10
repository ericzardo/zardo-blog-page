import { createServer } from 'http';
import next from 'next';

const port = parseInt(process.env.PORT || '3111', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { basePath: '/blog', assetPrefix: '/blog' } });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});