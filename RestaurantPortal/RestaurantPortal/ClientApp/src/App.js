import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import MenuCreator from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Login';

export default () => (
	<Switch>
		<Route exact path='/' component={Login} />
		<Layout>    
			<Route path='/manage-orders' component={Home} />
			<Route path='/manage-menu' component={MenuCreator} />
		</Layout>
	</Switch>
);
