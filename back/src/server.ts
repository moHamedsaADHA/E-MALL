import app from './app';
import connectDatabase from './config/database';
import { ENV } from './config/env';
import logger from './utils/logger';

const port = Number(ENV.PORT || 4000);

(async function start() {
  try {
    await connectDatabase();
    app.listen(port, () => logger.info(`Server listening on port ${port}`));
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
})();
