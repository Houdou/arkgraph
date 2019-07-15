module.exports = {
	rootDir: 'src',
	testPathIgnorePatterns: ['__fixtures__', 'test.js'],
	testURL: 'http://localhost',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'json', 'node'],
	moduleDirectories: ['node_modules', '<rootDir>'],
	moduleNameMapper: {
		'(style)$': '<rootDir>/__mocks__/styleMock.js',
	},
};
