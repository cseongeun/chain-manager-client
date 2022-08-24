import cn from 'classnames';

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
          {/* <ClipboardCopy target={value?.toString() as string} /> */}
        </div>
      ) : (
        <span>{value ? value : '_ _'}</span>
      )}
    </div>
  );
}
