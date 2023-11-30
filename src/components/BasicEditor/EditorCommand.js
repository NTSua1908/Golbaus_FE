import { commands } from '@uiw/react-md-editor';
import { FaAlignLeft, FaImage, FaRedo, FaUndo } from 'react-icons/fa';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import storage from '../../FirebaseInit';
import { FaAlignCenter, FaAlignRight } from 'react-icons/fa6';

export const uploadImageCommand = commands.group([], {
  name: 'image',
  groupName: 'image',
  icon: <FaImage />,
  children: (handle) => {
    return (
      <div className='editor-select-image'>
        <input
          type='file'
          id='imageInput'
          accept='image/*'
          onChange={handle.execute}
        />
        <label
          for='imageInput'
          id='imageLabel'>
          Select Image
        </label>
      </div>
    );
  },
  execute: (state, api) => {
    let imageInput = document.querySelector('.editor-select-image #imageInput');
    const selectedImage = imageInput.files[0];
    if (selectedImage) {
      resizeAndUploadImage(selectedImage, api);
    }
  },
  buttonProps: { 'aria-label': 'Insert title' },
});

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

export const createUndoCommand = (
  setValue,
  history,
  setHistoryIndex,
  historyIndex
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
  setValue,
  history,
  setHistoryIndex,
  historyIndex
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
    buttonProps: { label: 'Insert title' },
  });
};

function resizeAndUploadImage(file, api) {
  const maxWidth = 500; // Set your desired maximum width
  const maxHeight = 500; // Set your desired maximum height

  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

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

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });

        UploadImage(resizedFile, api);
      }, file.type);
    };
  };

  reader.readAsDataURL(file);
}

function UploadImage(image, api) {
  let imageName = createFileNameWithTimestamp(image.name);
  const storageRef = ref(storage, 'images/post/' + imageName);

  uploadBytes(storageRef, image).then((snapshot) => {
    getDownloadURL(ref(storage, 'images/post/' + imageName)).then((url) => {
      let modifyText = `![](${url})\n`;
      api.replaceSelection(modifyText);
    });
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

function createFileNameWithTimestamp(originalFileName) {
  const timestamp = getCurrentTimeString();
  const extension = originalFileName.split('.').pop();
  const fileName = `${originalFileName.replace(
    `.${extension}`,
    ''
  )}_${timestamp}.${extension}`;
  return fileName;
}
