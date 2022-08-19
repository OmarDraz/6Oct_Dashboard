import axios from 'axios'

const baseURL = process.env.REACT_APP_HOST_API;

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});


export default axiosInstance