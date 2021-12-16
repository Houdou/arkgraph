import React, { Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import cn from 'classnames';
import style from './style';

import { LEVELS, UNAVAILABLE_LEVELS } from '../../../../models/Levels';
import { MATERIALS } from '../../../../models/Resources';
import sumRequirements from '../../../../models/sumRequirements';
import callArkPlanner from '../../../../services/arkplanner';

import ArkRow from '../../../../components/row';
import ArkCell from '../../../../components/cell';
import ArkItem from '../../../../components/item';

const REQUEST_STATUS = {
	IDLE: 'idle',
	PENDING: 'pending',
	DONE: 'done',
	FAILED: 'failed',
};

const MaterialRow = (compound_materials) => () => (
	<ArkCell
		stretch
		fullwidth
		style={{
			'justify-content': 'flex-start',
			'padding-left': '5px',
			'flex-wrap': 'wrap',
			'align-items': 'stretch',
		}}
	>
		{
			Object.entries(compound_materials).map(([resource_name, quantity]) => {
				const material = MATERIALS.find(({ name }) => resource_name === name);
				const resource = material.id;

				return (
					<div class={style.requirement_cell}>

						<Link href={`/materials/${resource === 'G-4-1' ? '' : resource}`}>
							<ArkItem
								id={resource}
								tier={`T${resource.substr(2, 1)}`}
								scale={0.25}
								disable_link
							/>
						</Link>
						<span>x</span>
						<span
							class={cn(
								style.requirement_quantity,
								{
									[style.long_quantity]: resource !== 'G-4-1' && quantity.toString().length > 2,
								}
							)}
						>{quantity}</span>
					</div>
				);
			})
		}
	</ArkCell>
);

const ArkPlanner = ({
	ir,
	records,
	stock,
	setLevelId,
}) => {
	const [plan, setPlan_raw] = useState(global.plan || null);
	const setPlan = (plan) => {
		global.plan = plan;
		setPlan_raw(plan);
	};
	const [status, setStatus] = useState(global.plan ? REQUEST_STATUS.DONE : REQUEST_STATUS.IDLE);

	const [option_gold_demand, setOptionGoldDemand_raw] = useState(Boolean(global.option_gold_demand || true));
	const setOptionGoldDemand = (value) => {
		try {
			global.ga('send', {
				hitType: 'event',
				eventCategory: 'planner',
				eventAction: 'option_gold_demand',
				eventLabel: value,
			});
		} catch (err) {}
		global.option_gold_demand = value;
		setOptionGoldDemand_raw(value);
	};
	const [option_exp_demand, setOptionExpDemand_raw] = useState(Boolean(global.option_exp_demand || false));
	const setOptionExpDemand = (value) => {
		try {
			global.ga('send', {
				hitType: 'event',
				eventCategory: 'planner',
				eventAction: 'option_exp_demand',
				eventLabel: value,
			});
		} catch (err) {}
		global.option_exp_demand = value;
		setOptionExpDemand_raw(value);
	};
	const [option_extra_outc, setOptionExtraOutc_raw] = useState(Boolean(global.option_extra_outc || false));
	const setOptionExtraOutc = (value) => {
		try {
			global.ga('send', {
				hitType: 'event',
				eventCategory: 'planner',
				eventAction: 'option_extra_outc',
				eventLabel: value,
			});
		} catch (err) {}
		global.option_extra_outc = value;
		setOptionExtraOutc_raw(value);
	};

	const LevelLink = (stage) => () => (
		<ArkCell
			stretch
		>
			<Link
				href={`/farming/${stage}`}
				onClick={e => {
					window.scrollBy(0, -99999);
				}}
			>{stage}</Link>
		</ArkCell>
	);

	const ItemLink = (resource) => () => (
		<ArkCell
			stretch
			style={{
				alignSelf: 'flex-end',
			}}
		>
			<Link href={`/materials/${resource === 'G-4-1' ? '' : resource}`}>
				<ArkItem
					id={resource}
					tier={`T${resource.substr(2, 1)}`}
					scale={0.25}
					disable_link
				/>
			</Link>
		</ArkCell>
	);

	return (
		<div class={style.wrapper}>
			{
				status === REQUEST_STATUS.DONE && (
					<div class={style.plan_result}>
						{
							plan && (
								<Fragment>
									<span class={style.sub_header}>{ir('farming-planner-synthesis', 'Synthesis')}</span>
									<div class={style.plan_section}>
										<ArkRow disable_hover cells={[
											{ content: ir('farming-planner-estimated-times', 'Estimated Runs'), fullwidth: true },
											{
												content: plan.stages
													.map(({ count }) => Number(count) || 0)
													.reduce((a, b) => a + b, 0),
												fullwidth: true,
											},
										]}
										/>
										<ArkRow disable_hover cells={[
											{ content: ir('farming-planner-estimated-sanity', 'Total Estimated Sanity'), fullwidth: true },
											{ content: plan.cost, fullwidth: true },
										]}
										/>
										<ArkRow disable_hover cells={[
											{ content: ir('farming-planner-estimated-exp', 'Total Estimated EXP'), fullwidth: true },
											{ content: plan.exp, fullwidth: true },
										]}
										/>
										<ArkRow disable_hover cells={[
											{ content: ir('farming-planner-estimated-lmd', 'Total Estimated LMD'), fullwidth: true },
											{ content: plan.gold, fullwidth: true },
										]}
										/>
										<ArkRow disable_hover cells={[
											{ content: ir('farming-planner-craft-lmd', 'LMD costs for Crafting'), fullwidth: true },
											{ content: plan.gcost, fullwidth: true },
										]}
										/>
									</div>
									<span class={style.sub_header}>{ir('farming-planner-stages', 'Stages')}</span>
									<div class={style.plan_section}>
										<ArkRow
											cells={[
												{ content: ir('farming-planner-level', 'Stage') },
												{ content: ir('farming-planner-sanity', 'Sanity') },
												{ content: ir('farming-planner-times', '# of Runs') },
												{ content: ir('farming-planner-drop', 'Estimated Drop Items'), fullwidth: true },
											]}
											disable_hover
										/>
										{
											plan.stages.map(({ stage, count, items }) => {
												const level_info = LEVELS.find(({ level }) => level === stage);

												return (
													<ArkRow
														cells={[
															level_info ? LevelLink(stage) : { content: stage },
															level_info ? { content: level_info.energy } : { content: '-' },
															{ content: count },
															MaterialRow(items),
														]}
														stretch
														fullheight
														disable_hover
													/>
												);
											})
										}
									</div>
									<span class={style.sub_header}>{ir('farming-planner-crafting', 'Crafting')}</span>
									<div class={style.plan_section}>
										<ArkRow disable_hover cells={[
											{ content: ir('farming-planner-crafting-item', 'Item') },
											{ content: ir('farming-planner-crafting-lmd-cost', 'LMD') },
											{ content: ir('farming-planner-crafting-amount', 'Amount') },
											{ content: ir('farming-planner-crafting-materials', 'Materials to Craft'), fullwidth: true },
										]}
										/>
										{
											plan.syntheses.map(({ target, count, materials: compound_materials }) => {
												const target_resource = MATERIALS.find(({ name }) => name === target);

												if (!target_resource || Number(count) <= 0) {
													return null;
												}

												return (
													<ArkRow
														cells={[
															ItemLink(target_resource.id),
															target_resource
																? {
																	content: target_resource.formula['G-4-1'],
																}
																: { content: '' },
															{ content: count },
															MaterialRow(compound_materials),
														]}
														stretch
														fullheight
														disable_hover
													/>
												);
											})
										}
									</div>
								</Fragment>
							)
						}
					</div>
				)
			}
			{
				[
					REQUEST_STATUS.IDLE,
					REQUEST_STATUS.FAILED,
					REQUEST_STATUS.DONE,
				].includes(status) && (
					<Fragment>
						<span class={style.sub_header}>{ir('farming-planner-options', 'Options')}</span>
						<div class={style.request_options}>
							<div
								class={cn(
									style.request_option,
									{
										[style.request_option_active]: option_gold_demand,
									}
								)}
								onClick={e => {
									setOptionGoldDemand(!option_gold_demand);
								}}
							>
								{ir('farming-planner-options-lmd-demand', 'Large demand for LMD')}
							</div>
							<div
								class={cn(
									style.request_option,
									{
										[style.request_option_active]: option_exp_demand,
									}
								)}
								onClick={e => {
									setOptionExpDemand(!option_exp_demand);
								}}
							>
								{ir('farming-planner-options-exp-demand', 'Large demand for EXP')}
							</div>
							<div
								class={cn(
									style.request_option,
									{
										[style.request_option_active]: option_extra_outc,
									}
								)}
								onClick={e => {
									setOptionExtraOutc(!option_extra_outc);
								}}
							>
								{ir('farming-planner-options-by-products', 'Consider by-products')}
							</div>
						</div>
						<div class={style.helper_block}>
							<div
								class={style.request_button}
								onClick={async e => {
									const summary = sumRequirements(records, stock, []);
									const required = {};
									const owned = {};
									MATERIALS.forEach(({ id, name }) => {
										if (summary[id]){
											required[name] = summary[id];
										}
										if (stock[id]) {
											owned[name] = stock[id];
										}
									});
									setStatus(REQUEST_STATUS.PENDING);
									try {
										try {
											global.ga('send', {
												hitType: 'event',
												eventCategory: 'planner',
												eventAction: 'query',
											});
										} catch (err) {}

										const result = await callArkPlanner({ required, owned }, {
											gold_demand: option_gold_demand,
											exp_demand: option_exp_demand,
											extra_outc: option_extra_outc,
											exclude: ir.locale === 'zh_CN' ? [] : UNAVAILABLE_LEVELS,
										});
										setStatus(REQUEST_STATUS.DONE);
										setPlan(result);
									} catch (err) {
										try {
											global.ga('send', {
												hitType: 'event',
												eventCategory: 'planner',
												eventAction: 'failed',
												eventLabel: err.message || 'unknown',
											});
										} catch (e) {}

										setStatus(REQUEST_STATUS.FAILED);
										setPlan(null);
									}
								}}
							>{ir('farming-planner-calculate', 'Calculate Farming Plan')}</div>
						</div>
					</Fragment>
				)
			}
			{
				status === REQUEST_STATUS.PENDING && (
					<div class={style.helper_block}>
						<div class={style.request_button}>{ir('farming-planner-calculating', 'Connecting to the neural network')}</div>
					</div>
				)
			}
			{
				status === REQUEST_STATUS.FAILED && (
					<div class={style.helper_block}>{ir('farming-planner-calculate-failed', 'Unable to connect to ArkPlanner...Please try again later')}</div>
				)
			}
			<small>Powered by ArkPlanner & ARK-NIGHTS.com</small>
		</div>
	);
};

export default ArkPlanner;
