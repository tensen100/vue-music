import axios from 'axios'

export const getSingerList = async () => {
    const res = await axios.get('/api/getSingerList');
    return res.data;
};

export const getSingerDetail = async (singerId) => {
    const res = await axios.get('/api/getSingerDetail/'+singerId);
    return res.data;
};
