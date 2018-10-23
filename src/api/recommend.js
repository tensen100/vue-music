import axios from 'axios'

export const getRecommend = async () => {
    const res = await axios.get('/api/getRecommend');
    return res.data;
};
export const  getDiscList = async () => {
    const res = await axios.get('/api/getDiscList');
    return res.data;
};
export const getSongList = async (disstid)=> {
    const res = await axios.get('/api/getSongList/'+disstid);
    return res.data;
};