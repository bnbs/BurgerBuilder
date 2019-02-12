import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8f07f.firebaseio.com'
});

export default instance;