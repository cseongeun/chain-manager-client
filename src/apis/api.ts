import apiInstance from './apiInstance'
import {
  IPostProjectParams,
  IPostProjectResponse,
  IGetProjectsResponse,
  IProject,
  IGetProjectParams,
  IGetProjectFundingsResponse,
  IGovernance,
  IFunding,
  IGetTokenParams,
  IToken,
  IPostToken,
  IPatchProjectParams,
  IPostVoteParams,
  IPostVoteResponse,
  IPostProposalParams,
  IGetProposalParams,
  IGetProposalsResponse,
  IProposalDetail,
  IGetVoteParams,
  IGetVoteResponse,
  IProjectLink,
  ICreateProjectLinkParams,
  ICreateProjectFundingHistoryParams,
  ICreateProjectFundingParams,
} from './apiType'

/**************************
 * Project
 *************************/
export async function getProjectApi({
  id,
  offset,
  categoryId,
  stateId,
  search,
  ordering,
  network,
  user,
}: IGetProjectParams) {
  let query = `/api/project?network=${network}&offset=${offset}&category=${categoryId ?? ''}&status=${
    stateId ?? ''
  }&search=${search ?? ''}&ordering=${ordering ?? ''}`

  if (user) {
    query += `&user=${user}`
  }

  if (id) {
    query += `$id=${id}`
  }

  const response = await apiInstance().get<IGetProjectsResponse>(query)

  return response.data
}

export async function getProjectDetailApi(id: string) {
  const response = await apiInstance().get<IProject>(`/api/project/${id}`)
  return response.data
}

export async function postCreateProjectApi(params: IPostProjectParams) {
  const response = await apiInstance('multipart/form-data').post<IPostProjectResponse>(`/api/project/create`, params)
  return response.data
}

export async function patchProjectApi(params: IPatchProjectParams) {
  const response = await apiInstance().patch<IPostProjectResponse>(`/api/project/${params.id}`, params)

  return response.data
}

/**************************
 * Project-Link
 *************************/
export async function getProjectLinkApi(id: string) {
  const response = await apiInstance().get<IProjectLink[]>(`/api/project/${id}/link`)
  return response.data
}

export async function createProjectLinkApi(params: ICreateProjectLinkParams) {
  const response = await apiInstance().post<IProjectLink[]>(`/api/project/${params.project}/link/create`, params)
  return response.data
}

export async function patchProjectLinkApi(params: IProjectLink) {
  const response = await apiInstance().patch<IProjectLink[]>(`/api/project/${params.project}/link/${params.id}`, params)
  return response.data
}

/**************************
 * Token
 *************************/
export async function getTokenApi({ important, network, address, symbol, search }: IGetTokenParams) {
  let query = `/api/token?network=${network}`

  if (important) {
    query += `&important=${important}`
  }

  if (address) {
    query += `&address=${address}`
  }

  if (symbol) {
    query += `&symbol=${symbol}`
  }

  if (search) {
    query += `&search=${search}`
  }

  const response = await apiInstance().get<IToken[]>(query)

  return response.data
}

export async function postCreateTokenApi(params: IPostToken) {
  const response = await apiInstance().post<IPostToken>(`/api/token`, params)

  return response.data
}

/**************************
 * Project-Funding
 *************************/
export async function createProjectFunding(id: string, params: ICreateProjectFundingParams) {
  const response = await apiInstance().post<IFunding>(`api/project/${id}/funding`, params)
  return response.data
}

export async function getProjectCurrentFundingDetailApi(id: string) {
  const response = await apiInstance().get<IFunding>(`/api/current_funding?project_id=${id}`)
  return response.data
}

export async function getProjectFundingsDetailApi(id: string) {
  const response = await apiInstance().get<IGetProjectFundingsResponse>(`/api/project/${id}/funding`)
  return response.data
}

export async function createProjectFundingHistoryApi(
  id: string,
  fundingId: string,
  params: ICreateProjectFundingHistoryParams,
) {
  const response = await apiInstance().post<IProjectLink[]>(`/api/project/${id}/funding/${fundingId}`, params)
  return response.data
}

/**************************
 * Project-Governance
 *************************/
export async function getProjectGovernanceDetailApi(id: string) {
  const response = await apiInstance().get<IGovernance>(`/api/governance/${id}`)
  return response.data
}

/**************************
 * Project-Proposal
 *************************/
export async function getProjectProposalApi({ id, offset, ordering, search }: IGetProposalParams) {
  const response = await apiInstance().get<IGetProposalsResponse>(
    `/api/project/${id}/proposal?&offset=${offset}&ordering=${ordering}&search=${search ?? ''}`,
  )
  return response.data
}

export async function getProjectProposalDetailApi(id: string, proposalId: string) {
  const response = await apiInstance().get<IProposalDetail>(`/api/project/${id}/proposal/${proposalId}`)
  return response.data
}

export async function postCreateProjectProposalApi(id: string, params: IPostProposalParams) {
  const response = await apiInstance().post<IPostProposalParams>(`/api/project/${id}/proposal/create`, params)
  return response.data
}

/**************************
 * Project-Vote
 *************************/
export async function postCreateVoteApi(params: IPostVoteParams) {
  const response = await apiInstance().post<IPostVoteResponse>(
    `/api/project/${params.project}/proposal/${params.proposal}/vote`,
    params,
  )
  return response.data
}

export async function getProjectProposalVoteApi({ id, proposalId, offset }: IGetVoteParams) {
  const response = await apiInstance().get<IGetVoteResponse>(
    `/api/project/${id}/proposal/${proposalId}/vote?offset=${offset}`,
  )

  return response.data
}

/**************************
 * User-Funding-Project
 *************************/
export async function getUserParticipatedProjectApi({ user }: { user: string }) {
  const response = await apiInstance().get<IGetProjectsResponse>(`/api/project/participated?user=${user}`)
  return response.data
}
