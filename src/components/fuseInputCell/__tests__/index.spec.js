import { search } from '../index.js';

describe('ArkFuseInputCell', () => {
	describe('fuse search should produce correct result', () => {
		it('should map hong to 红', () => {
			expect(search('hong')).toBe('红');
		});

		it('should map hongd to 红豆', () => {
			expect(search('hongd')).toBe('红豆');
		});

		it('should map hongdou to 红豆', () => {
			expect(search('hongdou')).toBe('红豆');
		});

		it('should map kong to 空', () => {
			expect(search('kong')).toBe('空');
		});

		it('should map kongbao to 空爆', () => {
			expect(search('kongbao')).toBe('空爆');
		});
	});
});
