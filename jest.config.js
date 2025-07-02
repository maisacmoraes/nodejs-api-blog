module.exports = {
  testSequencer: './__tests__/assets/sequencer.js',
  testRegex: '__tests__/.*\\.test\\.js$',
  testTimeout: 180000,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/models/**',
    '!src/migrations/**',
    '!src/seeders/**',
    '!src/config/**',
    '!src/server.js',
    '!src/app.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
