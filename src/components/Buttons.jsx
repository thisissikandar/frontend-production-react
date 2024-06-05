/* eslint-disable react/prop-types */

const Buttons = ({
  children,
  // eslint-disable-next-line no-unused-vars
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default Buttons;
