import { InputGroup, Button } from "react-bootstrap";
import { useFilePicker } from "use-file-picker";

const FileSelectorComponent = ({ onFileSelect }:any) => {
  const { openFilePicker, filesContent, clear } = useFilePicker({
    accept: '.csv',
    multiple: false,
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }:any) => {    
      onFileSelect(plainFiles[0], filesContent[0].content.split('\r\n')[0]); // Emit the selected file
    },
    onClear: () => {
      onFileSelect(null, '');
    }
  });
  
  const fileNameLabelClass = "flex-grow-1 text-center";
  const placeholder = filesContent.length === 0
    ? <InputGroup.Text className={fileNameLabelClass}>*Filename*</InputGroup.Text>
    : <> {filesContent.map( (file, index) => ( <InputGroup.Text className={fileNameLabelClass} key={index.toString()}>{file.name}</InputGroup.Text> ) )} </>;
    
  return (
    <>
      <InputGroup className="d-flex">
        <Button variant="warning" onClick={() => openFilePicker()}>Select file</Button>
        <Button onClick={() => clear()}>Clear</Button>
        {placeholder}
      </InputGroup>
    </>
  );
}

export default FileSelectorComponent