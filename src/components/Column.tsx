import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { useAppState } from '../AppStateContext';
import { ColumnContainer, ColumnTitle } from '../styles';
import { DragItem } from '../utils/DragItem';
import { useItemDrag } from '../utils/useItemDrag';

import { AddNewItem } from './AddNewItem';
import { Card } from './Card';

interface ColumnProps {
	text: string;
	index: number;
	id: string;
}

export const Column = ({ text, index, id }: ColumnProps) => {
	const { state, dispatch } = useAppState();
	const ref = useRef<HTMLDivElement>(null);
	const [, drop] = useDrop({
		accept: 'COLUMN',
		hover(item: DragItem) {
			if (item.type === 'COLUMN') {
				const dragIndex = item.index;
				const hoverIndex = index;

				if (dragIndex === hoverIndex) {
					return;
				}

				dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } });
			}
		},
	});

	const { drag } = useItemDrag({ type: 'COLUMN', id, index, text });

	drag(drop(ref));

	return (
		<ColumnContainer ref={ref}>
			<ColumnTitle>{text}</ColumnTitle>
			{state.lists[index].tasks.map((task, i) => (
				<Card text={task.text} key={task.id} index={i} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another task"
				onAdd={(text) =>
					dispatch({ type: 'ADD_TASK', payload: { text, taskId: id } })
				}
				dark
			/>
		</ColumnContainer>
	);
};
