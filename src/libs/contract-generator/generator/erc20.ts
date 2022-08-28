import type { ERC20Options } from '../sources/erc20';
import { accessOptions } from '../sources/set-access-control';
import { infoOptions } from '../sources/set-info';
import { upgradeableOptions } from '../sources/set-upgradeable';
import { generateAlternatives } from '../sources/alternatives';

const booleans = [true, false];

const blueprint = {
  name: ['MyToken'],
  symbol: ['MTK'],
  burnable: booleans,
  snapshots: booleans,
  pausable: booleans,
  mintable: booleans,
  permit: booleans,
  votes: booleans,
  flashmint: booleans,
  premint: ['1'],
  access: accessOptions,
  upgradeable: upgradeableOptions,
  info: infoOptions,
};

export function* generateERC20Options(): Generator<Required<ERC20Options>> {
  yield* generateAlternatives(blueprint);
}
