export const abiParser = (abi: any) => {
  const output: any = {
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
