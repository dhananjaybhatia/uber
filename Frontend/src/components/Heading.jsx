/* eslint-disable react/prop-types */
export default function Heading({ label, className }) {
    return <div className={`font-bold text-4xl ${className}`}>{label}</div>;
  }