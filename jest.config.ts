export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      diagnostics: false,
      tsconfig: {
        jsx: 'react-jsx',
        verbatimModuleSyntax: false,
        noUnusedLocals: false,
        noUnusedParameters: false
      },
      astTransformers: {
        before: [
          {
            path: 'ts-jest-mock-import-meta',
            options: { metaObjectReplacement: { env: { DEV: true } } }
          }
        ]
      }
    }]
  },
  collectCoverageFrom: [
    "src/features/**/*.{ts,tsx}"
  ],
  coverageThreshold: {
    './src/features/': {
      statements: 70
    }
  }
};
