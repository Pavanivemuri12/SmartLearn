"use client";  // Make sure this stays at the top

import { UploadDropzone } from "@uploadthing/react";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-hot-toast";

// Define your FileUpload component and use `OurFileRouter` type for the endpoint
interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;  // Using the type of ourFileRouter here
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone<typeof ourFileRouter, typeof endpoint>  // Passing the type here
      endpoint={endpoint}
      onClientUploadComplete={(res: { url: string }[] | undefined) => {
        if (res && res.length > 0) {
          onChange(res[0].url);  // Get the URL from the response
        } else {
          toast.error("No file uploaded.");
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);  // Display upload error
      }}
    />
  );
};
