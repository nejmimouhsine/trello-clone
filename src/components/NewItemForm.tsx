import React, { useState } from 'react';
import { NewItemFormContainer, NewItemButton, NewItemInput } from '../styles';

import { useFocus } from '../utils/useFocus';

interface NewItemFormProps {
	onAdd(text: string): void;
}

export const NewItemForm = (props: NewItemFormProps) => {
	const [text, setText] = useState('');
	const inputRef = useFocus();
	const { onAdd } = props;

	return (
		<NewItemFormContainer>
			<NewItemInput
				ref={inputRef}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
		</NewItemFormContainer>
	);
};
