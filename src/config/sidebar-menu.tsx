import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';

export default [
  // {
  //   name: 'Home',
  //   icon: <HomeIcon />,
  //   href: routes.home,
  // },
  // {
  //   name: 'Farm',
  //   icon: <FarmIcon />,
  //   href: routes.farms,
  // },
  // {
  //   name: 'Swap',
  //   icon: <ExchangeIcon />,
  //   href: routes.swap,
  // },
  // {
  //   name: 'Liquidity',
  //   icon: <PoolIcon />,
  //   href: routes.liquidity,
  // },
  // {
  //   name: 'Explore NFTs',
  //   icon: <CompassIcon />,
  //   href: routes.search,
  // },
  // {
  //   name: 'Create NFT',
  //   icon: <PlusCircle />,
  //   href: routes.createNft,
  // },
  // {
  //   name: 'NFT Details',
  //   icon: <DiskIcon />,
  //   href: routes.nftDetails,
  // },
  // {
  //   name: 'Profile',
  //   icon: <ProfileIcon />,
  //   href: routes.profile,
  // },
  // {
  //   name: 'Vote',
  //   icon: <VoteIcon />,
  //   href: '/vote',
  //   dropdownItems: [
  //     {
  //       name: 'Explore',
  //       href: routes.vote,
  //     },
  //     {
  //       name: 'Vote with pools',
  //       href: routes.proposals,
  //     },
  //     {
  //       name: 'Create proposal',
  //       href: routes.createProposal,
  //     },
  //   ],
  // },
  {
    name: 'Contract',
    icon: <VoteIcon />,
    href: '/contract',
    dropdownItems: [
      {
        name: 'Execution',
        href: routes.contract_execution,
      },
      // {
      //   name: 'Vote with pools',
      //   href: routes.proposals,
      // },
      // {
      //   name: 'Create proposal',
      //   href: routes.createProposal,
      // },
    ],
  },
  // {
  //   name: 'Tool',
  //   icon: <VoteIcon />,
  //   href: '/contract',
  //   dropdownItems: [
  //     {
  //       name: 'Multi Transfer',
  //       href: routes.multi_transfer,
  //     },
  //     // {
  //     //   name: 'Vote with pools',
  //     //   href: routes.proposals,
  //     // },
  //     // {
  //     //   name: 'Create proposal',
  //     //   href: routes.createProposal,
  //     // },
  //   ],
  // },
  // {
  //   name: 'Token Manager',
  //   icon: <PlusCircle />,
  //   href: routes.token_manager,
  // },
  // {
  //   name: 'Token Manager',
  //   icon: <VoteIcon />,
  //   href: '/token_manager',
  //   dropdownItems: [
  //     {
  //       name: 'Multi ',
  //       href: routes.multi_transfer,
  //     },
  //     // {
  //     //   name: 'Vote with pools',
  //     //   href: routes.proposals,
  //     // },
  //     // {
  //     //   name: 'Create proposal',
  //     //   href: routes.createProposal,
  //     // },
  //   ],
  // },
];
