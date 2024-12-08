# Next.js, TypeScript, and Libraries Setup Guide

## Initial Project Setup

```bash
# Create new Next.js project with all recommended features
npx create-next-app@latest plotos-ai --typescript --tailwind --app --src-dir --import-alias "@/*" --use-yarn

# Additional core dependencies
yarn add zustand @tanstack/react-query d3 plotly.js-dist-min chart.js
yarn add @radix-ui/react-icons @radix-ui/themes
yarn add class-variance-authority clsx tailwind-merge
yarn add @hookform/resolvers zod react-hook-form
yarn add axios socket.io-client

# Development dependencies
yarn add -D @types/d3 @types/plotly.js
yarn add -D jest @testing-library/react @testing-library/jest-dom
yarn add -D cypress prettier eslint-config-prettier
yarn add -D husky lint-staged
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## Project Structure Best Practices

```typescript
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── providers.tsx        # Global providers
│   └── page.tsx             # Home page
├── components/              # React Components
│   ├── ui/                 # Base UI components
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.styles.ts
│   │   │   └── button.test.tsx
│   │   └── input/
│   │       ├── input.tsx
│   │       ├── input.styles.ts
│   │       └── input.test.tsx
│   └── features/           # Feature components
│       ├── plots/
│       └── data/
├── styles/                  # Global styles
│   ├── globals.css         # Global CSS
│   ├── themes/            # Theme configurations
│   └── components/        # Component-specific styles
├── lib/                    # Shared utilities
│   ├── utils/
│   ├── hooks/
│   └── constants/
├── types/                  # TypeScript types
│   ├── common.ts
│   ├── api.ts
│   └── components.ts
└── config/                 # Configuration files
    ├── site.ts
    └── api.ts
```

## TypeScript Configuration

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
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/types/*": ["./src/types/*"],
      "@/config/*": ["./src/config/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Styling Best Practices

### 1. Component-Level Styles

```typescript
// src/components/ui/button/button.styles.ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### 2. Global Styles

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* Add other global variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Add dark theme variables */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Component Structure

```typescript
// src/components/ui/button/button.tsx
import { forwardRef } from 'react';
import { buttonVariants } from './button.styles';
import type { ButtonProps } from './button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```

## State Management with Zustand

```typescript
// src/lib/stores/plot-store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PlotState {
  plots: Plot[];
  activePlot: Plot | null;
  setActivePlot: (plot: Plot) => void;
  addPlot: (plot: Plot) => void;
  removePlot: (id: string) => void;
}

export const usePlotStore = create<PlotState>()(
  devtools(
    persist(
      (set) => ({
        plots: [],
        activePlot: null,
        setActivePlot: (plot) => set({ activePlot: plot }),
        addPlot: (plot) => set((state) => ({ plots: [...state.plots, plot] })),
        removePlot: (id) =>
          set((state) => ({ plots: state.plots.filter((p) => p.id !== id) })),
      }),
      {
        name: 'plot-storage',
      }
    )
  )
);
```

## API Integration

```typescript
// src/lib/api/client.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors
api.interceptors.request.use((config) => {
  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Custom Hooks

```typescript
// src/lib/hooks/use-plot.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/client';

export function usePlot(id: string) {
  return useQuery({
    queryKey: ['plot', id],
    queryFn: () => api.get(`/plots/${id}`).then((res) => res.data),
  });
}

export function useUpdatePlot() {
  return useMutation({
    mutationFn: (data: UpdatePlotData) =>
      api.patch(`/plots/${data.id}`, data).then((res) => res.data),
  });
}
```

## Error Handling

```typescript
// src/lib/utils/error-handler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    // Handle known application errors
    return {
      message: error.message,
      code: error.code,
      status: error.status,
    };
  }

  // Handle unknown errors
  console.error('Unexpected error:', error);
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    status: 500,
  };
}
```

## Testing Setup

```typescript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

## Additional Recommendations

1. **Type Safety**
   - Use strict TypeScript configurations
   - Create comprehensive type definitions
   - Utilize utility types for common patterns

2. **Performance**
   - Implement code splitting
   - Use React.lazy for dynamic imports
   - Optimize images with next/image
   - Utilize React.memo for expensive components

3. **Development Workflow**
   - Set up pre-commit hooks
   - Use conventional commits
   - Implement automated testing
   - Configure CI/CD pipelines

4. **Security**
   - Implement proper authentication
   - Use environment variables
   - Sanitize user inputs
   - Follow OWASP guidelines

5. **Accessibility**
   - Use semantic HTML
   - Implement ARIA attributes
   - Ensure keyboard navigation
   - Test with screen readers

6. **SEO**
   - Utilize Next.js metadata
   - Implement proper OpenGraph tags
   - Use semantic HTML structure
   - Add sitemap generation

7. **Monitoring**
   - Implement error tracking
   - Add performance monitoring
   - Set up analytics
   - Log important events

Would you like me to elaborate on any of these aspects or provide more specific examples for your use case?
