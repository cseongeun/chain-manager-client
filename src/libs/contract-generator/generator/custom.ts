import type { CustomOptions } from '../sources/custom';
import { accessOptions } from '../sources/set-access-control';
import { infoOptions } from '../sources/set-info';
import { upgradeableOptions } from '../sources/set-upgradeable';
import { generateAlternatives } from '../sources/alternatives';

const booleans = [true, false];

const blueprint = {
  name: ['MyContract'],
  pausable: booleans,
  access: accessOptions,
  upgradeable: upgradeableOptions,
  info: infoOptions,
};

export function* generateCustomOptions(): Generator<Required<CustomOptions>> {
  yield* generateAlternatives(blueprint);
}
