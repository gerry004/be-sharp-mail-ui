import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

function Editor ({onEditorChange}) {
  const [editorHtml, setEditorHtml] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'link',
    'list', 'bullet',
  ];

  const handleChange = (html) => {
    setEditorHtml(html);
    onEditorChange(html);
  }

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={editorHtml}
        onChange={handleChange}
      />
    </div>
  )
}

export default Editor;