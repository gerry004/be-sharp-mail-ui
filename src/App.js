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
  const [selectedKey, setSelectedKey] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState(null);

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

  const insertVariableToHtml = (variable) => {
    setEditorHtml((prevHtml) => prevHtml + `{{${variable}}}`);
  }

  const handleSendEmail = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('recipientEmail', recipientEmail);
      formData.append('message', editorHtml);
      formData.append('selectedSheet', selectedKey);
      api.post('/email', formData)
      .then(response => console.log("Email Successfully Sent"))
      .catch(error => console.error('Error sending email:', error.message));
    }
    catch (error) {
      console.error('Error sending email:', error.message);
    }
  }

  const handleTestEmail = () => {
    console.log('Test Email');
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <FileInput onFileChange={handleFileChange} />
        <ExcelDisplay 
          data={excelData} 
          appendToHtml={insertVariableToHtml} 
          setRecipientEmail={setRecipientEmail}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey} 
        />
        <Editor editorHtml={editorHtml} onEditorChange={handleEditorChange} />
        <button className="p-2 border-2 border-black rounded-md hover:bg-slate-500 hover:text-white" onClick={handleTestEmail}>Test Email</button>
        <button className="p-2 border-2 border-black rounded-md hover:bg-slate-500 hover:text-white" onClick={handleSendEmail}>Send Email</button>
      </div>
    </div>
  );
}

export default App;
