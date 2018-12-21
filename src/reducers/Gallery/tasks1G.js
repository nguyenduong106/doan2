import * as types from '../../constatns/Location/ActionTypes.js';

// var data= JSON.parse(localStorage.getItem('tasks'));
var initialState= [];

var myReducer = (state= initialState, action) =>{
	switch(action.type){
		case types.FETCH_TASKS_IDG:
			state = action.tasks;
			return state;
		default: 
			return state;
	}
};

export default myReducer;