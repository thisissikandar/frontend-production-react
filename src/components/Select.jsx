/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { forwardRef, useId } from "react";

function Select({ options, label, className = "selection:", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className={`${className}`} htmlFor={id}>
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((items) => (
          <option key={items} value={items}>{items}</option>
        ))}
      </select>
    </div>
  );
}
export default forwardRef(Select);
