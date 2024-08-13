import React, { useState } from "react";
import AddPostmortem from './components/AddPostmortem/AddPostmortem';
import AddPostmortemForm from "./components/AddPostmortem/AddPostmortemForm";
import EditPostmortem from './components/EditPostmortem/EditPostmortem';
import ExportData from './components/ExportData/ExportaData';
import PostmortemTable from './components/PostmortemTable/PostmortemTable';
import Filter from "./components/utils/Filter";
import './App.css';

function App() {
  const [isForm, setIsForm] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleShowForm = () => {
    setIsForm(!isForm);
  };

  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  return (
    <div className="container">
      <div>
        <AddPostmortem onClick={handleShowForm} />
        <EditPostmortem />
        <ExportData />
      </div>
      { isForm ? <AddPostmortemForm /> : '' }
      <div className="filter-container">
        <h2>Postmortem table</h2>
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <PostmortemTable filterText={filterText} />
    </div>
  );
}

export default App;
