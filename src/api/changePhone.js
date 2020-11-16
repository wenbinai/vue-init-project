import myAxios from '@/plugins/axios/myAxios'

export const updatePhone = (tel, secret, code) => {
  myAxios({
    method: 'GET',
    url: `communist/updateTel/${tel}/${secret}/${code}`
  })
}
