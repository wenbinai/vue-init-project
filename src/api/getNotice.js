import myAxios from '@/plugins/axios/myAxios'

export const getNotice = () => {
  return myAxios({
    method: 'GET',
    url: 'communist/getNotice'
  })
}

// /**
//  * 签到Api
//  * @param nid
//  * @param code
//  * @returns {AxiosPromise}
//  */
// export const signApi = (nid, code) => {
//   return myAxios({
//     method: 'GET',
//     url: `communist/sign/${nid}/${code}`
//   })
// }
