import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Login';

export default () => (
	<Switch>
		<Route path='/' component={Login} />
		<Layout>    
			<Route exact path='/manage' component={Home} />
		</Layout>
	</Switch>
);
