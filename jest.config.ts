// jest.config.ts
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/(.*)$': '<rootDir>/$1',
    // add more as needed to match tsconfig.json
  },
}

export default createJestConfig(customJestConfig)
