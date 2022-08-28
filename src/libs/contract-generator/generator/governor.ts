import {
  defaults,
  GovernorOptions,
  timelockOptions,
  votesOptions,
} from '../sources/governor';
import { accessOptions } from '../sources/set-access-control';
import { infoOptions } from '../sources/set-info';
import { upgradeableOptions } from '../sources/set-upgradeable';
import { generateAlternatives } from '../sources/alternatives';

const booleans = [true, false];

const blueprint = {
  name: ['MyGovernor'],
  delay: ['1 week'],
  period: ['1 week'],
  blockTime: [defaults.blockTime],
  proposalThreshold: ['0', '1000'],
  decimals: [18],
  quorumMode: ['percent', 'absolute'] as const,
  quorumPercent: [4],
  quorumAbsolute: ['1000'],
  votes: votesOptions,
  timelock: timelockOptions,
  bravo: booleans,
  settings: booleans,
  upgradeable: upgradeableOptions,
  access: accessOptions,
  info: infoOptions,
};

export function* generateGovernorOptions(): Generator<
  Required<GovernorOptions>
> {
  yield* generateAlternatives(blueprint);
}
