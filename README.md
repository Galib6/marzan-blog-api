## Technology Used

- ExpressJS
- NestJS
- TypeORM
- PostgreSQL
- Redis
- Pino (Production-grade logging)

## Running Application

Environment file is available in `environments` directory. Change database credentials then run

```shell
yarn install
yarn start
```

## Production Logging System

This application includes a production-grade logging system with:

- **Automatic log rotation** (daily or when files reach 100MB)
- **Automatic cleanup** (logs older than 15 days are deleted)
- **Scheduled cleanup** runs daily at 2:00 AM
- **Manual cleanup** via API endpoint
- **Log statistics** and monitoring

### Quick Start

```shell
# Logs are automatically managed
# Check logs directory
ls -la logs/

# View log statistics
curl http://localhost:4500/api/v1/logs/statistics

# Manually trigger cleanup
curl -X POST http://localhost:4500/api/v1/logs/cleanup
```

### Documentation

- **[Logging Guide](./LOGGING.md)** - Complete logging documentation
- **[Production Deployment](./PRODUCTION_DEPLOYMENT.md)** - Deployment guide with Docker, K8s, PM2

### Environment Variables

```env
LOG_FOLDER=./logs
SERVICE_NAME=marzan-blog-api
APP_VERSION=1.0.0
NODE_ENV=production
TZ=UTC
```

## Migrations

For creating a migration file

```shell
yarn db:migration:create src/database/migrations/User
```

Before running migration run `yarn build` command

```shell
yarn build
yarn db:migration:run
yarn db:migration:revert
```

## API Documentation

http://localhost:4500/api/v1/docs

### Log Management Endpoints

- `GET /api/v1/logs/statistics` - Get log file statistics
- `POST /api/v1/logs/cleanup` - Manually trigger log cleanup
