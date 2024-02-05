function SelectInput({ label="Select", options=[], updateSelectValue }) {
  return (
    <div className="my-2">
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <select
      className="border border-gray-300 rounded p-2"
      onChange={(e) => updateSelectValue(e.target.value)}
    >
      <option value="">Select...</option>
      {options.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
  )
}

export default SelectInput;