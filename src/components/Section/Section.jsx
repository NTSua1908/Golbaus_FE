// import 'highlight.js';
// import React, { useEffect, useState, useRef } from 'react';
// import Editor from '@monaco-editor/react';
// import MonacoEditor from '../MonacoEditor';
// import LanguageDropDown from '../LanguageDropDown/LanguageDropDown';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { prism as SyntaxHighlighterStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// // import 'react-syntax-highlighter/dist/cjs/styles/prism.css';

// var formats = [
//   'header',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'code-block',
//   'align',
// ];

// var modules = {
//   // syntax: true,
//   // syntax: {
//   //   highlight: (text) => {
//   //     return SyntaxHighlighter.highlight(text, SyntaxHighlighterStyle);
//   //   },
//   // },
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     ['link', 'image'],
//     ['clean'],
//     ['code-block'],
//     [{ align: [] }],
//   ],
// };

// function Section() {
//   const [editorHeight, setEditorHeight] = useState(100); // Initial height
//   const editorRef = useRef(null);
//   const [language, setLanguage] = useState('Text');
//   const [code, setCode] = useState('');
//   const content = "var message = 'Monaco Editor!' \nconsole.log(message);";

//   useEffect(() => {
//     const numberOfLines = code.split('\n').length;
//     const newHeight = Math.min(Math.max(numberOfLines * 20, 100), 450); // Adjust the multiplier based on your font size
//     setEditorHeight(newHeight);
//     console.log(editorHeight, numberOfLines);
//     console.log(code);
//   }, [code]);

//   return (
//     <div>
//       <LanguageDropDown
//         language={language}
//         setLanguage={setLanguage}
//       />
//       {language === 'Text' ? (
//         <ReactQuill
//           theme='snow'
//           value={code}
//           onChange={setCode}
//           formats={formats}
//           modules={modules}
//         />
//       ) : (
//         <Editor
//           ref={editorRef}
//           height={editorHeight + 'px'}
//           language={language.toLowerCase()}
//           theme='vs-dark'
//           value={code}
//           onChange={(e) => {
//             setCode(e);
//           }}
//           options={{
//             inlineSuggest: true,
//             fontSize: '16px',
//             formatOnType: true,
//             autoClosingBrackets: true,
//             minimap: { scale: 10 },
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default Section;
