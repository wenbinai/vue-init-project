import myAxios from '@/plugins/axios/myAxios'

export const sendSms = (nid, code) => {
  return myAxios({
    method: 'GET',
    url: `communist/sign/${nid}/${code}`
  })
}
