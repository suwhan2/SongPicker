import axiosInstance from './axiosInstance';

export const getSingingDay = (currentYear: number) => {
  return axiosInstance({
    method: 'GET',
    url: '/api/histories/date',
    params: {
      year: currentYear,
    },
  })
    .then(res => {
      console.log(res.data.data);
      return res.data.data.singAt;
    })
    .catch(err => {
      console.log(err);
    });
};
