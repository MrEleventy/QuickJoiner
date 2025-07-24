import { InputGroup, Button } from "react-bootstrap";
import { useFilePicker } from "use-file-picker";

const FileSelectorComponent = ({ onFileSelect }:any) => {
  const { openFilePicker, filesContent, clear } = useFilePicker({
    accept: '.csv',
    multiple: false,
    onFilesSuccessfullySelected: ({ filesContent }:any) => {
      onFileSelect(filesContent[0]); // Emit the selected file
    },
    onClear: () => {
      onFileSelect(null);
    }
  });
  
  const placeholder = filesContent.length === 0
    ? <InputGroup.Text>*Filename*</InputGroup.Text>
    : <> {filesContent.map( (file, index) => ( <InputGroup.Text key={index.toString()}>{file.name}</InputGroup.Text> ) )} </>;
    
  return (
    <>
      <InputGroup>
        <Button variant="warning" onClick={() => openFilePicker()}>Select file</Button>
        <Button onClick={() => clear()}>Clear</Button>
        {placeholder}
      </InputGroup>
    </>
  );
}

export default FileSelectorComponent