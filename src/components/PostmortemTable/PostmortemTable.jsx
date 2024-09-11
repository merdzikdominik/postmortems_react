import React, { useState } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import DynamicSelect from "../utils/AddableSelect";
import dumbData from "../../dumb_data.json";

const PostmortemTable = ({ filterText = "", editable = false }) => {
    const [data, setData] = useState(dumbData.postmortems);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRow, setEditingRow] = useState(null);
    const itemsPerPage = 10;

    const filteredData = data.filter((row) =>
        row.incident.toLowerCase().includes(filterText.toLowerCase()) ||
        row.assigned_to.toLowerCase().includes(filterText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (id) => {
        setEditingRow(id);
    };

    const handleDelete = (id) => {
        const newData = data.filter(row => row.id !== id);
        setData(newData);
    };

    const handleSave = (id) => {
        setEditingRow(null);
    };

    const handleSelectChange = (newValue, id, field) => {
        const newData = data.map(row => {
            if (row.id === id) {
                return { ...row, [field]: newValue.map(opt => opt.value).join(", ") };
            }
            return row;
        });
        setData(newData);
    };

    const options = {
        assigned_to: [
            { value: 'John Doe', label: 'John Doe' },
            { value: 'Jane Smith', label: 'Jane Smith' },
            { value: 'Michael Brown', label: 'Michael Brown' }
        ],
        identified_issue: [
            { value: 'Network Issue', label: 'Network Issue' },
            { value: 'Database Error', label: 'Database Error' },
            { value: 'Software Bug', label: 'Software Bug' }
        ],
        rca: [
            { value: 'Root Cause A', label: 'Root Cause A' },
            { value: 'Root Cause B', label: 'Root Cause B' },
            { value: 'Root Cause C', label: 'Root Cause C' }
        ],
        technology: [
            { value: 'JavaScript', label: 'JavaScript' },
            { value: 'Python', label: 'Python' },
            { value: 'AWS', label: 'AWS' }
        ]
    };

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th style={{ width: "5%" }}>ID</th>
                        <th style={{ width: "10%" }}>Incident</th>
                        <th style={{ width: "7%" }}>Prep</th>
                        <th style={{ width: "10%" }}>Assigned To</th>
                        <th style={{ width: "10%" }}>Issue Date</th>
                        <th style={{ width: "7%" }}>In Scope</th>
                        <th style={{ width: "15%" }}>Comments</th>
                        <th style={{ width: "10%" }}>Identified Issue</th>
                        <th style={{ width: "10%" }}>RCA</th>
                        <th style={{ width: "10%" }}>Technology</th>
                        { editable && <th style={{ width: "16%" }}>Actions</th> }
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.incident}</td>
                            <td>{row.prep}</td>
                            <td>
                                {editingRow === row.id ? (
                                    <DynamicSelect
                                        items={options.assigned_to}
                                        type="user"
                                        label="Assigned To"
                                        value={row.assigned_to.split(", ").map(value => ({ value, label: value }))}
                                        onChange={(newValue) => handleSelectChange(newValue, row.id, "assigned_to")}
                                    />
                                ) : (
                                    row.assigned_to
                                )}
                            </td>
                            <td>{row.issue_date}</td>
                            <td>{row.in_scope}</td>
                            <td>{row.comments}</td>
                            <td>
                                {editingRow === row.id ? (
                                    <DynamicSelect
                                        items={options.identified_issue}
                                        type="issue"
                                        label="Identified Issue"
                                        value={row.identified_issue.split(", ").map(value => ({ value, label: value }))}
                                        onChange={(newValue) => handleSelectChange(newValue, row.id, "identified_issue")}
                                    />
                                ) : (
                                    row.identified_issue
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <DynamicSelect
                                        items={options.rca}
                                        type="RCA"
                                        label="RCA"
                                        value={row.rca.split(", ").map(value => ({ value, label: value }))}
                                        onChange={(newValue) => handleSelectChange(newValue, row.id, "rca")}
                                    />
                                ) : (
                                    row.rca
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <DynamicSelect
                                        items={options.technology}
                                        type="technology"
                                        label="Technology"
                                        value={row.technology.split(", ").map(value => ({ value, label: value }))}
                                        onChange={(newValue) => handleSelectChange(newValue, row.id, "technology")}
                                    />
                                ) : (
                                    row.technology
                                )}
                            </td>
                            {editable && (
                                <td>
                                    {editingRow === row.id ? (
                                        <Button variant="success" size="sm" onClick={() => handleSave(row.id)}>
                                            Save
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => handleEdit(row.id)}
                                                style={{ marginRight: '8px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(row.id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                
                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                        key={idx + 1}
                        active={idx + 1 === currentPage}
                        onClick={() => handlePageChange(idx + 1)}
                    >
                        {idx + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        </>
    );
};

export default PostmortemTable;
