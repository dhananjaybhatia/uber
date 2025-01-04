/* eslint-disable react/prop-types */
export default function InputBox({
  label,
  placeholder,
  onChange,
  value,
  type = "text",
  className,
  options = [], // For dropdown options
}) {
  return (
    <div className="w-full">
      <div className="font-medium text-left mt-4">{label}</div>
      {type === "select" ? (
        // Dropdown Logic
        <select
          className={`w-full p-2 mt-2 border-2 border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
          onChange={onChange}
          value={value}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      ) : (
        // Regular Input Logic
        <input
          className={`w-full p-2 mt-2 border-2 border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}
