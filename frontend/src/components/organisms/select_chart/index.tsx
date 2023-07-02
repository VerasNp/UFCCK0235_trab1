import React from 'react';
import RadioButton from '../../atoms/radio_button';
import './styles.css';
import { ChartsEnum } from '../../bosons/enums';

interface Props {
	dataType: boolean;
	setChart: React.Dispatch<React.SetStateAction<ChartsEnum | null>>;
}

const SelectChart: React.FC<Props> = ({ dataType, setChart }) => {
	const handleChartSelection: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setChart(Number(e.target.value));
	};

	return (
		<>
			<div className={'box box-grey'}>
				<p>Selecione o tipo de gráfico desejado:</p>
				{dataType ? (
					<div>
						<RadioButton
							name={'chart'}
							label={'test1'}
							value={ChartsEnum.PIE}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'test2'}
							value={ChartsEnum.HISTOGRAM}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'test3'}
							value={ChartsEnum.BAR}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'test4'}
							value={ChartsEnum.BOX_PLOT}
							onChange={handleChartSelection}
						/>
					</div>
				) : (
					<div>
						<RadioButton
							name={'chart'}
							label={'test5'}
							value={ChartsEnum.PIE}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'test6'}
							value={ChartsEnum.BOX_PLOT}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'test7'}
							value={ChartsEnum.BAR}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'test8'}
							value={ChartsEnum.HISTOGRAM}
							onChange={handleChartSelection}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default SelectChart;
