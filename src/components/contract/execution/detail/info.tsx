import cn from 'classnames';
import { useCallback, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Check } from '../../../icons/check';
import { Copy } from '../../../icons/copy';

interface InfoProps {
  label: string;
  value?: string | number;
  withClipboard?: boolean;
  className?: string;
}

export default function Info({
  label,
  value,
  withClipboard,
  className,
}: InfoProps) {
  const [_, copyToClipboard] = useCopyToClipboard();

  let [copyButtonStatus, setCopyButtonStatus] = useState(false);

  const handleCopyToClipboard = useCallback(
    (target: string | number) => {
      copyToClipboard(target.toString());
      setCopyButtonStatus(true);
      setTimeout(() => {
        setCopyButtonStatus(copyButtonStatus);
      }, 2500);
    },
    [copyButtonStatus, copyToClipboard]
  );
  return (
    <div
      className={cn(
        'items-enter flex justify-between dark:text-gray-300',
        className
      )}
    >
      <span className="font-medium">{label}</span>
      {withClipboard ? (
        <div className="flex">
          <span className="mr-2">{value ? value : '_ _'}</span>
          <div
            className="flex cursor-pointer items-center  text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            onClick={() => handleCopyToClipboard(value)}
          >
            {copyButtonStatus ? (
              <Check className="h-auto w-3.5 text-green-500" />
            ) : (
              <Copy className="h-auto w-3.5" />
            )}{' '}
          </div>{' '}
        </div>
      ) : (
        <span>{value ? value : '_ _'}</span>
      )}
    </div>
  );
}
