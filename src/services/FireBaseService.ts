import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { ImageUploaded } from "../components/BasicEditor/BasicEditor";
import storage from "../FirebaseInit";

export function resizeAndUploadImage(
  file: File,
  api: any,
  images: ImageUploaded[],
  setImages: React.Dispatch<React.SetStateAction<ImageUploaded[]>>,
  size = 500
) {
  return new Promise((resolve, reject) => {
    const maxWidth = size;
    const maxHeight = size;

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target!.result as string;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

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

          await UploadImage(resizedFile, api, images, setImages);
          resolve(true);
        }, file.type);
      };
    };
    reader.readAsDataURL(file);
  });
}

export function deleteImage(
  images: ImageUploaded[],
  condition: (x: string) => boolean
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    await images.forEach(async (x) => {
      if (condition(x.link)) {
        const desertRef = ref(storage, x.path);
        await deleteObject(desertRef)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      }
    });
  });
}

async function UploadImage(
  image: File,
  api: any,
  images: ImageUploaded[],
  setImages: React.Dispatch<React.SetStateAction<ImageUploaded[]>>
) {
  let imageName = createFileNameWithTimestamp(image.name);
  const storageRef = ref(storage, "images/post/" + imageName);

  await uploadBytes(storageRef, image).then(async (snapshot) => {
    await getDownloadURL(ref(storage, "images/post/" + imageName)).then(
      (url) => {
        let modifyText = `![](${url})\n`;
        if (api) {
          api.replaceSelection(modifyText);
        }
        setImages((prev) => [
          ...prev,
          {
            link: url,
            path: "images/post/" + imageName,
          },
        ]);
      }
    );
  });
}

function getCurrentTimeString() {
  const currentDate = new Date();
  const dateString = currentDate
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0];
  return dateString;
}

function createFileNameWithTimestamp(originalFileName: string) {
  const timestamp = getCurrentTimeString();
  const extension = originalFileName.split(".").pop();
  const fileName = `${originalFileName.replace(
    `.${extension}`,
    ""
  )}_${timestamp}.${extension}`;
  return fileName;
}
