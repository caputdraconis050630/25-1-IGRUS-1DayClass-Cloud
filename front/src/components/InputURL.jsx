import React from 'react';

function InputURL({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter URL"
      style={{
        minWidth: "50vw",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.3s",
      }}
      onFocus={(e) => e.target.style.borderColor = "#007BFF"}
      onBlur={(e) => e.target.style.borderColor = "#ccc"}
    />
  );
}

export default InputURL;