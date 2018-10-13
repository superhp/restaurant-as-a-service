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
		fetch('api/menu/1')
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
			categoryId: this.state.newItemType,
			restaurantId: 2,
			name: this.state.newItemName,
			price: this.state.newItemPrice,
			image: this.state.newItemImgUrl
		};
		fetch('api/menu/save', {
			method: 'POST', body: JSON.stringify(item), headers: { "Content-Type": "application/json; charset=utf-8" }
		})
		.then(resp => resp.json())
			.then((resp) => {
				console.log(resp);
				this.fetchMenuItems();
				this.state.newItemName = ''; 
				this.state.newItemPrice = '';
				this.state.newItemPictureUrl = '';
				this.state.newItemImgUrl = '';
				this.state.newItemType = ''; 
			}); 
	}

	render = () => (
		<div className='menu-layout'>
			{this.state.items.map(item =>
				<div className='ui card' style={{ margin: '1em 0' }}>
					<img src={item.image} className='ui image' />
					<div className='content'>
						<div className='header'>{this.state.editMode && this.state.editMenuItemId === item.menuItemId ? <input type='text' value={item.name} onChange={(e) => this.editItem('name', e)} /> : item.name}</div>
						<div className='description'>{this.state.editMode && this.state.editMenuItemId === item.menuItemId ? <input type='text' value={item.price} onChange={(e) => this.editItem('price', e)} /> : <p>Price: {item.price} €</p>}</div>
					</div>
					<div className='extra content' style={{ display: 'flex' }}>
						<div style={{ fontWeight: 'bold' }}>{item.categoryId === 1 ? 'Food' : 'Drink'}</div>
						<div style={{ marginLeft: 'auto' }}><button className='ui button' role='button' onClick={() => this.switchEditMode(item.menuItemId)}>{this.state.editMode && this.state.editMenuItemId === item.menuItemId ? 'Save' : 'Edit'}</button></div>
					</div>
				</div>  
			)}

			<div className='ui card' style={{ margin: '1em 0', backgroundColor: '#FFE983' }}>
				<input type='text' placeholder='Image URL' value={this.state.newItemImgUrl} onChange={e => this.setState({ newItemImgUrl: e.target.value })} />
				<div className='content'>
					<div className='description'><input type='text' placeholder='Name' value={this.state.newItemName} onChange={e => this.setState({ newItemName: e.target.value })} /></div>
					<div className='description'><input type='text' placeholder='Price' value={this.state.newItemPrice} onChange={e => this.setState({ newItemPrice: e.target.value })} /></div>
				</div>
				<div className='extra content' style={{ display: 'flex' }}>
					<div><div className='description'><input type='text' placeholder='Category' value={this.state.newItemType} onChange={e => this.setState({ newItemType: e.target.value })} /></div></div>
					<div style={{ marginLeft: 'auto' }}><button className='ui button' role='button' onClick={() => this.createNewItem()}>Create</button></div>
				</div>
			</div>  
		</div>
	)
};


export default MenuCreator;
