function FileInput({ onFileChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">Choose Excel File (.xlsx):</label>
      <input
        type="file"
        onChange={onFileChange}
        accept=".xlsx"
        className="mt-1 p-2 border border-gray-300 rounded-md"
      />
    </div>
  )
}

export default FileInput;