const ColumnSelectorComponent = ({ headers } : { headers:string[] }) => {
  const content = headers.length === 0
  ? <th>No Headers</th>
  : <>{headers.map((h) => (
    <th>{h}</th>
    ))}</>;
 
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            {content}
          </tr>
        </thead>
      </table>
    </>
  );
}
export default ColumnSelectorComponent;