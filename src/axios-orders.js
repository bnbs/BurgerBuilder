import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-c01cd.firebaseio.com/'
});

export default instance;