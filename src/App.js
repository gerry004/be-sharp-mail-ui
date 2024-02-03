import React, { useState } from 'react';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import FileInput from './components/FileInput';
import ExcelDisplay from './components/ExcelDisplay';

import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000,
});

function App() {
  const [file, setFile] = useState(null);
  const [editorHtml, setEditorHtml] = useState('');
  const [excelData, setExcelData] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await api.post('/excel', formData);
      setExcelData(response.data);
    }
    catch (error) {
      console.error('Error getting excel:', error.message);
    }
    setFile(selectedFile);
  };

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  }

  // this feature is buggy and needs to be fixed
  const insertVariableToHtml = (variable) => {
    const newHtml = editorHtml + `{{${variable}}}`;
    setEditorHtml(newHtml);
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <FileInput onFileChange={handleFileChange} />
        <ExcelDisplay data={excelData} appendToHtml={insertVariableToHtml} />
        <Editor editorHtml={editorHtml} onEditorChange={handleEditorChange} />
        {file && <p>{file.name}</p>}
        <p>{editorHtml}</p>
      </div>
    </div>
  );
}

export default App;
