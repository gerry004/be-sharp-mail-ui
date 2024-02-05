function FileInput({ label="Choose File:", accept="", updateFile }) {
  return (
    <div className="my-2">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type="file"
        onChange={updateFile}
        accept={accept}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  )
}

export default FileInput;