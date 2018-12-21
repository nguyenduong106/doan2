import * as types from './../../constatns/Booking/ActionTypes.js';
import callApi from './../../utils/apiCaller';
import axios from 'axios';
import * as Config from './../../constatns/Config';

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

export const actFetchTasksId= (tasks)=>{
	return {
		type: types.FETCH_TASKS_IDG,
		tasks
	};
}

export const actFetchTasksRequest = ()=>{
	return (dispatch) =>{
		return callApi('galleriess','GET',null).then(res => {
			if(res !=null){
				let tasks=[];
				res.data.map((data,index)=>{
					let task={
						id: data.id,
						picture: data.picture?data.picture:"No Data",
						location: data.location
					};
					tasks[index]=task;
				});
				dispatch(actFetchTasks(tasks));
			}
		  })
	};
}

export const deleteTaskRequest = (id)=>{
	return (dispatch) =>{
		return callApi(`galleries/${id}`,'DELETE',null).then(res =>{
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
			var {data,locationId}=task;
			return axios({
				method: 'POST',
				url: `${Config.API_URL}/galleries/${locationId}`,
				data: data
			  }).then(res =>{
				dispatch(actFetchTasksRequest());
			  })
		}
		else{
			var {id,data,locationId}=task;
			return axios({
				method: 'PUT',
				url: `${Config.API_URL}/galleries/${locationId}/${id}`,
				data: data
			  }).then(res =>{
				dispatch(actFetchTasksRequest());
			  })
		}
	}
}

export const actFetchTasksRequestId = (id)=>{
	return (dispatch) =>{
		return callApi(`galleries/${id}`,'GET',null).then(res => {
			if(res !=null){
				// let tasks=[];
				// res.data.galleries.map((data,index)=>{
				// 	let task= data.picture;
				// 	tasks[index]=task;
				// })
				dispatch(actFetchTasksId(res.data.picture));
			}
		  })
	};
}