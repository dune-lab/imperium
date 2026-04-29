import { listen } from '@enxoval/http';
import { buildApp } from './app';

const PORT = Number(process.env.PORT) || 3004;
const HOST = process.env.HOST || '0.0.0.0';

buildApp();

listen(PORT, HOST).catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
