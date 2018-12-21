import * as types from '../../constatns/Booking/ActionTypes.js';

var initialState = {
	id: "",
	tour_id: "",
	user_id: "",
	total: "",
	status: "",
	card_name: "",
	card_number: "",
	expiration_date: "",
	security_code: ""
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