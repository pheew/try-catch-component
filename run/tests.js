var jest = require('jest-cli');

var config = {
    automock: false
};

if (process.env.CIRCLE_TEST_REPORTS) {
    config.testResultsProcessor = "../node_modules/jest-junit-reporter";
    process.env.TEST_REPORT_PATH = process.env.CIRCLE_TEST_REPORTS;
}

jest.runCLI({config: config}, './src');