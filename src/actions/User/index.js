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
	tasks.map((data,index)=>{
		let task={
			id: data.id,
			address: data.address!==null?data.address:"No Data",
			birthDate: data.birthDate!==null?data.birthDate:"No Data",
			email: data.email,
			gender: data.gender!==null?data.gender:"No Data",
			name: data.name,
			password: data.password,
			phone: data.phone!==null?data.phone:"No Data",
			username: data.username
		};
		tasks[index]=task;
	});
	return {
		type: types.FETCH_TASKS,
		tasks
	};
}

export const actFetchTasksRequest = ()=>{
	return (dispatch) =>{
		return callApi('customer','GET',null).then(res => {
			if(res !=null){
				let tasks=[];
				res.data.map((data,index)=>{
					let task={
						id: data.id,
						address: data.address!==null?data.address:"No Data",
						birthDate: data.birthDate!==null?data.birthDate:"No Data",
						email: data.email,
						gender: data.gender!==null?data.gender:"No Data",
						name: data.name,
						password: data.password,
						phone: data.phone!==null?data.phone:"No Data",
						username: data.username
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
		return callApi(`customers/${id}`,'DELETE',null).then(res =>{
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
			return callApi('customers','POST',task).then(res =>{
				//dispatch(saveTask(task));
				dispatch(actFetchTasksRequest());
			})
		}
		// else{
		// 	return callApi(`customers/${task.id}`,'PUT',task).then(res =>{
		// 		dispatch(saveTask(task));
		// 	})
		// }
		else{
			return callApi(`customers`,'PUT',task).then(res =>{
				//dispatch(saveTask(task));
				dispatch(actFetchTasksRequest());
			})
		}
	}
}
export const search = (query) =>{
	return (dispatch) =>{
		return axios({
			method: 'GET',
			url: `${Config.API_URL}/admin/customer/search?query=${query}`,
		  }).then(res =>{
			dispatch(actFetchTasks(res.data));
		  }).catch(err =>{
			console.log(err);
		  });
	}
}