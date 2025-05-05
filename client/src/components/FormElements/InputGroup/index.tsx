import { cn } from "lib/utils";
import { type HTMLInputTypeAttribute, useId } from "react";

type InputGroupProps = {
  className?: string;
  label: string;
  placeholder: string;
  type: string;
  disabled?: boolean;
  active?: boolean;
  value?: string;
  name?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  height?: "sm" | "default";
  defaultValue?: string;
};

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  label,
  placeholder,
  disabled,
  active,
  icon,
  ...props
}) => {
  const id = useId();

  const displayedValue = props.value || props.defaultValue || placeholder || "-";

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
          "relative mt-3 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
          props.iconPosition === "left"
            ? "[&_svg]:left-4.5"
            : "[&_svg]:right-4.5",
        )}
      >
        <div
          id={id}
          className={cn(
            "w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition dark:border-dark-3 dark:bg-dark-2 px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white",
            props.iconPosition === "left" && "pl-12.5",
            props.height === "sm" && "py-2.5",
            disabled && "bg-gray-2 dark:bg-dark",
            active && "border-primary dark:border-primary"
          )}
        >
          {displayedValue}
        </div>

        {icon}
      </div>
    </div>
  );
};


export default InputGroup;

