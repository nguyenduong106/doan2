import { combineReducers } from 'redux';
//Booking
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
//Location
import tasksL from '../Location/tasksL';
import tasks1L from '../Location/tasks1L';
import isDisplayFormL from '../Location/isDisplayFormL';
import itemEditingL from '../Location/itemEditingL';
//Tour
import tasksT from './../Tour/tasksT';
import tasks1T from './../Tour/tasks1T';
import isDisplayFormT from './../Tour/isDisplayFormT';
import itemEditingT from './../Tour/itemEditingT';
//User
import tasksU from './../User/tasksU';
import isDisplayFormU from './../User/isDisplayFormU';
import itemEditingU from './../User/itemEditingU';
//Category
import tasksCt from '../Category/tasksCt';
import isDisplayFormCt from '../Category/isDisplayFormCt';
import itemEditingCt from '../Category/itemEditingCt';
//Comment
import tasksCm from '../Comment/tasksCm';
import isDisplayFormCm from '../Comment/isDisplayFormCm';
import itemEditingCm from '../Comment/itemEditingCm';
//Provider
import tasksP from '../Provider/tasksP';
import isDisplayFormP from '../Provider/isDisplayFormP';
import itemEditingP from '../Provider/itemEditingP';
//Rate
import tasksR from '../Rate/tasksR';
import isDisplayFormR from '../Rate/isDisplayFormR';
import itemEditingR from '../Rate/itemEditingR';
//RateType
import tasksRT from './../RateType/tasksRT';
import isDisplayFormRT from './../RateType/isDisplayFormRT';
import itemEditingRT from './../RateType/itemEditingRT';
//Vehicle
import tasksV from './../Vehicle/tasksV';
import isDisplayFormV from './../Vehicle/isDisplayFormV';
import itemEditingV from './../Vehicle/itemEditingV';
//VehicleType
import tasksVt from './../VehicleType/tasksVt';
import isDisplayFormVt from './../VehicleType/isDisplayFormVt';
import itemEditingVt from './../VehicleType/itemEditingVt';
//Gallery
import tasksG from './../Gallery/tasksG';
import tasks1G from './../Gallery/tasks1G';
import isDisplayFormG from './../Gallery/isDisplayFormG';
import itemEditingG from './../Gallery/itemEditingG';
import { AuthReducer } from '../Login';
//Login

const myReducer = combineReducers({
	//Booking
	tasks,
	isDisplayForm,
	itemEditing,
	//Category
	tasksCt,
	isDisplayFormCt,
	itemEditingCt,
	//Comment
	tasksCm,
	isDisplayFormCm,
	itemEditingCm,
	//Location
	tasksL,
	tasks1L,
	isDisplayFormL,
	itemEditingL,
	//Provider
	tasksP,
	isDisplayFormP,
	itemEditingP,
	//Rate
	tasksR,
	isDisplayFormR,
	itemEditingR,
	//Rate-Type
	tasksRT,
	isDisplayFormRT,
	itemEditingRT,
	//Tour
	tasksT,
	tasks1T,
	isDisplayFormT,
	itemEditingT,
	//User
	tasksU,
	isDisplayFormU,
	itemEditingU,
	//Vehicle
	tasksV,
	isDisplayFormV,
	itemEditingV,
	//Vehicle-Type
	tasksVt,
	isDisplayFormVt,
	itemEditingVt,
	//Gallery
	tasksG,
	isDisplayFormG,
	itemEditingG,
	tasks1G,
	//Login
	auth:AuthReducer,
});

export default myReducer;