import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import dumbData from "../../dumb_data.json";

const PostmortemTable = ({ filterText="", editable=false }) => {
    const [data, setData] = useState(dumbData.postmortems);
    const [currentPage, setCurrentPage] = useState(1);
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
        console.log("Edit item with id:", id);
    };

    const handleDelete = (id) => {
        console.log("Delete item with id:", id);
        const newData = data.filter(row => row.id !== id);
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
                        { editable && <th style={{ width: "16%" }}>Actions</th> }
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.incident}</td>
                            <td>{row.prep}</td>
                            <td>{row.assigned_to}</td>
                            <td>{row.issue_date}</td>
                            <td>{row.in_scope}</td>
                            <td>{row.comments}</td>
                            <td>{row.identified_issue}</td>
                            <td>{row.rca}</td>
                            <td>{row.technology}</td>
                            {  editable && <td>
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
                            </td> }
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
