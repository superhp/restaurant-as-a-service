import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

const getItemStyle = (isDragging, draggableStyle) => {
	let style =  {
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',
		padding: grid * 2,
		margin: `0 0 ${grid}px 0`,

		// change background colour if dragging
		background: isDragging ? 'lightgreen' : 'white',

		// styles we need to apply on draggables
		...draggableStyle
	};
	if (isDragging) {
		style.transform = style.transform + ' rotate(5deg)';
	}
	return style; 
};

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 350
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

	onDragEnd = inpt => {
		const { source, destination } = inpt;

		// dropped outside the list
		if (!destination) {
			return;
		} 

		if (source.droppableId === 'droppable' && destination.droppableId === 'droppable2') {
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

		if (source.droppableId === 'droppable2' && destination.droppableId === 'droppable3') {
			const result = move(
				this.getList(source.droppableId),
				this.getList(destination.droppableId),
				source,
				destination
			);

			this.setState({
				processingOrders: result.droppable2,
				finishedOrders: result.droppable3
			});
		}
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>

				<div className="Orders">
					<div className="OrdersColumn">
						<div>
							<h2>New Orders</h2>
						</div>
						<div>
							{droppable(this.state.newOrders, "droppable")} 
						</div>
					</div>
					<div className="OrdersColumn">
						<div>
							<h2>Processing Orders</h2>
						</div>
						<div>
							{droppable(this.state.processingOrders, "droppable2")}
						</div>
					</div>
					<div className="OrdersColumn">
						<div>
							<h2>Finished Orders</h2>
						</div>
						<div>
							{droppable(this.state.finishedOrders, "droppable3")}
						</div>
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
