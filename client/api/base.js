import axios from 'axios';

export const API = axios.create({ baseURL: 'http://localhost:6969' });

export const getUserIp = async () => {
	
	const res = await axios.get('https://api.ipify.org?format=json');
	// console.log('ip in base:', res.data.ip);
    return res.data.ip;
}