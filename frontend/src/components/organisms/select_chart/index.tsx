import React from 'react';
import RadioButton from '../../atoms/radio_button';
import './styles.css';

const SelectChart: React.FC = () => {
	return (
		<>
			<div className={'box box-grey'}>
				<p>Selecione o tipo de gráfico desejado:</p>
				<div>
					<RadioButton name={'bar'} label={'Barra'} />
				</div>
			</div>
		</>
	);
};

export default SelectChart;
