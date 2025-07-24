import { useState } from "react";
import ColumnSelectorComponent from "./columnSelector.component";
import FileSelectorComponent from "./fileSelector.component";
import type { FileContent } from "use-file-picker/types";

const QuickJoinerComponent = () => {
  const [ selectedFile, setSelectedFile] = useState<FileContent<String>>();
  const [ headers, setHeaders] = useState<string[]>([]);

  const handleFileSelect = (file:FileContent<String>) => {
    console.dir(file);
    setSelectedFile(file);
    const headers = file.content.split('\r\n')[0];
    setHeaders(headers.split(','));
  }

  return (
    <>
      <FileSelectorComponent onFileSelect={handleFileSelect} />
      <ColumnSelectorComponent headers={headers} />
    </>
  );
}

export default QuickJoinerComponent;