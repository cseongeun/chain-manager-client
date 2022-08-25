import cn from 'classnames';

type FunctionCallResultProps = {
  label: string;
  value?: string | number;
  className?: string;
};

const FunctionCallResult = ({
  label,
  value,
  className,
}: FunctionCallResultProps) => {
  return (
    <div className={cn('flex items-center dark:text-gray-300', className)}>
      <span className="font-medium text-gray-600">{label}</span>
      <span className="ml-10 text-blue-700">{value ? value : '_ _'}</span>
    </div>
  );
};

export default FunctionCallResult;
