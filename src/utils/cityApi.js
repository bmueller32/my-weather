



// we need to use the tokenService to get the token out of localstorage

import tokenService from "./tokenService";


const BASE_URL = '/api/city/';


// Making a request to create a CITY
// this function will occur when a user is logged in
// so we have to send the token to the server!
export function create(data){
	console.log(data)
	return fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify({location : data}), 
		headers: {
			// convention for sending jwts
			'Content-Type': 'application/json',
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			// so the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(responseFromTheServer => {
		console.log(responseFromTheServer)
		if(responseFromTheServer.ok) return responseFromTheServer.json() // so if everything went well in the response return 
		//the parsed json to where we called the function

		throw new Error('Something went wrong in create City'); // this will go to the catch block when we call the function in the AddCityForm in
		// handleSubmit
	})
}


// call this function in a useEffect in the feedpage
// this funciton is making a request to this route
// on express server router.get('/', citiesCtrl.index) /api/cities
export function getAll(){
	return fetch(BASE_URL, {
		method: 'GET',
	    headers: {
			// convention for sending jwts
			
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			// so the server knows who the request is coming from when the client is trying to make a City
		}	
	}).then(responseFromTheServer => {
		if(responseFromTheServer.ok) return responseFromTheServer.json() // so if everything went well in the response return 
		//the parsed json to where we called the function

		throw new Error('Something went wrong in getAll cities, check the terminal!'); // this will go to the catch block when we call the function in the Add
		// handleSubmit
	})
}

export function deleteCity(cityId){
    return fetch(`${BASE_URL}/${cityId}`, {
        method:'DELETE',
        headers: {
			// convention for sending jwts
			
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and and it to our api request
			// so the server knows who the request is coming from when the client is trying to make a City
    }
}).then(responseFromTheServer => {
    if(responseFromTheServer.ok) return responseFromTheServer.json() // 
    throw new Error('Something went wrong in delete City'); 
})
}
