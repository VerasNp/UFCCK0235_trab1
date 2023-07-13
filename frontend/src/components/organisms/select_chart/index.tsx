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
							label={'Pizza'}
							value={ChartsEnum.PIE}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'Histograma'}
							value={ChartsEnum.HISTOGRAM}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'Barras'}
							value={ChartsEnum.BAR}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'Box Plot'}
							value={ChartsEnum.BOX_PLOT}
							onChange={handleChartSelection}
						/>
					</div>
				) : (
					<div>
						<RadioButton
							name={'chart'}
							label={'Pizza'}
							value={ChartsEnum.PIE}
							onChange={handleChartSelection}
						/>
						<RadioButton
							name={'chart'}
							label={'Barras'}
							value={ChartsEnum.BAR}
							onChange={handleChartSelection}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default SelectChart;
