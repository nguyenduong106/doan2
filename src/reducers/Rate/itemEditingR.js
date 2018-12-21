import * as types from '../../constatns/Booking/ActionTypes.js';

var initialState = {
	id: "",
	rate_type_id: "",
	tour_id: "",
	user_id: ""
};

var myReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.EDIT_TASK:
			return action.task;
		default:
			return state;
	}
};

export default myReducer;