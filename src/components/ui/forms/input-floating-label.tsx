import { forwardRef } from 'react';
import cn from 'classnames';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  // error?: string;
  className?: string;
  inputClassName?: string;
  useUppercaseLabel?: boolean;
};

const InputFloatingLabel = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      // error,
      type = 'text',
      className,
      inputClassName,
      useUppercaseLabel = true,
      ...props
    },
    ref
  ) => (
    <div className={cn('relative z-0', className)}>
      <input
        placeholder=" "
        type={type}
        ref={ref}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
        {...props}
      />
      <label
        htmlFor={label}
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
      >
        {label}
      </label>
    </div>
  )
);

InputFloatingLabel.displayName = 'InputFloatingLabel';
export default InputFloatingLabel;
