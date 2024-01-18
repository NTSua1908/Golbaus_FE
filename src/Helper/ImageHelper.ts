import Module from "../enums/Module";

export const convertLinkToImageUploaded = (link: string, module: Module) => {
  return {
    link: link,
    path:
      "images/" +
      Module[module] +
      "/" +
      link.substring(link.lastIndexOf("%2F") + 3, link.indexOf("?")),
  };
};
