import './App.css';
import AddPostmortem from './components/AddPostmortem/AddPostmortem';
import EditPostmortem from './components/EditPostmortem/EditPostmortem';
import ExportData from './components/ExportData/ExportaData';
import PostmortemTable from './components/PostmortemTable/PostmortemTable';
import { FormControl, InputGroup } from 'react-bootstrap';

function App() {
  return (
    <div className="container">
      <div>
        <AddPostmortem />
        <EditPostmortem />
        <ExportData />
      </div>
      <div className="filter-container">
        <h1>Postmortem table</h1>
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <InputGroup.Text style={{ borderRadius: "5px 0 0 5px", borderRight: "none" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
            </svg>
          </InputGroup.Text>
          <FormControl style={{ borderRadius: "0 5px 5px 0" }} placeholder="Filter for incident or user" />
        </div>
      </div>
      <PostmortemTable />
    </div>
  );
}

export default App;
