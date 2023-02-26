// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './src',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/modals/(.*)$': '<rootDir>/src/modals/$1',
    '^@/recipients/(.*)$': '<rootDir>/src/recipients/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/wrappers/(.*)$': '<rootDir>/src/wrappers/$1',
    '^@/modals/(.*)$': '<rootDir>/src/modals/$1',
    '^@/providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/test-utils/(.*)$': '<rootDir>/test-utils/$1',
    '^@/mocks/(.*)$': '<rootDir>/mocks/$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['babel-jest', { presets: ['next/babel', '@babel/preset-typescript'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
