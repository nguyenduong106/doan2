import * as types from './../../constatns/Booking/ActionTypes.js';
import callApi from './../../utils/apiCaller';

export const listAll= ()=>{
	return {
		type: types.LIST_ALL
	};
}

export const saveTask = (task) => {
	return {
		type: types.SAVE_TASK,
		task
	};
}

export const toggleForm = () => {
	return {
		type: types.TOGGLE_FORM,
	};
}

export const openForm = () => {
	return {
		type: types.OPEN_FORM,
	};
}

export const closeForm = () => {
	return {
		type: types.CLOSE_FORM,
	};
}

export const deleteTask = (id) => {
	return {
		type: types.DELETE_TASK,
		id
	};
}

export const editTask = (task) => {
	return {
		type: types.EDIT_TASK,
		task
	};
}

export const actFetchTasks= (tasks)=>{
	return {
		type: types.FETCH_TASKS,
		tasks
	};
}

export const actFetchTasksRequest = ()=>{
	return (dispatch) =>{
		return callApi('tickets','GET',null).then(res => {
			if(res !=null){
				dispatch(actFetchTasks(res.data));
			}
		  })
	};
}

export const deleteTaskRequest = (id)=>{
	return (dispatch) =>{
		return callApi(`tickets/${id}`,'DELETE',null).then(res =>{
			if(res !== undefined){
				dispatch(deleteTask(id));
			}else{
				alert("Bản ghi tồn tại trong bảng khác");
			}
		});
	}
}

export const saveTasksRequest = (task) =>{
	return (dispatch) =>{
		if(!task.id){
			return callApi('tickets','POST',task).then(res =>{
				dispatch(saveTask(task));
			})
		}
		else{
			return callApi(`tickets`,'PUT',task).then(res =>{
				dispatch(saveTask(task));
			})
		}
	}
}