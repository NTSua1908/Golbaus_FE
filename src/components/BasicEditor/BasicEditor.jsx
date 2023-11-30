import React, { useState, useRef } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import {
  uploadImageCommand,
  textAlignLeftCommand,
  textAlignCenterCommand,
  textAlignRightCommand,
  createUndoCommand,
  createRedoCommand,
} from './EditorCommand';
import './style.css';
import { debounce } from 'lodash';

function BasicEditor() {
  const [value, setValue] = useState();
  const [history, setHistory] = useState([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const typingTimeoutRef = useRef(null);

  const updateHistory = (newValue) => {
    setHistory([...history.slice(0, historyIndex + 1), newValue]);
    setHistoryIndex(historyIndex + 1);
  };

  const undoCommand = createUndoCommand(
    setValue,
    history,
    setHistoryIndex,
    historyIndex
  );

  const redoCommand = createRedoCommand(
    setValue,
    history,
    setHistoryIndex,
    historyIndex
  );

  const handleEditorChange = (nextValue, _, __) => {
    if (nextValue !== value) {
      // Clear previous typing timeout
      clearTimeout(typingTimeoutRef.current);
      setValue(nextValue);

      // Update the editor value and history after a short delay
      typingTimeoutRef.current = setTimeout(() => {
        updateHistory(nextValue);
      }, 500); // Adjust the delay based on your needs
    }
  };

  return (
    <div className='container'>
      {/* <button
        onClick={handleUndo}
        disabled={historyIndex === 0}>
        Undo
      </button>
      <button
        onClick={handleRedo}
        disabled={historyIndex === history.length - 1}>
        Redo
      </button> */}
      <MDEditor
        height={800}
        value={value}
        onChange={handleEditorChange}
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.hr,
          commands.group(
            [
              commands.title1,
              commands.title2,
              commands.title3,
              commands.title4,
              commands.title5,
              commands.title6,
            ],
            {
              name: 'title',
              groupName: 'title',
              buttonProps: { 'aria-label': 'Insert title' },
            }
          ),
          commands.divider,
          commands.link,
          commands.quote,
          commands.codeBlock,
          commands.comment,
          commands.divider,
          textAlignLeftCommand,
          textAlignCenterCommand,
          textAlignRightCommand,
          commands.divider,
          commands.table,
          commands.checkedListCommand,
          commands.orderedListCommand,
          commands.unorderedListCommand,
          uploadImageCommand,
          commands.divider,
          undoCommand,
          redoCommand,
          commands.divider,
          commands.help,
        ]}
      />
    </div>
  );
}

export default BasicEditor;
