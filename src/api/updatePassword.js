import myAxios from '@/plugins/axios/myAxios'

export const updatePassword = (tel, password, secret, code) => {
  return myAxios({
    method: 'GET',
    url: `communist/updatepassword/${tel}/${password}/${secret}/${code}`
  })
}
