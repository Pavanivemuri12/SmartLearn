import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Updated FileUpload component
export const FileUpload = ({ endpoint, onChange }: { endpoint: keyof OurFileRouter; onChange: (url: string) => void }) => {
  return (
    <UploadDropzone<OurFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res[0]?.url) {
          onChange(res[0].url);  // Assuming the URL is at res[0].url
        }
      }}
      onUploadError={(error) => {
        console.error("Upload error:", error);
      }}
    />
  );
};
