import { motion, AnimateSharedLayout } from 'framer-motion';
import VoteDetailsCard from '@/components/vote/vote-details/vote-details-card';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
// import FunctionReadRow from './function-read-row';
// import useContractTransaction, {
//   TransactionType,
// } from '../../lib/hooks/blockchain/use-contract-transaction';
import { useCallback, useEffect } from 'react';
import { FunctionReadRow } from './function-read-row';
import { useContractRead } from 'wagmi';
// import useDidMountEffect from '../../lib/hooks/use-did-mount-effect';

type FunctionReadListProps = {
  contract: any;
  readFunctions: any;
};

const FunctionReadList = ({
  contract,
  readFunctions,
}: FunctionReadListProps) => {
  return (
    <motion.div layout initial={{ borderRadius: 16 }} className="rounded-2xl">
      {readFunctions.length > 0 ? (
        readFunctions.map((property: any, i: number) => (
          <FunctionReadRow key={i} contract={contract} property={property} />
        ))
      ) : (
        <div></div>
      )}
    </motion.div>
  );
};

export default FunctionReadList;
