import React, { useState } from "react";
import { Table } from "react-bootstrap";
import dumbData from "../../dumb_data.json";

const PostmortemTable = () => {
    const [data] = useState(dumbData.postmortems);

    return (
        <Table striped>
            <thead>
                <tr>
                    <th style={{ width: "5%" }}>ID</th>
                    <th style={{ width: "15%" }}>Incident</th>
                    <th style={{ width: "10%" }}>Prep</th>
                    <th style={{ width: "15%" }}>Assigned To</th>
                    <th style={{ width: "10%" }}>Issue Date</th>
                    <th style={{ width: "10%" }}>In Scope</th>
                    <th style={{ width: "15%" }}>Comments</th>
                    <th style={{ width: "15%" }}>Identified Issue</th>
                    <th style={{ width: "10%" }}>RCA</th>
                    <th style={{ width: "15%" }}>Technology</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
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
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default PostmortemTable;
