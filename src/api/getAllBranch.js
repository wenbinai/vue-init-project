import myAxios from "@/plugins/axios/myAxios";

export const getAllBranchsApi = () => {
  return myAxios({
    method: 'GET',
    url: 'ajax/getCommitteeBranchCommunist'
  })
}
