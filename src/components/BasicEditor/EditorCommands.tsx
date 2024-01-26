import { commands } from "@uiw/react-md-editor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { FaAlignLeft, FaImage, FaRedo, FaUndo } from "react-icons/fa";
import { FaAlignCenter, FaAlignRight, FaUnderline } from "react-icons/fa6";
import storage from "../../FirebaseInit";
import { ImageUploaded } from "./BasicEditor";
import { resizeAndUploadImage } from "../../services/FireBaseService";
import Module from "../../enums/Module";

export const createUploadImageCommand = (
  images: ImageUploaded[],
  setImages: React.Dispatch<React.SetStateAction<ImageUploaded[]>>
) => {
  return commands.group([], {
    name: "image",
    groupName: "image",
    icon: <FaImage />,
    children: (handle: any) => {
      return (
        <div className='editor-select-image'>
          <input
            type='file'
            id='imageInput'
            accept='image/*'
            onChange={handle.execute}
          />
          <label htmlFor='imageInput' id='imageLabel'>
            Select Image
          </label>
        </div>
      );
    },
    execute: async (state, api) => {
      let imageInput = document.querySelector<HTMLInputElement>(
        ".editor-select-image #imageInput"
      );
      const selectedImage = imageInput?.files?.[0];
      if (selectedImage) {
        await resizeAndUploadImage(
          selectedImage,
          api,
          images,
          setImages,
          Module.Post
        );
        //console.log('Done');
        if (imageInput) {
          imageInput.value = "";
        }
      }
    },
    buttonProps: { "aria-label": "Insert title" },
  });
};

export const textAlignLeftCommand = commands.group([], {
  name: "alignLeft",
  groupName: "align",
  icon: <FaAlignLeft />,
  execute: (state, api) => {
    let modifyText = `<div align='left'>${state.selectedText}</div>`;
    api.replaceSelection(modifyText);
  },
  buttonProps: { "aria-label": "Insert title" },
});

export const textAlignCenterCommand = commands.group([], {
  name: "alignCenter",
  groupName: "align",
  icon: <FaAlignCenter />,
  execute: (state, api) => {
    let modifyText = `<div align='center'>${state.selectedText}</div>`;
    api.replaceSelection(modifyText);
  },
  buttonProps: { "aria-label": "Insert title" },
});

export const textAlignRightCommand = commands.group([], {
  name: "alignRight",
  groupName: "align",
  icon: <FaAlignRight />,
  execute: (state, api) => {
    let modifyText = `<div align='right'>${state.selectedText}</div>`;
    api.replaceSelection(modifyText);
  },
  buttonProps: { "aria-label": "Insert title" },
});

export const textUnderlineCommand = commands.group([], {
  name: "underline",
  groupName: "underline",
  icon: <FaUnderline />,
  execute: (state, api) => {
    let modifyText = `<u>${state.selectedText}</u>`;
    api.replaceSelection(modifyText);
  },
  buttonProps: { "aria-label": "Insert title" },
});

export const createUndoCommand = (
  setValue: React.Dispatch<React.SetStateAction<string>>,
  history: string[],
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  historyIndex: number
) => {
  return commands.group([], {
    name: "undo",
    groupName: "undo",
    icon: <FaUndo />,
    execute: (state, api) => {
      console.log("History: ", historyIndex, history);
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setValue(history[historyIndex - 1]);
      }
    },
    buttonProps: { "aria-label": "Insert title" },
  });
};

export const createRedoCommand = (
  setValue: React.Dispatch<React.SetStateAction<string>>,
  history: string[],
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  historyIndex: number
) => {
  return commands.group([], {
    name: "redo",
    groupName: "redo",
    icon: <FaRedo />,
    execute: (state, api) => {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setValue(history[historyIndex + 1]);
      }
    },
    buttonProps: { "aria-label": "Insert title" },
  });
};
