import FileSelectorComponent from "./fileSelector.component";
import ColumnSelectorComponent from "./columnSelector.component";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { SourceModel } from "../model/source.model";

export interface SourceCardProps {
  sourceModelUpdated: (model:SourceModel | null) => void;
  title?: string;
  className?: string;
}

const SourceCardComponent = (props:SourceCardProps) => {
  const [ selectedFile, setSelectedFile] = useState<File>();
  const [ selectedHeader, setSelectedHeader] = useState<string>();
  const [ headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    if( selectedFile != null && selectedHeader?.trim() !=='' ) {
      props.sourceModelUpdated(new SourceModel(selectedFile, selectedHeader));
    } else {
      props.sourceModelUpdated(null);
    }
  }, [ selectedFile, selectedHeader ]);

  const handleFileSelect = (file:File, headers:string) => {  
    setSelectedFile(file);
    if(file != null){
      setHeaders(headers.split(','));
    } else {
      setHeaders([]);
      setSelectedHeader('');
    }
  }  

  const handleHeaderSelect = (header:string) => {    
    setSelectedHeader(header);
  }

  return (
    <Card className={props.className ? props.className : ''}>
      <Card.Header>{props.title ? props.title : 'Source'}</Card.Header>
      <Card.Body>
        <FileSelectorComponent onFileSelect={handleFileSelect} />
        <ColumnSelectorComponent headers={headers} onSelect={handleHeaderSelect} />
      </Card.Body>
    </Card>
  );
}
export default SourceCardComponent;