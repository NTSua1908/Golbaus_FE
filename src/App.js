import './App.css';
import BasicEditor from './components/BasicEditor/BasicEditor';
import CodeMirrorEditor from './components/CodeMirrorEditor';
import MonacoEditor from './components/MonacoEditor';
import Section from './components/Section/Section';
// import { UnControlled as CodeMirror } from 'react-codemirror2';
import '@mdxeditor/editor/style.css';
import * as editor from '@mdxeditor/editor';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
// import { CodeBlock } from '@mdxeditor/editor/plugins/toolbar/components/CodeBlock';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import ShowCode from './components/ShowCode/ShowCode';
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi,
} from '@uiw/react-md-editor';
import CreatePost from './pages/CreatePost/CreatePost';

const mkdStr = `
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`

Markdown does not support this feature natively, but you can achieve this wrapping Markdown into HTML.

As a rule of thumb, most 'flavors' of Markdown will render this as centered text:

<p style="text-align: center;">Centered text</p>
Specifically for Grav, as their documentation states, you should do these following steps:

in your system configuration file user/config/system.yaml make sure to activate the markdown extra option:

\`\`\`javascript
function createFileNameWithTimestamp(originalFileName) {
  const timestamp = getCurrentTimeString();
  const extension = originalFileName.split('.').pop();
  const fileName = \`\${originalFileName.replace(
    \`.\${extension}\`,
    ''
  )}_\${timestamp}.\${extension}\`;
  return fileName;
}
\`\`\`
`;

function App() {
  return (
    <div className='App'>
      {/* <BasicEditor />
      <ShowCode content={mkdStr} /> */}
      <CreatePost />
    </div>
  );
}

export default App;
