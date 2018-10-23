import axios from 'axios'

export const getHotKey = async () => {
    const res = await axios.get('/api/getHotKey');
    return res.data;
};

export const search = async (query, page, zhida, perpage) => {
    const params ={query, page, zhida, perpage};
    const res = await axios.get('/api/search',{params});
    return res.data;
};