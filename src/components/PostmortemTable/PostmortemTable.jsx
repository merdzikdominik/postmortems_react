import React, { useState } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import dumbData from "../../dumb_data.json";

const PostmortemTable = ({ filterText = "", editable = false }) => {
    const [data, setData] = useState(dumbData.postmortems);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRow, setEditingRow] = useState(null); // Przechowywanie ID wiersza, który jest edytowany
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
        setEditingRow(id); // Ustawianie ID wiersza do edycji
    };

    const handleDelete = (id) => {
        const newData = data.filter(row => row.id !== id);
        setData(newData);
    };

    const handleSave = (id) => {
        // Możesz tutaj dodać logikę do zapisywania edytowanych danych
        setEditingRow(null); // Zakończ edytowanie po zapisaniu
    };

    const handleInputChange = (e, id, field) => {
        const newData = data.map(row => {
            if (row.id === id) {
                return { ...row, [field]: e.target.value };
            }
            return row;
        });
        setData(newData);
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
                        {editable && <th style={{ width: "16%" }}>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.incident}
                                        onChange={(e) => handleInputChange(e, row.id, 'incident')}
                                    />
                                ) : (
                                    row.incident
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.prep}
                                        onChange={(e) => handleInputChange(e, row.id, 'prep')}
                                    />
                                ) : (
                                    row.prep
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.assigned_to}
                                        onChange={(e) => handleInputChange(e, row.id, 'assigned_to')}
                                    />
                                ) : (
                                    row.assigned_to
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.issue_date}
                                        onChange={(e) => handleInputChange(e, row.id, 'issue_date')}
                                    />
                                ) : (
                                    row.issue_date
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.in_scope}
                                        onChange={(e) => handleInputChange(e, row.id, 'in_scope')}
                                    />
                                ) : (
                                    row.in_scope
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.comments}
                                        onChange={(e) => handleInputChange(e, row.id, 'comments')}
                                    />
                                ) : (
                                    row.comments
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.identified_issue}
                                        onChange={(e) => handleInputChange(e, row.id, 'identified_issue')}
                                    />
                                ) : (
                                    row.identified_issue
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.rca}
                                        onChange={(e) => handleInputChange(e, row.id, 'rca')}
                                    />
                                ) : (
                                    row.rca
                                )}
                            </td>
                            <td>
                                {editingRow === row.id ? (
                                    <FormControl
                                        type="text"
                                        value={row.technology}
                                        onChange={(e) => handleInputChange(e, row.id, 'technology')}
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