import { motion } from 'framer-motion';
import FunctionWriteRow from './function-write-row';

type FunctionWriteistProps = {
  contract: any;
  functions: any;
};

const FunctionWriteList = ({ contract, functions }: FunctionWriteistProps) => {
  return (
    <motion.div layout initial={{ borderRadius: 16 }} className="rounded-2xl">
      {functions.length > 0 ? (
        functions.map((property: any, i: number) => (
          <FunctionWriteRow key={i} contract={contract} property={property} />
        ))
      ) : (
        <div></div>
      )}
    </motion.div>
  );
};

export default FunctionWriteList;
