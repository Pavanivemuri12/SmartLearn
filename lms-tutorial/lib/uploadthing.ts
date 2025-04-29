import {
    generateUploadButton,
    generateUploadDropzone,
    generateUploader,
  } from "@uploadthing/react";
  
  import type { ourFileRouter } from "@/app/api/uploadthing/core";
  
  export const UploadButton = generateUploadButton<typeof ourFileRouter>();
  export const UploadDropzone = generateUploadDropzone<typeof ourFileRouter>();
  export const Uploader = generateUploader<typeof ourFileRouter>();