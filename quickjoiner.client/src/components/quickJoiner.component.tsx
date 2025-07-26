import { useState } from "react";
import ColumnSelectorComponent from "./columnSelector.component";
import FileSelectorComponent from "./fileSelector.component";
import type { FileContent } from "use-file-picker/types";

const QuickJoinerComponent = () => {
  const [ selectedFile, setSelectedFile] = useState<FileContent<String>>();
  const [ headers, setHeaders] = useState<string[]>([]);

  const handleFileSelect = (file:FileContent<String>) => {  
    setSelectedFile(file);
    if(file != null){
      const headers = file.content.split('\r\n')[0];
      setHeaders(headers.split(','));
    } else {
      setHeaders([]);
    }

  }

  return (
    <>
      <FileSelectorComponent onFileSelect={handleFileSelect} />
      <ColumnSelectorComponent headers={headers} />
    </>
  );
}

export default QuickJoinerComponent;