import axios from 'axios'
export const getLyric = async (mid) => {
    const res = await axios.get('/api/getLyric/'+mid);
    return res.data;
};