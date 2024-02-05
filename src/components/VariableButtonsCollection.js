function VariableButtonsCollection({ label="Variables", variables, onClick }) {
  return (
    <div className="my-2">
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <div className="flex flex-wrap">
      {variables.map((value, index) => (
        <button
          key={index}
          className="bg-blue-500 text-white rounded p-2 mr-2 mb-2"
          onClick={() => onClick(value)}
        >
          {value}
        </button>
      ))}
    </div>
  </div>
  );
}

export default VariableButtonsCollection;