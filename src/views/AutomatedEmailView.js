import React, { useEffect, useState } from 'react';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';
import FileInput from '../components/FileInput';
import SelectInput from '../components/SelectInput';
import VariableButtonsCollection from '../components/VariableButtonsCollection';
import TextInput from '../components/TextInput';
import api from '../api';

function AutomatedEmailView() {
  const [file, setFile] = useState(null);
  const [excelHeadersBySheetObject, setExcelHeadersBySheetObject] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [recipientEmailHeader, setRecipientEmailHeader] = useState(null);
  const [editorHtml, setEditorHtml] = useState('');
  const [subject, setSubject] = useState('');
  const [testRecipientEmail, setTestRecipientEmail] = useState('');
  const [previewEmail, setPreviewEmail] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  const processFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    api.post('/excel', formData)
      .then(response => {
        setExcelHeadersBySheetObject(response.data);
      })
      .catch(error => {
        console.error('Error processing file:', error);
      });
  }

  useEffect(() => {
    if (!file) {
      console.error('No file selected');
    } else {
      processFile();
    }
  }, [file]);

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  }

  const handleSubjectInputChange = (e) => {
    setSubject(e.target.value);
  }

  const handleTestRecipientEmailInputChange = (e) => {
    setTestRecipientEmail(e.target.value);
  }

  const appendVariableToHtml = (variable) => {
    setEditorHtml((prevHtml) => prevHtml + `{{${variable}}}`);
  }

  const handleSendEmails = (type = "preview") => {
    if (!file) return alert('Please select a file.');
    if (!selectedSheet) return alert('Please select a sheet.');
    if (!recipientEmailHeader) return alert('Please select a recipient email header.');
    if (!subject) return alert('Please enter a subject.');
    if (!editorHtml) return alert('Please enter a message.');
    if (type === "test" && !testRecipientEmail) return alert('Please enter a test recipient email.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('selectedSheet', selectedSheet);
    formData.append('recipientEmailExcelColumn', recipientEmailHeader);
    formData.append('subject', subject);
    formData.append('messageHtml', editorHtml);
    formData.append('type', type);
    formData.append('testRecipientEmail', testRecipientEmail);
    api.post('/email', formData)
      .then(response => {
        if (type === "preview") {
          setPreviewEmail(response.data);
        }
      })
      .catch(error => console.error('Error sending email:', error.message));
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <FileInput label="Choose Excel File (.xlsx)" accept=".xlsx" updateFile={handleFileChange} />

        {file && excelHeadersBySheetObject && Object.keys(excelHeadersBySheetObject).length > 0 && (
          <SelectInput
            label="Choose Sheet:"
            options={Object.keys(excelHeadersBySheetObject)}
            updateSelectValue={setSelectedSheet}
          />
        )}

        {selectedSheet && excelHeadersBySheetObject[selectedSheet] && excelHeadersBySheetObject[selectedSheet].length > 0 && (
          <div className="flex">
            <SelectInput
              label="Recipient Email Excel Column:"
              options={excelHeadersBySheetObject[selectedSheet]}
              updateSelectValue={setRecipientEmailHeader}
            />
            <TextInput
              label="Test Recipient Email:"
              placeholder="Test Recipient Email"
              value={testRecipientEmail}
              onTextInputChange={handleTestRecipientEmailInputChange}
            />
          </div>
        )}

        <TextInput
          label="Subject:"
          placeholder="Email Subject"
          value={subject}
          onTextInputChange={handleSubjectInputChange}
        />
        {selectedSheet && excelHeadersBySheetObject[selectedSheet] && excelHeadersBySheetObject[selectedSheet].length > 0 && (
          <VariableButtonsCollection
            label="Excel Header Variables:"
            variables={excelHeadersBySheetObject[selectedSheet]}
            onClick={appendVariableToHtml}
          />
        )}

        <label className="block text-sm font-medium text-gray-600">Message:</label>
        <Editor editorHtml={editorHtml} onEditorChange={handleEditorChange} />
        <button className="bg-blue-500 text-white rounded p-2 mr-2" onClick={() => handleSendEmails("preview")}>Preview Email</button>
        <button className="bg-blue-500 text-white rounded p-2 mr-2" onClick={() => handleSendEmails("test")}>Send Test Email</button>
        <button className="bg-blue-500 text-white rounded p-2" onClick={() => handleSendEmails("live")}>Send Emails</button>
        {previewEmail && (
          <div className="bg-gray-100 p-4 rounded-md shadow-md my-4">
            <h2 className="text-2xl font-bold mb-4">Preview Email:</h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-bold pr-2">Selected Sheet:</td>
                  <td className="text-gray-700">{previewEmail.selectedSheet}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Email Recipient Column:</td>
                  <td className="text-gray-700">{previewEmail.recipientEmailExcelColumn}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Subject:</td>
                  <td className="text-gray-700">{previewEmail.subject}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-2">Message HTML:</td>
                  <td className="text-gray-700">{previewEmail.updatedMessageHtml}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AutomatedEmailView;
