import type { ERC1155Options } from '../sources/erc1155';
import { accessOptions } from '../sources/set-access-control';
import { infoOptions } from '../sources/set-info';
import { upgradeableOptions } from '../sources/set-upgradeable';
import { generateAlternatives } from '../sources/alternatives';

const booleans = [true, false];

const blueprint = {
  name: ['MyToken'],
  uri: ['https://example.com/'],
  burnable: booleans,
  pausable: booleans,
  mintable: booleans,
  supply: booleans,
  updatableUri: booleans,
  access: accessOptions,
  upgradeable: upgradeableOptions,
  info: infoOptions,
};

export function* generateERC1155Options(): Generator<Required<ERC1155Options>> {
  yield* generateAlternatives(blueprint);
}
