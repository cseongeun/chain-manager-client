export interface IABIArgu {
  components?: IABIArgu[];
  internalType?: string;
  name: string;
  type: string;
}

export interface IABISpec {
  name: string;
  inputs: IABIArgu[];
  outputs: IABIArgu[];
  type: string;
  stateMutability: string;
}

export const abiParser = (
  abi: any
): { read: IABISpec[]; write: IABISpec[] } => {
  const output: { read: IABISpec[]; write: IABISpec[] } = {
    read: [],
    write: [],
  };

  Object.values(abi).map((a: any) => {
    const { name, inputs, outputs, stateMutability, type } = a;

    if (type === 'function') {
      if (stateMutability === 'view') {
        output.read.push({
          name,
          inputs,
          outputs,
          type: 'view',
          stateMutability,
        });
      } else {
        output.write.push({
          name,
          inputs,
          outputs,
          type: 'write',
          stateMutability,
        });
      }
    }
  });
  return output;
};
