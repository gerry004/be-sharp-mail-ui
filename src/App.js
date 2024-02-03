import React, { useState } from 'react';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import FileInput from './components/FileInput';

function App() {
  const [file, setFile] = useState(null);
  const [editorHtml, setEditorHtml] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    console.log(file)
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <FileInput onFileChange={handleFileChange} />
        <Editor onEditorChange={handleEditorChange} />
        {file && <p>{file.name}</p>}
        <p>{editorHtml}</p>
      </div>
    </div>
  );
}


export default App;
