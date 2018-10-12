import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250
});

class Home extends Component {
	state = {
		newOrders: [{ id: 'item1', content: 'item1' }, { id: 'item2', content: 'item2' }, { id: 'item3', content: 'item3' }],
		processingOrders: [{ id: 'item4', content: 'item4' }, { id: 'item5', content: 'item5' }],
		finishedOrders: [{ id: 'item6', content: 'item6' }]
	};

	id2List = {
		droppable: 'newOrders',
		droppable2: 'processingOrders',
		droppable3: 'finishedOrders'
	};

	getList = id => this.state[this.id2List[id]];

	onDragEnd = result => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			const items = reorder(
				this.getList(source.droppableId),
				source.index,
				destination.index
			);

			let state = { items };

			if (source.droppableId === 'droppable2') {
				state = { processingOrders: items };
			}

			this.setState(state);
		} else {
			const result = move(
				this.getList(source.droppableId),
				this.getList(destination.droppableId),
				source,
				destination
			);

			this.setState({
				newOrders: result.droppable,
				processingOrders: result.droppable2
			});
		}
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>

				<div className="Orders">
					<div>
						{droppable(this.state.newOrders, "droppable")}
					</div>
					<div>
						{droppable(this.state.processingOrders, "droppable2")}
					</div>
					<div>
						{droppable(this.state.finishedOrders, "droppable3")}
					</div>
				</div>
			</DragDropContext>
		);
	}
}

const droppable = (items, droppableid) => (
	<Droppable droppableId={droppableid}>
		{(provided, snapshot) => (
			<div
				ref={provided.innerRef}
				style={getListStyle(snapshot.isDraggingOver)}>
				{items.map((item, index) => (
					<Draggable
						key={item.id}
						draggableId={item.id}
						index={index}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								style={getItemStyle(
									snapshot.isDragging,
									provided.draggableProps.style
								)}>
								{item.content}
							</div>
						)}
					</Draggable>
				))}
				{provided.placeholder}
			</div>
		)}
	</Droppable>
);

export default Home;
