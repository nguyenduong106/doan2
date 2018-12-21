import * as types from './../../constatns/Booking/ActionTypes.js';
import callApi from './../../utils/apiCaller';
import axios from 'axios';
import * as Config from './../../constatns/Config';

export function getCurrentUser() {
    if(!localStorage.getItem(types.ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: types.API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return dispatch=>{
        dispatch({type:types.START_PROCESSING});
        request({
            url: types.API_BASE_URL + "/auth/signin",
            method: 'POST',
            body: JSON.stringify(loginRequest)
        }).then(response=>{
            localStorage.setItem(types.ACCESS_TOKEN, response.accessToken);
            getCurrentUser().then(response=>{
                
                dispatch({type:types.LOG_IN_SUCCESS,currentUser:response});
            });
            dispatch({ type:types.FINISH_PROCESSING});
        }).catch(err=>{
            
                dispatch ({ type:types.SERVER_ERROR,err});
        });
    }
}
export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(types.ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(types.ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
           return json;
        })
    );
};