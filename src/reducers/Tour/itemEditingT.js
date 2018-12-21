import * as types from '../../constatns/Booking/ActionTypes.js';

var initialState= {
	    id: "",
        freeSpace: "",
        maximumPeople: "",
		name: "",
		locations: "",
        price: "",
		vehicle:"",
		category:"",
		fromDate:"", 
		toDate:"",
		picutre: ""
};

var myReducer = (state= initialState, action) =>{
	switch(action.type){
		case types.EDIT_TASK:
			return action.task;	
		default: 
			return state;
	}
};

export default myReducer;