import myAxios from '@/plugins/axios/myAxios'

export const updateUserInfo = (userInfo) => myAxios(
  {
    method: 'PATCH',
    url: 'communist/updateinfo',
    data: {
      name: userInfo.name,
      degree: userInfo.educationDegree,
      date: userInfo.joinPartyTime,
      state: userInfo.state,
      address: userInfo.workPlace,
      idCard: userInfo.idCard,
      sex: userInfo.sex,
      company: userInfo.company,
      no: userInfo.nio
    }
  }
)
