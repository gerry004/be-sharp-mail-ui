const ExcelDisplay = ({ 
  data, 
  appendToHtml, 
  setRecipientEmail, 
  selectedKey, 
  setSelectedKey 
}) => {

  if (!data || Object.keys(data).length === 0) {
    return;
  }

  return (
    <div className="flex my-2 mb-2">
      <div className="mr-2">
        <label className="block text-sm font-medium text-gray-600">Choose Sheet:</label>
        <select
          className="border border-gray-300 rounded p-2"
          onChange={(e) => setSelectedKey(e.target.value)}
        >
          <option value="">Select...</option>
          {Object.keys(data).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      
      {selectedKey && data[selectedKey] && data[selectedKey].length > 0 && (
      <div>
        <label className="block text-sm font-medium text-gray-600">Recipient Email:</label>
        <select
          className="border border-gray-300 rounded p-2"
          onChange={(e) => setRecipientEmail(e.target.value)}
        >
          <option value="">Select...</option>
          {data[selectedKey].map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      )}

      {selectedKey && data[selectedKey] && data[selectedKey].length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-600 ml-2">Headers:</label>
          <div className="flex flex-wrap">
            {data[selectedKey].map((value, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white rounded p-2 mx-2 mb-2"
                onClick={() => appendToHtml(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelDisplay;