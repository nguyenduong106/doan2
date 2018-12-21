import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Store
import {createStore, applyMiddleware} from 'redux';
import myReducer from './reducers/Booking/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store= createStore(
	myReducer,
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('content'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
