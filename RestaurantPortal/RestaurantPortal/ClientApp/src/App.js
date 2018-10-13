import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import MenuCreator from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Login';
import BrandManagement from './components/BrandManagement';

export default () => (
	<Switch>
		<Route exact path='/' component={Login} />
		<Layout>    
			<Route path='/manage-orders' component={Home} />
			<Route path='/manage-menu' component={MenuCreator} />
			<Route path='/brand' component={BrandManagement} />
		</Layout>
	</Switch>
);
