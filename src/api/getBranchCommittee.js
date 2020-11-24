import myAxios from '@/plugins/axios/myAxios'

/**
 * 获取所有党委 接口
 * @returns {AxiosPromise}
 */
export const getAllCommitteeApi = () => myAxios({
  method: 'GET',
  url: 'gov/getAllCommittee',
})
