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

export const actFetchTasksRequest = ()=>{
	return (dispatch) =>{
		return callApi('rates','GET',null).then(res => {
			if(res !=null){
				let tasks=[];
				res.data.map((data,index)=>{
					let task={
						id: data.id,
						rateType: data.rateType?data.rateType:'No Data',
						tour: data.tour?data.tour:'No Data',
						user: data.user?data.user:'No Data'
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
		return callApi(`rate/${id}`,'DELETE',null).then(res =>{
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
			return callApi('rate','POST',task).then(res =>{
				dispatch(actFetchTasksRequest());
			})
		}
		// else{
		// 	return callApi(`rate/${task.id}`,'PUT',task).then(res =>{
		// 		dispatch(saveTask(task));
		// 	})
		// }
		else{
			return callApi(`rate`,'PUT',task).then(res =>{
				dispatch(actFetchTasksRequest());
			})
		}
	}
}
export const search = (query) =>{
	return (dispatch) =>{
		return axios({
			method: 'GET',
			url: `${Config.API_URL}/admin/rate/search?query=${query}`,
		  }).then(res =>{
			  console.log(res.data);
			dispatch(actFetchTasks(res.data));
		  }).catch(err =>{
			console.log(err);
		  });
	}
}