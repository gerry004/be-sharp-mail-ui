import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ editorHtml, onEditorChange }) {
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

  return (
    <div className="my-2">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={editorHtml}
        onChange={(content) => onEditorChange(content)}
      />
    </div>
  )
}

export default Editor;