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
		type: types.FETCH_TASKS_ID,
		tasks
	};
}

export const actFetchTasksRequest = ()=>{
	return (dispatch) =>{
		return callApi('tour','GET',null).then(res => {
			if(res !=null){
				let tasks=[];
				res.data.map((data,index)=>{
					let task={
						id: data.id,
						freeSpace: data.freeSpace?data.freeSpace:'No Data',
						maximumPeople: data.maximumPeople?data.maximumPeople:'No Data',
						name: data.name,
						price: data.price,
						vehicle: data.vehicle?data.vehicle:'No Data',
						category: data.category?data.category:'No Data',
						fromDate: data.fromDate,
						toDate: data.toDate,
						status: data.status
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
		return callApi(`tours/${id}`,'DELETE',null).then(res =>{
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
			task.status=0;
			return callApi('tours','POST',task).then(res =>{
				dispatch(actFetchTasksRequest());
			})
		}
		else{
			return callApi(`tours`,'PUT',task).then(res =>{
				dispatch(actFetchTasksRequest());
			})
		}
	}
}

export const actFetchTasksRequestId = (id)=>{
	return (dispatch) =>{
		return callApi(`tour/${id}`,'GET',null).then(res => {
			if(res !=null){
				let tasks=[];
				res.data.galleries.map((data,index)=>{
					let task= data.picture;
					tasks[index]=task;
				})
				dispatch(actFetchTasksId(tasks));
			}
		  })
	};
}
export const search = (query) =>{
	return (dispatch) =>{
		return axios({
			method: 'GET',
			url: `${Config.API_URL}/admin/tour/search?query=${query}`,
		  }).then(res =>{
			dispatch(actFetchTasks(res.data));
		  }).catch(err =>{
			console.log(err);
		  });
	}
}