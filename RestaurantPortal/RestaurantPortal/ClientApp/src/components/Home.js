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
		marginBottom: '20px',
		fontSize: '5px',
		// change background colour if dragging
		background: isDragging ? 'rgb(244, 249, 30)' : 'rgb(254, 255, 211)',

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
	background: isDraggingOver ? '#FFDC37' : 'rgba(228, 0, 0, 0.6)',
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

	fetchOrders = () => {
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

	componentWillMount = () => {
		this.fetchOrders(); 
		setInterval(() => this.fetchOrders(), 3000); 
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
							{droppable(this.state.newOrders, "droppable", "New Orders")} 
						</div>
					</div>
					<div className="OrdersColumn">
						<div>
							{droppable(this.state.processingOrders, "droppable2", "Processing Orders")}
						</div>
					</div>
					<div className="OrdersColumn">
						<div>
							{droppable(this.state.finishedOrders, "droppable3", "Finished Orders")}
						</div>
					</div>
				</div>
			</DragDropContext>
		);
	}
}

const orderCard = order => (
	<div>
		<div style={{ display: 'flex', borderBottom: '1px solid black', marginBottom: '12px' }}>
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

const droppable = (orders, droppableid, title) => (
	<Droppable droppableId={droppableid}>
		{(provided, snapshot) => (
			<ul className='notes'
				ref={provided.innerRef}
				style={getListStyle(snapshot.isDraggingOver)}>
				<div className='notes-header'>
					<p>{title}</p>
				</div>
				{orders.map((order, index) => (
					<Draggable
						key={order.orderId}
						draggableId={order.orderId}
						index={index}>						
						{(provided, snapshot) => (
							<li
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								style={getItemStyle(
									snapshot.isDragging,
									provided.draggableProps.style
								)}>
								{orderCard(order)}
							</li>
						)}
					</Draggable>
				))}
				{provided.placeholder}
			</ul>
		)}
	</Droppable>
);

export default Home;
