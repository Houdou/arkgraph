import { search } from '../index.js';

describe('ArkFuseInputCell', () => {
	describe('fuse search should produce correct result', () => {
		it('should map hong to 红', () => {
			expect(search('hong', 'zh_CN').unique_id).toBe('char_144_red');
		});

		it('should map hongd to 红豆', () => {
			expect(search('hongd', 'zh_CN').unique_id).toBe('char_290_vigna');
		});

		it('should map hongdou to 红豆', () => {
			expect(search('hongdou', 'zh_CN').unique_id).toBe('char_290_vigna');
		});

		it('should map kong to 空', () => {
			expect(search('kong', 'zh_CN').unique_id).toBe('char_101_sora');
		});

		it('should map kongbao to 空爆', () => {
			expect(search('kongbao', 'zh_CN').unique_id).toBe('char_282_catap');
		});
	});
});
