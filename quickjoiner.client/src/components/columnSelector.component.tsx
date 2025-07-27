import { Form } from "react-bootstrap";

const ColumnSelectorComponent = ({ headers, onSelect } : { headers:string[], onSelect:any }) => {
  const uuid = crypto.randomUUID().substring(0, 8);
  const content = !headers || headers.length == 0
    ? <th>No Headers</th>
    : <>{headers.map((h,i) => (
      <th key={i}>
          <Form.Check type="radio" 
            name={`columnSelector-${uuid}`} 
            id={`columnSelector-${uuid}-${i}`} 
            label={h.trim()}
            value={h.trim()}
            onClick={() => onSelect(h.trim())}
            />
      </th>
    ))}</>;
 
  return (
    <table className="table table-bordered">
      <thead>
        <tr>{content}</tr>
      </thead>
    </table>);
}
export default ColumnSelectorComponent;