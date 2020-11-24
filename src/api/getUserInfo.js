import myAxios from '@/plugins/axios/myAxios'

export const getUserInfo = () => {
  return myAxios({
    method: 'GET',
    url: 'communist/getCommunist'
  })
}
