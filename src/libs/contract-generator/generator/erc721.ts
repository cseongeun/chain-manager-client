import type { ERC721Options } from '../sources/erc721';
import { accessOptions } from '../sources/set-access-control';
import { infoOptions } from '../sources/set-info';
import { upgradeableOptions } from '../sources/set-upgradeable';
import { generateAlternatives } from '../sources/alternatives';

const booleans = [true, false];

const blueprint = {
  name: ['MyToken'],
  symbol: ['MTK'],
  baseUri: ['https://example.com/'],
  enumerable: booleans,
  uriStorage: booleans,
  burnable: booleans,
  pausable: booleans,
  mintable: booleans,
  incremental: booleans,
  access: accessOptions,
  upgradeable: upgradeableOptions,
  info: infoOptions,
  votes: booleans,
};

export function* generateERC721Options(): Generator<Required<ERC721Options>> {
  yield* generateAlternatives(blueprint);
}
