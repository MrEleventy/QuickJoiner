import SourceCardComponent from "./sourceCard.component";
import { SourceModel } from "../model/source.model";
import { useState } from "react";
import { CsvContent } from "../model/csv-content.model";
import { Dictionary } from "../model/dictionary.model";
import { format } from "date-fns";

const QuickJoinerComponent = () => {
  const [source1, setSource1] = useState<SourceModel|null>();
  const [source2, setSource2] = useState<SourceModel|null>();
  const [results, setResults] = useState<CsvContent|null>();
  
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

  const handleSubmit = async (evt:any) => {
    evt.preventDefault();

    let f = new CsvContent(); 
    let f1 = await f.ProcessFile(source1?.selectedFile as File);
    f = new CsvContent(); 
    let f2 = await f.ProcessFile(source2?.selectedFile as File);

    const h1 = f1.headers.map(h => `f1.${h}`);
    const h2 = f2.headers.map(h => `f2.${h}`);

    let combined = new CsvContent();
    combined.headers = [...h1, ...h2];

    f1.rows.forEach(r => {
      let match = f2.rows.find(r2 => r2.get(source2?.selectedHeader as string) === r.get(source1?.selectedHeader as string));
      let newRow = new Dictionary<string, string>();

      r.forEach((v, k) => {
        newRow.set(`f1.${k}`, v);
      });
      
      f2.headers.forEach(h => {
        newRow.set(`f2.${h}`, match 
          ? match.get(h) || '' 
          : '');
      });
      combined.rows.push(newRow);
    });
    setResults(combined);
  }

  const resultsContent = results == null 
    ? <></> 
    : <>
        <h2 className="text-center my-3">Results</h2>
        <div className="d-flex justify-content-center mb-3">
          <a className="mx-3" href="#" onClick={() => {
            const csvContent = results.toCsvString();
            const link = document.createElement('a');
            link.setAttribute(
              'href', 
              URL.createObjectURL(
                new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }))
              );
            const today = new Date();
            const dstr = format(today, 'yyyyMMdd');
            link.setAttribute('download', `joined_results_${dstr}}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>Download</a>
          <a href="#" onClick={() => {
            setResults(null);
          }}>Clear</a>
        </div>
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                {
                  results.headers.map((h, i) =>
                    <th key={i}>{h.trim()}</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                results.rows.map((row, rowIndex) => 
                  <tr key={rowIndex}>
                    {
                      Array.from(row.values()).map((value, colIndex) => 
                        <td key={colIndex}>{value}</td>
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </>;

  return (
    <>
      <h1 className="text-center">Quick Joiner</h1>
      <p className="text-center">Combines two CSV files into one based on a column.</p>
      <form onSubmit={handleSubmit}>
        <SourceCardComponent sourceModelUpdated={handleSource1ModelUpdated} className="mb-3" title="Source 1" />
        <SourceCardComponent sourceModelUpdated={handleSource2ModelUpdated} title="Source 2" />      

        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-secondary" disabled={!canSubmit}>
            {"Smash!"}
          </button>
        </div>
      </form>
      {resultsContent}
    </>
  );
}

export default QuickJoinerComponent;