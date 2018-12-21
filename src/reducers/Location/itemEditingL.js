import * as types from '../../constatns/Location/ActionTypes.js';

var initialState= {
	    id: "",
        description: "",
        name: "",
		provider: "",
		picutre: "",
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