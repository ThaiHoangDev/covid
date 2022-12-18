import axiosClient from './axiosClient';
export const getSumaryApi = async () => {
  return await axiosClient.get('/summary');
};
export const getDetailApi = async (code) => {
  return await axiosClient.get(`https://restcountries.com/v3.1/alpha/${code}`);
};
