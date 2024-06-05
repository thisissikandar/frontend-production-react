import { forwardRef, useId } from "react";

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          className={`px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
