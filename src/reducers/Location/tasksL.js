import * as types from '../../constatns/Location/ActionTypes.js';

var findIndex = (tasks,id)=>{
	var rs= -1;
	tasks.forEach((task,index)=>{
		if(task.id === id){
			rs = index;
		}
	});
	return rs;
}

// var data= JSON.parse(localStorage.getItem('tasks'));
var initialState= [];

var myReducer = (state= initialState, action) =>{
	var id = '';
	var index= -1;
	switch(action.type){
		case types.FETCH_TASKS:
			state = action.tasks;
			return [...state];
		case types.LIST_ALL:
			return state;
		case types.SAVE_TASK:
			var newTask= {
				id: action.task.id,
			    description: action.task.description,
			    name: action.task.name,
				provider: action.task.provider,
				picutre: action.task.picutre
			};
			if(!newTask.id){
				state.push(newTask);
			}else{
				index= findIndex(state,newTask.id);
				state[index]=newTask;
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.DELETE_TASK:
			id= action.id;
			index= findIndex(state,id);
			state.splice(index,1);
			return [...state];
		default: 
			return state;
	}
};

export default myReducer;