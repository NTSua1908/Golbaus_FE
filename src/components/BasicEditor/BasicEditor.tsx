import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import MDEditor, { ContextStore, commands } from "@uiw/react-md-editor";
import {
  createUploadImageCommand,
  textUnderlineCommand,
  textAlignLeftCommand,
  textAlignCenterCommand,
  textAlignRightCommand,
  createUndoCommand,
  createRedoCommand,
} from "./EditorCommands";
import "./style.css";
import { deleteObject, ref as firebaseRef } from "firebase/storage";
import storage from "../../FirebaseInit";
import { deleteImage } from "../../services/FireBaseService";

export interface ImageUploaded {
  link: string;
  path: string;
}

export interface EditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  uploadImage?: boolean;
}

export interface EditorRef {
  onSavePost: () => Promise<void>;
}

const BasicEditor = forwardRef<EditorRef, EditorProps>(
  ({ value, setValue, uploadImage }, ref) => {
    const [history, setHistory] = useState<string[]>([value]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const typingTimeoutRef = useRef<number>();

    //Manage image added in this post, we will delete unused image when user save the post :v
    const [images, setImages] = useState<ImageUploaded[]>([]);

    //Delete unused image :3
    const onSavePost = () => {
      console.log("deleteing...");
      return deleteImage(images, (link) => {
        return !value.includes(link);
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
      console.log(historyIndex);
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
      <div className='BasicEditor' data-color-mode='light'>
        <MDEditor
          height={200}
          minHeight={150}
          value={value}
          onChange={handleEditorChange}
          commands={
            uploadImage
              ? [
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
                      name: "title",
                      groupName: "title",
                      buttonProps: { "aria-label": "Insert title" },
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
                  commands.divider,
                  undoCommand,
                  redoCommand,
                  commands.divider,
                  commands.help,
                  uploadImageCommand,
                ]
              : [
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
                      name: "title",
                      groupName: "title",
                      buttonProps: { "aria-label": "Insert title" },
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
                  commands.divider,
                  undoCommand,
                  redoCommand,
                  commands.divider,
                  commands.help,
                ]
          }
        />
      </div>
    );
  }
);

export default React.memo(BasicEditor);
