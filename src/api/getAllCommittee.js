import myAxios from '@/plugins/axios/myAxios'

export const getAllCommitteeApi = () => {
  return myAxios({
    method: 'GET',
    url: 'ajax/getAllCommittee'
  })
}
