const routes = {
  home: '/',

  sign_in: '/auth/signin',
  sign_up: '/auth/signup',

  contract_execution: '/contract/execution',
  contract_execution_create: '/contract/execution/create',
  contract_execution_edit: '/contract/execution/edit/[id]',
  contract_execution_detail: '/contract/execution/[id]',
  contract_execution_detail_read_view: '/contract/execution/[id]?view=read',
  contract_execution_detail_write_view: '/contract/execution/id?view=write',

  multi_transfer: '/tool/multi_transfer',
  multi_transfer_create: '/tool/multi_transfer/create',
  multi_transfer_detail: '/tool/multi_transfer/[id]',

  token_manager: '/token_manager',

  swap: '/swap',
  liquidity: '/liquidity',
  liquidityPosition: '/liquidity-position',
  farms: '/farms',
  farmsTwo: '/farms-2',
  createNft: '/create-nft',
  nftDetails: '/nft-details',
  search: '/search',
  notification: '/notification',
  vote: '/vote',
  proposals: '/proposals',
  createProposal: '/proposals/create',
  charts: '/charts',
  profile: '/profile',
  portfolio: '/profile?view=portfolio',
  history: '/profile?view=history',
};

export default routes;
