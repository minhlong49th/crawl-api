# Crawler Service Upgrade Plan

## Overview
This document outlines the plan to upgrade the crawler service to support multiple websites. The current implementation is tightly coupled to Uppromote's website structure. This upgrade will introduce a flexible architecture that allows easy integration of new websites.

## Architecture Changes

### 1. Strategy Pattern Implementation

#### BaseCrawlerStrategy
```typescript
abstract class BaseCrawlerStrategy {
  abstract login(page: Page): Promise<void>;
  abstract navigate(page: Page, url: string): Promise<void>;
  abstract extractData(page: Page): Promise<WebsiteData>;
  abstract validateConfiguration(): Promise<void>;
}
```

#### BaseDataExtractor
```typescript
abstract class BaseDataExtractor {
  abstract extractMainData(page: Page): Promise<MainData>;
  abstract extractAdditionalData(page: Page): Promise<AdditionalData>;
  abstract mapToEntity(data: WebsiteData): Promise<EntityData>;
}
```

### 2. Configuration System

#### Website Configuration Structure
```typescript
interface WebsiteConfig {
  name: string;
  type: string;
  version: string;
  selectors: {
    login: {
      emailInput: string;
      passwordInput: string;
      submitButton: string;
    };
    navigation: {
      mainContent: string;
      nextButton: string;
      itemContainer: string;
    };
    data: {
      [key: string]: string | string[];
    };
  };
  authentication: {
    type: 'basic' | 'oauth' | 'none';
    credentials?: {
      [key: string]: string;
    };
  };
  dataMapping: {
    [sourceField: string]: {
      targetField: string;
      transform?: string;
    };
  };
}
```

### 3. Service Layer Updates

1. Update CrawlerService
   - Implement strategy factory
   - Add configuration loading
   - Update error handling

2. Modify TaskService
   - Support different website types
   - Handle website-specific configurations
   - Implement retry mechanisms

### 4. Database Schema Updates

1. Update CrawlTask Entity
```typescript
@Entity()
class CrawlTask {
  // Existing fields...
  
  @Column()
  websiteType: string;
  
  @Column({ type: 'jsonb' })
  websiteConfig: WebsiteConfig;
  
  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;
}
```

2. Make Brand/Offer Entities More Flexible
   - Add dynamic fields support
   - Implement versioning
   - Add website-specific metadata

### 5. Error Handling & Validation

1. Create Website-Specific Error Types
```typescript
class WebsiteCrawlerError extends Error {
  constructor(
    message: string,
    public readonly websiteType: string,
    public readonly context: any
  ) {
    super(message);
  }
}
```

2. Implement Validation System
   - Configuration validation
   - Data structure validation
   - Selector validation

3. Add Retry Mechanisms
   - Rate limiting handling
   - Session recovery
   - Network error recovery

### 6. Testing Infrastructure

1. Create Test Framework
   - Mock website responses
   - Test configuration validation
   - Test data extraction

2. Integration Tests
   - Website-specific test suites
   - End-to-end crawling tests
   - Error handling tests

## Implementation Steps

1. **Phase 1: Core Architecture** (Week 1-2)
   - Create base classes and interfaces
   - Implement configuration system
   - Update database schema

2. **Phase 2: Uppromote Migration** (Week 2-3)
   - Create UppromoteStrategy
   - Create UppromoteExtractor
   - Migrate existing code

3. **Phase 3: Testing & Validation** (Week 3-4)
   - Implement test framework
   - Add integration tests
   - Create validation system

4. **Phase 4: Documentation & Examples** (Week 4)
   - Create documentation
   - Add example implementations
   - Create configuration templates

## Future Considerations

1. **Performance Optimization**
   - Implement parallel crawling
   - Add caching strategies
   - Optimize database queries

2. **Monitoring & Analytics**
   - Add performance metrics
   - Create monitoring dashboard
   - Implement alerting system

3. **Extensibility**
   - Plugin system for custom extractors
   - API for third-party integrations
   - Custom transformation pipelines