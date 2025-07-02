const TestSequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends TestSequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => {
      if (testA.path.includes('01')) return -1;
      if (testB.path.includes('01')) return 1;
      return testA.path.localeCompare(testB.path);
    });
  }
}

module.exports = CustomSequencer;