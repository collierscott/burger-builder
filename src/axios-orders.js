import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://flickering-torch-1747.firebaseio.com'
    baseURL: 'https://parseapi.back4app.com/classes'
});

instance.defaults.headers.common['X-Parse-Application-Id'] = '1aqIrVFQ0jLl3Csnc2CWARgIjY8c52R4TNpWBfxs';
instance.defaults.headers.common['X-Parse-REST-API-Key'] = 'y0xFLY1Hbb0EbXqw12BLvyhNbHOrMGVJM4MjtWyG';

export default instance;