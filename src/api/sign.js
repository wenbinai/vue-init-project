import myAxios from '@/plugins/axios/myAxios'

/**
 * 活动签到模块
 * @param nid
 * @param code
 */
export const sign = (nid, code) => {
  let resp = myAxios({
    method: 'GET',
    url: `myAxios.defaults.baseURL + 'sign/${nid}+${code}'`,
  })

  console.log(resp)
}
