import React from 'react';

const TextInput = ({ label = "Text", placeholder = "", value, onTextInputChange }) => {
  return (
    <div className="my-2">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onTextInputChange}
        className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default TextInput;