exports.RESOURCES = [
	{
		id: 'G-4-1',
		name: '龙门币',
		tier: 'T4',
		source: {},
		formula: {},
	},
	{
		id: 'M-5-1',
		name: 'D32钢',
		tier: 'T5',
		source: {},
		formula: {
			'M-4-8': 1,
			'M-4-9': 1,
			'M-4-10': 1,
			'G-4-1': 400,
		},
	},
	{
		id: 'M-5-2',
		name: '双极纳米片',
		tier: 'T5',
		source: {},
		formula: {
			'M-4-2': 1,
			'M-4-7': 2,
			'G-4-1': 400,
		},
	},
	{
		id: 'M-5-3',
		name: '聚合剂',
		tier: 'T5',
		source: {},
		formula: {
			'M-4-1': 1,
			'M-4-5': 1,
			'M-4-6': 1,
			'G-4-1': 400,
		},
	},
	{
		id: 'M-4-7',
		name: '白马醇',
		tier: 'T4',
		source: {
			'4-4': '罕见',
		},
		formula: {
			'M-3-7': 1,
			'M-3-4': 1,
			'M-3-10': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-7',
		name: '扭转醇',
		tier: 'T3',
		source: {
			'2-9': '小概率',
			'4-4': '小概率',
		},
		formula: {},
	},
	{
		id: 'M-4-8',
		name: '三水锰矿',
		tier: 'T4',
		source: {
			'4-7': '罕见',
		},
		formula: {
			'M-3-8': 2,
			'M-3-3': 1,
			'M-3-7': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-8',
		name: '轻锰矿',
		tier: 'T3',
		source: {
			'3-2': '小概率',
			'4-7': '小概率',
		},
		formula: {},
	},
	{
		id: 'M-4-9',
		name: '五水研磨石',
		tier: 'T4',
		source: {
			'4-8': '罕见',
		},
		formula: {
			'M-3-9': 1,
			'M-3-5': 1,
			'M-3-2': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-9',
		name: '研磨石',
		tier: 'T3',
		source: {
			'3-3': '小概率',
			'4-8': '小概率',
		},
		formula: {},
	},
	{
		id: 'M-4-10',
		name: 'RMA70-24',
		tier: 'T4',
		source: {
			'4-9': '罕见',
		},
		formula: {
			'M-3-10': 1,
			'M-3-1': 2,
			'M-3-6': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-10',
		name: 'RMA70-12',
		tier: 'T3',
		source: {
			'2-10': '小概率',
			'4-9': '小概率',
		},
		formula: {},
	},
	{
		id: 'M-4-1',
		name: '提纯源岩',
		tier: 'T4',
		source: {
			'4-6': '罕见',
		},
		formula: {
			'M-3-1': 4,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-1',
		name: '固源岩组',
		tier: 'T3',
		source: {
			'2-4': '小概率',
			'4-6': '小概率',
		},
		formula: {
			'M-2-1': 5,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-1',
		name: '固源岩',
		tier: 'T2',
		source: {
			'1-7': '固定',
			'S2-12': '固定',
		},
		formula: {
			'M-1-1': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-1',
		name: '源岩',
		tier: 'T1',
		source: {
			'0-9': '固定',
			'S2-5': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-2',
		name: '改量装置',
		tier: 'T4',
		source: {
			'4-10': '罕见',
		},
		formula: {
			'M-3-2': 1,
			'M-3-1': 2,
			'M-3-9': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-2',
		name: '全新装置',
		tier: 'T3',
		source: {
			'3-4': '小概率',
			'4-10': '小概率',
		},
		formula: {
			'M-2-2': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-2',
		name: '装置',
		tier: 'T2',
		source: {
			'1-12': '中概率',
			'S3-4': '大概率',
		},
		formula: {
			'M-1-2': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-2',
		name: '破损装置',
		tier: 'T1',
		source: {
			'1-5': '中概率',
			'2-3': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-3',
		name: '聚酸酯块',
		tier: 'T4',
		source: {
			'3-8': '罕见',
		},
		formula: {
			'M-3-3': 2,
			'M-3-6': 1,
			'M-3-7': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-3',
		name: '聚酸酯组',
		tier: 'T3',
		source: {
			'2-6': '小概率',
			'3-8': '小概率',
		},
		formula: {
			'M-2-3': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-3',
		name: '聚酸酯',
		tier: 'T2',
		source: {
			'1-8': '大概率',
			'S3-2': '固定',
		},
		formula: {
			'M-1-3': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-3',
		name: '酯原料',
		tier: 'T1',
		source: {
			'0-11': '固定',
			'S2-7': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-4',
		name: '糖聚块',
		tier: 'T4',
		source: {
			'4-2': '罕见',
		},
		formula: {
			'M-3-4': 2,
			'M-3-5': 1,
			'M-3-8': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-4',
		name: '糖组',
		tier: 'T3',
		source: {
			'2-5': '小概率',
			'4-2': '小概率',
		},
		formula: {
			'M-2-4': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-4',
		name: '糖',
		tier: 'T2',
		source: {
			'2-2': '大概率',
			'S3-1': '固定',
		},
		formula: {
			'M-1-4': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-4',
		name: '代糖',
		tier: 'T1',
		source: {
			'0-7': '固定',
			'S2-6': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-5',
		name: '异铁块',
		tier: 'T4',
		source: {
			'S4-1': '罕见',
		},
		formula: {
			'M-3-5': 2,
			'M-3-2': 1,
			'M-3-3': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-5',
		name: '异铁组',
		tier: 'T3',
		source: {
			'2-8': '小概率',
			'S4-1': '小概率',
		},
		formula: {
			'M-2-5': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-5',
		name: '异铁',
		tier: 'T2',
		source: {
			'2-1': '中概率',
			'S3-3': '固定',
		},
		formula: {
			'M-1-5': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-5',
		name: '异铁碎片',
		tier: 'T1',
		source: {
			'1-3': '大概率',
			'S2-8': '固定',
		},
		formula: {},
	},
	{
		id: 'M-4-6',
		name: '酮阵列',
		tier: 'T4',
		source: {
			'4-5': '罕见',
		},
		formula: {
			'M-3-6': 2,
			'M-3-4': 1,
			'M-3-8': 1,
			'G-4-1': 300,
		},
	},
	{
		id: 'M-3-6',
		name: '酮凝集组',
		tier: 'T3',
		source: {
			'3-1': '小概率',
			'4-5': '小概率',
		},
		formula: {
			'M-2-6': 4,
			'G-4-1': 200,
		},
	},
	{
		id: 'M-2-6',
		name: '酮凝集',
		tier: 'T2',
		source: {
			'S2-1': '中概率',
			'3-7': '固定',
		},
		formula: {
			'M-1-6': 3,
			'G-4-1': 100,
		},
	},
	{
		id: 'M-1-6',
		name: '双酮',
		tier: 'T1',
		source: {
			'1-6': '大概率',
			'S2-9': '固定',
		},
		formula: {},
	},
	{
		id: 'S-4-1',
		name: '技巧概要·卷3',
		tier: 'T4',
		source: {},
		formula: {
			'S-3-1': 3,
		},
	},
	{
		id: 'S-3-1',
		name: '技巧概要·卷2',
		tier: 'T3',
		source: {},
		formula: {
			'S-2-1': 3,
		},
	},
	{
		id: 'S-2-1',
		name: '技巧概要·卷1',
		tier: 'T2',
		source: {},
		formula: {},
	},
	{
		id: 'E-5-1',
		name: '高级作战记录',
		tier: 'T5',
		source: {},
		formula: {
			'E-4-1': 2,
		},
	},
	{
		id: 'E-4-1',
		name: '中级作战记录',
		tier: 'T4',
		source: {},
		formula: {
			'E-3-1': 2,
			'E-2-1': 1,
		},
	},
	{
		id: 'E-3-1',
		name: '初级作战记录',
		tier: 'T3',
		source: {},
		formula: {
			'E-2-1': 2,
		},
	},
	{
		id: 'E-2-1',
		name: '基础作战记录',
		tier: 'T2',
		source: {},
		formula: {},
	},
	{
		id: 'C-5-1',
		name: '先锋双芯片',
		tier: 'T5',
		source: {},
		formula: {
			'C-4-1': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-1',
		name: '先锋芯片组',
		tier: 'T4',
		source: {},
		formula: {},
	},
	{
		id: 'C-3-1',
		name: '先锋芯片',
		tier: 'T3',
		source: {},
		formula: {},
	},
	{
		id: 'C-5-2',
		name: '近卫双芯片',
		tier: 'T5',
		source: {},
		formula: {
			'C-4-2': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-2',
		name: '近卫芯片组',
		tier: 'T4',
		source: {},
		formula: {},
	},
	{
		id: 'C-3-2',
		name: '近卫芯片',
		tier: 'T3',
		source: {},
		formula: {},
	},
	{
		id: 'C-5-3',
		name: '重装双芯片',
		tier: 'T5',
		source: {},
		formula: {
			'C-4-3': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-3',
		name: '重装芯片组',
		tier: 'T4',
		source: {},
		formula: {},
	},
	{
		id: 'C-3-3',
		name: '重装芯片',
		tier: 'T3',
		source: {},
		formula: {},
	},
	{
		id: 'C-5-4',
		name: '狙击双芯片',
		tier: 'T5',
		source: {},
		formula: {
			'C-4-4': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-4',
		name: '狙击芯片组',
		tier: 'T4',
		source: {},
		formula: {},
	},
	{
		id: 'C-3-4',
		name: '狙击芯片',
		tier: 'T3',
		source: {},
		formula: {},
	},
	{
		id: 'C-5-5',
		name: '术师双芯片',
		tier: 'T5',
		source: {},
		formula: {
			'C-4-5': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-5',
		name: '术师芯片组',
		tier: 'T4',
		source: {},
		formula: {},
	},
	{
		id: 'C-3-5',
		name: '术师芯片',
		tier: 'T3',
		source: {},
		formula: {},
	},
	{
		id: 'C-5-6',
		name: '医疗双芯片',
		tier: 'T5',
		source: {},
		formula: {
			'C-4-6': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-6',
		name: '医疗芯片组',
		tier: 'T4',
		source: {},
		formula: {},
	},
	{
		id: 'C-3-6',
		name: '医疗芯片',
		tier: 'T3',
		source: {},
		formula: {},
	},
	{
		id: 'C-5-7',
		name: '辅助双芯片',
		tier: 'T5',
		source: {},
		formula: {
			'C-4-7': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-7',
		name: '辅助芯片组',
		tier: 'T4',
		source: {},
		formula: {},
	},

	{
		id: 'C-3-7',
		name: '辅助芯片',
		tier: 'T3',
		source: {},
		formula: {},
	},
	{
		id: 'C-5-8',
		name: '特种双芯片',
		tier: 'T5',
		source: {},
		formula: {
			'C-4-8': 2,
			'O-4-1': 1,
		},
	},
	{
		id: 'C-4-8',
		name: '特种芯片组',
		tier: 'T4',
		source: {},
		formula: {},
	},
	{
		id: 'C-3-8',
		name: '特种芯片',
		tier: 'T3',
		source: {},
		formula: {},
	},
	{
		id: 'O-4-1',
		name: '芯片助剂',
		tier: 'T4',
		source: {},
		formula: {},
	},
];
