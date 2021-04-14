import React from 'react';
import { AppContainer } from './styles';
import { useAppState } from './AppStateContext';

import { Column } from './components/Column';
import { AddNewItem } from './components/AddNewItem';

const App = () => {
	const { state, dispatch } = useAppState();

	return (
		<AppContainer>
			{state.lists.map((list, i) => (
				<Column id={list.id} text={list.text} key={list.id} index={i} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another list"
				onAdd={(text) => dispatch({ type: 'ADD_LIST', payload: text })}
			/>
		</AppContainer>
	);
};

export default App;
