import logo from './logo.svg';
import './App.css';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';


function App() {

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log(content);

      fetch('http://localhost:7000/api/v1/user/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          alert('success');
        })
        .catch(error => {
          alert('error');
        });

    }
  };

  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          apiKey='tfyzrg3tr3jrtu9gumn98vndqvc0rsmqtajqnizirws42yde'
          init={{
            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
          initialValue="Welcome to TinyMCE!"
        />
        <button onClick={log}>Log editor content</button>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
