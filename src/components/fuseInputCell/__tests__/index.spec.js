import { fuse } from '../index.js';

describe('ArkFuseInputCell', () => {
	describe('fuse search should produce correct result', () => {
		it('should map hong to 红', () => {
			const [result] = fuse.search('hong');
			expect(result.name).toBe('红');
		});

		it('should map hongd to 红豆', () => {
			const [result] = fuse.search('hongd');
			expect(result.name).toBe('红豆');
		});

		it('should map hongdou to 红豆', () => {
			const [result] = fuse.search('hongd');
			expect(result.name).toBe('红豆');
		});
	});
});
