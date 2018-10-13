import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react'; 

class MenuCreator extends Component {

	state = {
		items: [],
		editMode: false, 
		editMenuItemId: 2, 
		newItemName: '', 
		newItemPrice: '', 
		newItemPictureUrl: '' 
	}; 

	fetchMenuItems = () => {
		fetch('api/menu/2')
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					items: resp
				});
				console.log(resp);
			}); 
	}

	componentWillMount = () => {
		this.fetchMenuItems(); 
	}

	editItem = (element, e) => {
		let item = this.state.items.find(x => x.menuItemId === this.state.editMenuItemId); 
		if (element === 'name') {
			item.name = e.target.value; 
		}
		if (element === 'price') {
			item.price = e.target.value;
		}
		this.setState({ items: this.state.items }); 
	}

	switchEditMode = menuItemId => {
		this.setState({
			editMenuItemId: menuItemId,
			editMode: !this.state.editMode
		}); 
	}

	createNewItem = () => {
		let item = {
			categoryId: 1,
			restaurantId: 2,
			name: this.state.newItemName,
			price: this.state.newItemPrice,
			image: ''
		};
		fetch('api/menu/save', {
			method: 'POST', body: JSON.stringify(item), headers: { "Content-Type": "application/json; charset=utf-8" }
		})
		.then(resp => resp.json())
		.then((resp) => { console.log(resp); this.fetchMenuItems(); }); 
	}

	render = () => (
		<div className='menu-layout'>
			{this.state.items.map(item =>
				<div className='ui card' style={{ margin: '1em 0' }}>
					<img src='/images/avatar/large/matthew.png' className='ui image' />
					<div className='content'>
						<div className='header'>{this.state.editMode && this.state.editMenuItemId === item.menuItemId ? <input type='text' value={item.name} onChange={(e) => this.editItem('name', e)} /> : item.name}</div>
						<div className='description'>{this.state.editMode && this.state.editMenuItemId === item.menuItemId ? <input type='text' value={item.price} onChange={(e) => this.editItem('price', e)} /> : <p>Price: {item.price} euro</p>}</div>
					</div>
					<div className='extra content' style={{ display: 'flex' }}>
						<div style={{ fontWeight: 'bold' }}>{item.categoryId === 1 ? 'Food' : 'Drink'}</div>
						<div style={{ marginLeft: 'auto' }}><button className='ui button' role='button' onClick={() => this.switchEditMode(item.menuItemId)}>{this.state.editMode && this.state.editMenuItemId === item.menuItemId ? 'Save' : 'Edit'}</button></div>
					</div>
				</div>  
			)}

			<div className='ui card' style={{ margin: '1em 0', backgroundColor: '#90ee9054' }}>
				<img src='/images/avatar/large/matthew.png' className='ui image' />
				<div className='content'>
					<div className='header'><input type='text' value={this.state.newItemName} onChange={e => this.setState({ newItemName: e.target.value })} /></div>
					<div className='description'><input type='text' value={this.state.newItemPrice} onChange={e => this.setState({ newItemPrice: e.target.value })} /></div>
				</div>
				<div class='extra content' style={{ display: 'flex' }}>
					<div style={{ fontWeight: 'bold' }}>Food</div>
					<div style={{ marginLeft: 'auto' }}><button className='ui button' role='button' onClick={() => this.createNewItem()}>Create</button></div>
				</div>
			</div>  
		</div>
	)
};


export default MenuCreator;
