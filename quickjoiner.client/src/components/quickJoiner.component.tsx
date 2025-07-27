import { useFormStatus } from "react-dom";
import SourceCardComponent from "./sourceCard.component";
import { SourceModel } from "../model/source.model";
import { useState } from "react";

const QuickJoinerComponent = () => {
  const [source1, setSource1] = useState<SourceModel|null>();
  const [source2, setSource2] = useState<SourceModel|null>();
  const { pending } = useFormStatus();
  
  const handleSubmit = (evt:any) => {
    evt.preventDefault();
    const form = evt.target;
    console.dir(form);
  }

  const handleSource1ModelUpdated = (model:SourceModel|null) => {
    setSource1(model);
  }
  const handleSource2ModelUpdated = (model:SourceModel|null) => {
    setSource2(model);
  } 

  const validateForm = ():boolean => {
    return source1 != null && source1.canSubmit() && source2 != null && source2.canSubmit();    
  }

  const canSubmit = validateForm();
  return (
    <>
      <h1 className="text-center">Quick Joiner</h1>
      <p className="text-center">Combines two CSV files into one based on a column.</p>
      <form onSubmit={handleSubmit}>
        <SourceCardComponent sourceModelUpdated={handleSource1ModelUpdated} className="mb-3" title="Source 1" />
        <SourceCardComponent sourceModelUpdated={handleSource2ModelUpdated} title="Source 2" />      

        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-secondary" disabled={pending || !canSubmit}>
            {pending ? "Submitting..." : "Submit"}</button>
        </div>
      </form>
    </>
  );
}

export default QuickJoinerComponent;