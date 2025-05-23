import { cn } from "lib/utils";
import { type HTMLInputTypeAttribute, useId } from "react";

type InputGroupProps = {
  className?: string;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  disabled?: boolean;
  active?: boolean;
  value?: string;
  name?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  height?: "sm" | "default";
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  label,
  placeholder,
  disabled,
  active,
  icon,
  onChange,
  ...props
}) => {
  const id = useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
      </label>

      <div
        className={cn(
          "relative mt-1 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
          props.iconPosition === "left" ? "[&_svg]:left-4.5" : "[&_svg]:right-4.5"
        )}
      >
        <input
          id={id}
          type={props.type}
          name={props.name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          {...(props.value !== undefined ? { value: props.value } : {})}
          {...(props.value === undefined && props.defaultValue !== undefined
            ? { defaultValue: props.defaultValue }
            : {})}
          readOnly={props.value !== undefined && !onChange}
          className={cn(
            "w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition dark:border-dark-3 dark:bg-dark-2 px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white",
            props.iconPosition === "left" && "pl-12.5",
            props.height === "sm" && "py-2.5",
            disabled && "bg-gray-2 dark:bg-dark",
            active && "border-primary dark:border-primary"
          )}
        />
        {icon}
      </div>
    </div>
  );
};

export default InputGroup;
