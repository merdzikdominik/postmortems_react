import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import dumbData from "../../dumb_data.json"

const PostmortemTable = () => {
    const [data, setData] = useState(dumbData.postmortems)

    return (
        <Table striped bordered hover>
            <thread>
                <tr>
                    <th>ID</th>
                    <th>Incident</th>
                    <th>Prep</th>
                    <th>Assigned To</th>
                    <th>Issue Date</th>
                    <th>In Scope</th>
                    <th>Comments</th>
                    <th>Identified Issue</th>
                    <th>RCA</th>
                    <th>Technology</th>
                </tr>
            </thread>
            <tbody>
                { data.map(row => {
                    return (
                        <tr key={ row.id }>
                            <td>{ row.id }</td>
                            <td>{ row.incident }</td>
                            <td>{ row.prep }</td>
                            <td>{ row.assigned_to }</td>
                            <td>{ row.issue_date }</td>
                            <td>{ row.in_scope }</td>
                            <td>{ row.comments }</td>
                            <td>{ row.identified_issue }</td>
                            <td>{ row.rca }</td>
                            <td>{ row.technology }</td>
                        </tr>
                    )
                }) }
            </tbody>
        </Table>
    )
}

export default PostmortemTable