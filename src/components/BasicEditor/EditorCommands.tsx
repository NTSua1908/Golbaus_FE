import { commands } from '@uiw/react-md-editor';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { FaAlignLeft, FaImage, FaRedo, FaUndo } from 'react-icons/fa';
import { FaAlignCenter, FaAlignRight, FaUnderline } from 'react-icons/fa6';
import storage from '../../FirebaseInit';
import { ImageUploaded } from './BasicEditor';

export const createUploadImageCommand = (
  images: ImageUploaded[],
  setImages: React.Dispatch<React.SetStateAction<ImageUploaded[]>>
) => {
  return commands.group([], {
    name: 'image',
    groupName: 'image',
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
          <label
            htmlFor='imageInput' // Corrected attribute name
            id='imageLabel'>
            Select Image
          </label>
        </div>
      );
    },
    execute: async (state, api) => {
      let imageInput = document.querySelector<HTMLInputElement>(
        '.editor-select-image #imageInput'
      );
      const selectedImage = imageInput?.files?.[0];
      if (selectedImage) {
        await resizeAndUploadImage(selectedImage, api, images, setImages);
        //console.log('Done');
        if (imageInput) {
          imageInput.value = '';
        }
      }
    },
    buttonProps: { 'aria-label': 'Insert title' },
  });
};

// export const createUploadImageCommand = (
//   images: string[],
//   setImages: React.Dispatch<React.SetStateAction<string[]>>
// ) => {
//   return commands.group([], {
//     name: 'image',
//     groupName: 'image',
//     icon: (<FaImage />) as IconType,
//     children: (handle) => {
//       return (
//         <div className='editor-select-image'>
//           <input
//             type='file'
//             id='imageInput'
//             accept='image/*'
//             onChange={handle.execute}
//           />
//           <label
//             for='imageInput'
//             id='imageLabel'>
//             Select Image
//           </label>
//         </div>
//       );
//     },
//     execute: async (state, api) => {
//       let imageInput = document.querySelector(
//         '.editor-select-image #imageInput'
//       );
//       const selectedImage = imageInput?.files[0];
//       if (selectedImage) {
//         await resizeAndUploadImage(selectedImage, api, images, setImages);
//         //console.log('Done');
//         imageInput.value = '';
//       }
//     },
//     buttonProps: { 'aria-label': 'Insert title' },
//   });
// };

export const textAlignLeftCommand = commands.group([], {
  name: 'alignLeft',
  groupName: 'align',
  icon: <FaAlignLeft />,
  execute: (state, api) => {
    let modifyText = `<div align='left'>${state.selectedText}</div>`;
    api.replaceSelection(modifyText);
  },
  buttonProps: { 'aria-label': 'Insert title' },
});

export const textAlignCenterCommand = commands.group([], {
  name: 'alignCenter',
  groupName: 'align',
  icon: <FaAlignCenter />,
  execute: (state, api) => {
    let modifyText = `<div align='center'>${state.selectedText}</div>`;
    api.replaceSelection(modifyText);
  },
  buttonProps: { 'aria-label': 'Insert title' },
});

export const textAlignRightCommand = commands.group([], {
  name: 'alignRight',
  groupName: 'align',
  icon: <FaAlignRight />,
  execute: (state, api) => {
    let modifyText = `<div align='right'>${state.selectedText}</div>`;
    api.replaceSelection(modifyText);
  },
  buttonProps: { 'aria-label': 'Insert title' },
});

export const textUnderlineCommand = commands.group([], {
  name: 'underline',
  groupName: 'underline',
  icon: <FaUnderline />,
  execute: (state, api) => {
    let modifyText = `<u>${state.selectedText}</u>`;
    api.replaceSelection(modifyText);
  },
  buttonProps: { 'aria-label': 'Insert title' },
});

export const createUndoCommand = (
  setValue: React.Dispatch<React.SetStateAction<string>>,
  history: string[],
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  historyIndex: number
) => {
  return commands.group([], {
    name: 'undo',
    groupName: 'undo',
    icon: <FaUndo />,
    execute: (state, api) => {
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setValue(history[historyIndex - 1]);
      }
    },
    buttonProps: { 'aria-label': 'Insert title' },
  });
};

export const createRedoCommand = (
  setValue: React.Dispatch<React.SetStateAction<string>>,
  history: string[],
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  historyIndex: number
) => {
  return commands.group([], {
    name: 'redo',
    groupName: 'redo',
    icon: <FaRedo />,
    execute: (state, api) => {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setValue(history[historyIndex + 1]);
      }
    },
    buttonProps: { 'aria-label': 'Insert title' },
  });
};

function resizeAndUploadImage(
  file: File,
  api: any,
  images: ImageUploaded[],
  setImages: React.Dispatch<React.SetStateAction<ImageUploaded[]>>
) {
  return new Promise((resolve, reject) => {
    const maxWidth = 500; // Set your desired maximum width
    const maxHeight = 500; // Set your desired maximum height

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target!.result as string;

      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let newWidth, newHeight;

        if (img.width > img.height) {
          newWidth = maxWidth;
          newHeight = (img.height * maxWidth) / img.width;
        } else {
          newHeight = maxHeight;
          newWidth = (img.width * maxHeight) / img.height;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx!.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(async (blob) => {
          const resizedFile = new File([blob!], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });

          //console.log('Prepare upload');
          await UploadImage(resizedFile, api, images, setImages);
          //console.log('Uploaded from resize');
          resolve(true);
        }, file.type);
      };
    };
    reader.readAsDataURL(file);
  });
}

async function UploadImage(
  image: File,
  api: any,
  images: ImageUploaded[],
  setImages: React.Dispatch<React.SetStateAction<ImageUploaded[]>>
) {
  let imageName = createFileNameWithTimestamp(image.name);
  const storageRef = ref(storage, 'images/post/' + imageName);

  await uploadBytes(storageRef, image).then(async (snapshot) => {
    //console.log('Getting link download');
    await getDownloadURL(ref(storage, 'images/post/' + imageName)).then(
      (url) => {
        let modifyText = `![](${url})\n`;
        api.replaceSelection(modifyText);
        //// console.log('state: ', images);
        setImages((prev) => [
          ...prev,
          {
            link: url,
            path: 'images/post/' + imageName,
          },
        ]);
        //console.log('uploading');
      }
    );
    //console.log('Got link download');
  });
}

function getCurrentTimeString() {
  const currentDate = new Date();
  const dateString = currentDate
    .toISOString()
    .replace(/[-:]/g, '')
    .split('.')[0];
  return dateString;
}

function createFileNameWithTimestamp(originalFileName: string) {
  const timestamp = getCurrentTimeString();
  const extension = originalFileName.split('.').pop();
  const fileName = `${originalFileName.replace(
    `.${extension}`,
    ''
  )}_${timestamp}.${extension}`;
  return fileName;
}
