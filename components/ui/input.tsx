import * as React from "react";
import { cn } from "@/app/lib/utils";

// Disable ESLint rule for the empty interface
/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
/* eslint-enable @typescript-eslint/no-empty-object-type */

/**
 * Input component that extends HTML input attributes with custom styling.
 * 
 * @param {InputProps} props - Props for the input element.
 * @returns {JSX.Element} The rendered input element.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
