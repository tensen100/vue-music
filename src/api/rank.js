import axios from 'axios'

export const getTopList = async () => {
    const res = await axios.get('/api/getTopList');
    return res.data;
};

export const getMusicList = async (topid) => {
    const res = await axios.get('/api/getMusicList/'+topid);
    return res.data;
};