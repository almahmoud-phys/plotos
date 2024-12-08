# Plotos.ai Project Setup Guide

## Project Overview

Plotos.ai is a modern, web-based scientific visualization and analysis platform that combines advanced plotting capabilities with AI assistance. This guide outlines the complete project structure and setup process.

## Initial Setup

```bash
# Create new Next.js project with TypeScript
npx create-next-app@latest plotos-ai --typescript --tailwind --app --src-dir --import-alias "@/*"
cd plotos-ai

# Install core dependencies
npm install zustand @tanstack/react-query d3 plotly.js-dist-min chart.js
npm install @radix-ui/react-icons @radix-ui/themes
npm install @types/d3 @types/plotly.js -D

# Development dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D cypress prettier eslint-config-prettier
npm install -D husky lint-staged
```

## Project Structure

```plaintext
plotos-ai/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── plots/
│   │   │   ├── data/
│   │   │   ├── notebook/
│   │   │   │   ├── editor/
│   │   │   │   ├── kernel/
│   │   │   │   └── outputs/
│   │   │   ├── scripts/
│   │   │   │   ├── editor/
│   │   │   │   ├── runner/
│   │   │   │   └── results/
│   │   │   ├── worksheet/
│   │   │   └── settings/
│   │   └── components/
│   ├── plugins/
│   │   ├── widgets/
│   │   │   ├── NumberSpinBox/
│   │   │   └── UTCDateTime/
│   │   └── core/
│   ├── features/
│   │   ├── datapicker/
│   │   ├── spreadsheet/
│   │   └── matrix/
│   ├── integrations/
│   │   ├── docking/
│   │   ├── xlsx/
│   │   ├── origin/
│   │   └── mcap/
│   ├── lib/                     # Shared Libraries
│   │   ├── scientific/          # Scientific Computing
│   │   │   ├── transforms/
│   │   │   ├── statistics/
│   │   │   └── fitting/
│   │   ├── visualization/       # Visualization Utils
│   │   │   ├── colors/
│   │   │   ├── scales/
│   │   │   └── layouts/
│   │   └── utils/
│   ├── templates/
│   ├── themes/
│   ├── welcomescreen/
│   ├── public/
│   └── styles/
├── backend/
│   ├── api/
│   │   ├── plots/
│   │   ├── jupyter/
│   │   │   ├── kernels/
│   │   │   ├── sessions/
│   │   │   └── websocket/
│   │   ├── python/
│   │   │   ├── executor/
│   │   │   ├── packages/
│   │   │   └── environment/
│   │   ├── data/
│   │   └── ai/
│   ├── core/
│   │   ├── datasources/
│   │   ├── gsl/               # GNU Scientific Library Bridge
│   │   └── nsl/               # Numerical Library
│   ├── models/
│   │   ├── plots/
│   │   │   ├── axes/
│   │   │   ├── data/
│   │   │   └── config/
│   │   └── scientific/
│   ├── services/
│   │   ├── file-handlers/
│   │   │   ├── excel/
│   │   │   ├── origin/
│   │   │   └── mcap/
│   │   ├── computation/       # Scientific Computation
│   │   │   ├── transforms/
│   │   │   ├── statistics/
│   │   │   └── optimization/
│   │   ├── auth/
│   │   ├── plot/
│   │   └── data/
│   └── utils/
├── services/
│   ├── ai-service/
│   │   ├── plot-suggestion/
│   │   ├── data-analysis/
│   │   └── optimization/
│   ├── data-processing/
│   │   ├── transforms/
│   │   ├── filtering/
│   │   └── validation/
│   └── real-time/
├── platform/
│   ├── desktop/
│   │   └── touchbar/
│   └── mobile/
├── tools/
│   ├── scientific/           # Scientific Tools
│   └── visualization/        # Visualization Tools
├── docs/
│   ├── api/
│   └── guides/
├── config/
│   ├── development/
│   └── production/
└── scripts/
```

### Directory Structure Details

#### Frontend Layer
- **app/**: Next.js 13+ App Router structure
  - **(auth)**: Authentication-related pages
  - **(dashboard)**: Main application features
  - **components**: Shared React components

- **plugins/**: Extensible functionality
  - **widgets**: Custom UI widgets
  - **core**: Core plugin functionality

- **features/**: Core feature implementations
  - **datapicker**: Date/time selection
  - **spreadsheet**: Tabular data handling
  - **matrix**: Matrix operations UI

- **integrations/**: External system integrations
  - **docking**: Window management
  - **xlsx**: Excel file handling
  - **origin**: Origin file format support
  - **mcap**: MCAP format support

- **lib/**: Shared libraries and utilities
  - **scientific**: Scientific computing
  - **visualization**: Plotting utilities
  - **utils**: Common utilities

#### Backend Layer
- **api/**: API endpoints and handlers
  - **jupyter**: Jupyter notebook integration
  - **python**: Python execution environment
  - **plots**: Plot management
  - **data**: Data management

- **core/**: Core backend functionality
  - **datasources**: Data source handlers
  - **gsl**: GNU Scientific Library integration
  - **nsl**: Numerical library

- **models/**: Data models and schemas
  - **plots**: Plot-related models
  - **scientific**: Scientific computation models

- **services/**: Business logic
  - **file-handlers**: File format handlers
  - **computation**: Scientific computation
  - **auth**: Authentication
  - **plot**: Plot management
  - **data**: Data management

#### Services Layer
- **ai-service/**: AI functionality
  - **plot-suggestion**: Smart plot recommendations
  - **data-analysis**: Automated analysis
  - **optimization**: Performance optimization

- **data-processing/**: Data handling
  - **transforms**: Data transformations
  - **filtering**: Data filtering
  - **validation**: Data validation

- **real-time/**: Real-time features

#### Platform Layer
- **desktop/**: Desktop-specific features
  - **touchbar**: Touch bar support
- **mobile/**: Mobile platform support

#### Supporting Directories
- **tools/**: Development and utility tools
- **docs/**: Documentation
- **config/**: Configuration files
- **scripts/**: Utility scripts

## Component Implementation Guide

### 1. Scientific Computing Components

```typescript
// /frontend/lib/scientific/transforms/FFTAnalyzer.ts
export class FFTAnalyzer {
    async analyze(data: TimeSeriesData): Promise<FFTResult> {
        // FFT implementation
    }
}

// /frontend/lib/scientific/statistics/StatisticalAnalysis.ts
export class StatisticalAnalysis {
    async performAnalysis(dataset: Dataset): Promise<StatisticalResult> {
        // Statistical analysis implementation
    }
}
```

### 2. Visualization Components

```typescript
// /frontend/lib/visualization/PlotRenderer.ts
export class PlotRenderer {
    async render(data: PlotData, config: PlotConfig): Promise<void> {
        // Plot rendering implementation
    }
}

// /frontend/lib/visualization/colors/ColorScheme.ts
export class ColorScheme {
    generateScientificColors(count: number): Color[] {
        // Color scheme implementation
    }
}
```

### 3. Data Processing Pipeline

```typescript
// /services/data-processing/Pipeline.ts
export class DataPipeline {
    async process(input: RawData): Promise<ProcessedData> {
        // Data processing implementation
    }
}
```

## Configuration Files

### 1. TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 2. ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    // Custom rules
  }
}
```

## Development Workflow

1. **Setup Development Environment**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

2. **Running Tests**
```bash
# Run unit tests
npm test

# Run E2E tests
npm run cypress
```

3. **Code Quality**
```bash
# Format code
npm run format

# Lint code
npm run lint
```

## Implementation Priorities

1. **Phase 1: Core Infrastructure** (Week 1-2)
   - Project setup
   - Basic routing
   - Authentication system
   - Core components

2. **Phase 2: Scientific Features** (Week 3-4)
   - Plot engine
   - Data processing
   - Scientific computing
   - Basic visualizations

3. **Phase 3: Advanced Features** (Week 5-6)
   - AI integration
   - Jupyter support
   - Advanced plots
   - Real-time features

4. **Phase 4: Polish & Optimization** (Week 7-8)
   - Performance optimization
   - UI/UX improvements
   - Documentation
   - Testing

## Documentation

Maintain comprehensive documentation in the `/docs` directory:

```plaintext
docs/
├── api/                    # API documentation
├── guides/                 # User guides
├── development/           # Development guides
└── deployment/           # Deployment instructions
```

## Git Workflow

1. **Branch Strategy**
   - `main`: Production-ready code
   - `develop`: Development branch
   - `feature/*`: New features
   - `bugfix/*`: Bug fixes
   - `release/*`: Release preparation

2. **Commit Convention**
   ```
   type(scope): description
   
   [optional body]
   
   [optional footer]
   ```
   Types: feat, fix, docs, style, refactor, test, chore

## Deployment

1. **Development**
   - Vercel Preview Deployments
   - Automated CI/CD

2. **Production**
   - Vercel Production Deployment
   - Environment Variables
   - Performance Monitoring

## Next Steps

1. Clone this repository structure
2. Install dependencies
3. Set up development environment
4. Begin implementation following the phases outlined above

Remember to:
- Follow TypeScript best practices
- Write tests for new features
- Document your code
- Follow the git workflow
- Regular code reviews
