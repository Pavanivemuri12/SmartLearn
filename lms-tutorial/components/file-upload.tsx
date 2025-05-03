"use client";

import { UploadDropzone } from "@uploadthing/react";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone<typeof ourFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={(res: { ufsUrl: string }[] | undefined) => {
        if (res && res.length > 0) {
          onChange(res[0].ufsUrl); // ✅ use ufsUrl instead of deprecated url
        } else {
          toast.error("No file uploaded.");
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
