/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@/components/ui/button';
import { parse } from 'csv';

interface CSVUploaderType {
  setter: any;
}

function CSVUploader({ setter }: CSVUploaderType) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading failed');
    reader.onload = () => {
      // Parse CSV file
      parse(reader.result as any, (err: any, data: any) => {
        if (err) {
          setter([]);

          // TODO: Invalid csv file
        } else {
          setter(data);
        }
      });
    };

    // read file contents
    acceptedFiles.forEach((file: any) => reader.readAsBinaryString(file));
  }, [setter]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className="rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6">
      <div
        {...getRootProps({
          className:
            'border border-dashed relative border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center rounded-lg',
        })}
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <></> // thumbs
        ) : (
          <div className="text-center">
            <p className="mb-6 text-sm tracking-tighter text-gray-600 dark:text-gray-400">
              Drop your files or click to upload
            </p>
            <Button>CHOOSE FILE</Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default CSVUploader;
