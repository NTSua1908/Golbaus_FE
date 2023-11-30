// import Editor from '@monaco-editor/react';
// import { useState, useRef, useEffect } from 'react';

// const getHeight = (code) => {
//   const numberOfLines = code.split('\n').length;
//   return Math.min(Math.max(numberOfLines * 20, 100), 450); // Adjust the multiplier based on your font size
// };

// function MonacoEditor({ language, code, setCode }) {
//   const [editorHeight, setEditorHeight] = useState(getHeight(code)); // Initial height
//   const editorRef = useRef(null);

//   useEffect(() => {
//     const numberOfLines = code.split('\n').length;
//     const newHeight = Math.min(Math.max(numberOfLines * 20, 100), 450); // Adjust the multiplier based on your font size
//     setEditorHeight(newHeight);
//     console.log(editorHeight, numberOfLines);
//   }, [code]);
//   useEffect(() => {
//     console.log(editorHeight);
//   }, [editorHeight]);

//   return (
//     <Editor
//       ref={editorRef}
//       height={editorHeight + 'px'}
//       //   height='200px'
//       language='javascript'
//       theme='vs-dark'
//       value={code}
//       onChange={(e) => {
//         setCode(e);

//         setEditorHeight(getHeight(code));
//         // console.log(newHeight, numberOfLines);
//         // console.log(e);
//       }}
//       options={{
//         inlineSuggest: true,
//         fontSize: '16px',
//         formatOnType: true,
//         autoClosingBrackets: true,
//         minimap: { scale: 10 },
//       }}
//     />
//   );
// }

// export default MonacoEditor;
