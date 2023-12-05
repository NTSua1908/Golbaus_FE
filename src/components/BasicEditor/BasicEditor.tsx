import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from 'react';
import MDEditor, { ContextStore, commands } from '@uiw/react-md-editor';
import {
  createUploadImageCommand,
  textUnderlineCommand,
  textAlignLeftCommand,
  textAlignCenterCommand,
  textAlignRightCommand,
  createUndoCommand,
  createRedoCommand,
} from './EditorCommands';
import './style.css';
import { deleteObject, ref as firebaseRef } from 'firebase/storage';
import storage from '../../FirebaseInit';

export interface ImageUploaded {
  link: string;
  path: string;
}

export interface EditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface EditorRef {
  onSavePost: () => Promise<void>;
}

const BasicEditor = forwardRef<EditorRef, EditorProps>(
  ({ value, setValue }, ref) => {
    const [history, setHistory] = useState<string[]>([value]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const typingTimeoutRef = useRef<number>();

    //Manage image added in this post, we will delete unused image when user save the post
    const [images, setImages] = useState<ImageUploaded[]>([]);

    useEffect(() => {
      console.log(images);
    }, [images]);

    //Delete unused image
    const onSavePost = (): Promise<void> => {
      return new Promise(async (resolve, reject) => {
        await images.forEach(async (x) => {
          if (!value.includes(x.link)) {
            const desertRef = firebaseRef(storage, x.path);
            await deleteObject(desertRef)
              .then()
              .catch(() => {
                reject();
              });
            resolve();
          }
        });
      });
    };

    useImperativeHandle(
      ref,
      () => ({
        onSavePost,
      }),
      [onSavePost]
    );

    const updateHistory = (newValue: string) => {
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

    const uploadImageCommand = createUploadImageCommand(images, setImages);

    const handleEditorChange = (
      nextValue: string | undefined,
      _: ChangeEvent<HTMLTextAreaElement> | undefined,
      __: ContextStore | undefined
    ) => {
      if (nextValue !== value) {
        if (typingTimeoutRef.current !== null) {
          clearTimeout(typingTimeoutRef.current);
        }

        setValue(nextValue!);

        typingTimeoutRef.current = window.setTimeout(() => {
          updateHistory(nextValue!);
        }, 500);
      }
    };

    return (
      <div className='container'>
        <MDEditor
          height={800}
          value={value}
          onChange={handleEditorChange}
          commands={[
            commands.bold,
            commands.italic,
            textUnderlineCommand,
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
);

export default BasicEditor;