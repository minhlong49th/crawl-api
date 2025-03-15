# Crawl API

A NestJS-based API server for crawling website data with anti-bot protection.

## Features

- Crawl data from specific websites with anti-bot measures
- Modular architecture for easy extension to support multiple websites
- PostgreSQL database for data persistence
- Redis caching for improved performance
- Swagger API documentation
- Docker support for easy deployment
- Proxy support
- Local browser profile support

## Prerequisites

- Node.js (v16 or later)
- Docker and Docker Compose
- PostgreSQL
- Redis

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crawl-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following content:
```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=crawl_user
DATABASE_PASSWORD=crawl_password
DATABASE_NAME=crawl_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Uppromote Credentials
UPPROMOTE_EMAIL=your-email
UPPROMOTE_PASSWORD=your-password
```

## Running the Application

### Development Mode

1. Start the database and Redis using Docker:
```bash
docker-compose up -d postgres redis
```

2. Run the application:
```bash
npm run start:dev
```

### Production Mode

1. Build and run using Docker Compose:
```bash
docker-compose up -d
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

## API Endpoints

### Tasks

- `POST /tasks` - Start a new crawling task
  - Request body:
    ```json
    {
      "url": "https://marketplace.uppromote.com/offers/find-offers?page=1&per_page=40",
      "proxy": "http://username:password@proxy.example.com:8080" // Optional
    }
    ```
  - Response: Task ID

- `GET /tasks/:id` - Get task status and data
  - Response:
    ```json
    {
      "status": "PENDING|RUNNING|COMPLETED|FAILED",
      "error": "Error message if failed",
      "data": [
        {
          "name": "Brand Name",
          "website": "https://example.com",
          "description": "Brand description",
          "categories": ["Category 1", "Category 2"],
          "averageEPS": 10.5,
          "payoutRate": "10%",
          "offer": {
            "commissionType": "Percentage",
            "commissionAmount": "10%",
            "commissionRules": "Rules text",
            "promotionOptions": ["Option 1", "Option 2"],
            "cookie": "30 days",
            "targetAudience": "All",
            "preferredPromoChannels": ["Channel 1", "Channel 2"],
            "paymentMethods": ["PayPal", "Bank Transfer"],
            "applicationReview": "Automatic"
          }
        }
      ]
    }
    ```

## Development

### Project Structure

```
src/
├── config/             # Configuration
├── entities/           # Database entities
├── crawler/           # Crawler implementation
│   ├── types.ts
│   ├── browser.service.ts
│   └── crawler.service.ts
├── task/             # Task management
│   ├── dto/
│   ├── task.controller.ts
│   ├── task.module.ts
│   └── task.service.ts
└── main.ts           # Application entry point
```

### Adding Support for New Websites

1. Create a new module in `src/crawler/websites/`
2. Implement the crawler logic following the existing patterns
3. Add the new module to `CrawlerModule` imports

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

This project is licensed under the UNLICENSED license.
