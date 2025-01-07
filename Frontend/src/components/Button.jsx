/* eslint-disable react/prop-types */
export default function Button({ label, onClick, className, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-700 text-white rounded-md mt-6 p-2 text-lg font-medium hover:bg-blue-800 focus:outline-none  shadow-md w-full ${className}`}
    >
      {label}
    </button>
  );
}
