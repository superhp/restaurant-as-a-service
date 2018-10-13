import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const changeOrderStatus = (orderId, newStatus) => {
	fetch(`api/order/${orderId}/${newStatus}`, { method: 'PATCH' })
		.then(() => console.log('Order status changed'));
}

const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	changeOrderStatus(removed.orderId, removed.status + 1); 

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

		borderRadius: 5, 

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
	width: 350,
	minHeight: 54
});

class Home extends Component {	

	state = {
		newOrders: [],
		processingOrders: [],
		finishedOrders: []
	};

	id2List = {
		droppable: 'newOrders',
		droppable2: 'processingOrders',
		droppable3: 'finishedOrders'
	};

	componentWillMount = () => {
		fetch('api/order/restaurant/1')
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					newOrders: resp.newOrders,
					processingOrders: resp.processingOrders,
					finishedOrders: resp.finishedOrders 
				}); 
				console.log(resp);
			}); 
	}
	
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

const orderCard = order => (
	<div>
		<div style={{ borderBottom: '1px solid black', marginBottom: '12px'}}>
			<p><b>Table: {order.table}</b></p>
		</div>
		{order.items.map(item => orderItemCard(item))}
	</div>
)

const orderItemCard = item => (
	<div key={item.menuItemId}>
		<p>{item.quantity} x {item.name}</p>
	</div>
)

const droppable = (orders, droppableid) => (
	<Droppable droppableId={droppableid}>
		{(provided, snapshot) => (
			<div
				ref={provided.innerRef}
				style={getListStyle(snapshot.isDraggingOver)}>
				{orders.map((order, index) => (
					<Draggable
						key={order.orderId}
						draggableId={order.orderId}
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
								{orderCard(order)}
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
