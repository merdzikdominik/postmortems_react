import React from "react";
import DynamicSelect from "../utils/AddableSelect";
import { Form, Button } from "react-bootstrap";

const items = [
    { value: "Caused by Change", label: "Caused by Change" },
    { value: "Data error", label: "Data error" },
    { value: "Provider error", label: "Provider error" },
];

const availableAssignedToOptions = [
    { value: 'RaAd', label: 'RaAd' },
    { value: 'JaBe', label: 'JaBe' },
    { value: 'PiCz', label: 'PiCz' },
    { value: 'ZuDą', label: 'ZuDą' },
    { value: 'AdGo', label: 'AdGo' },
    { value: 'ArIr', label: 'ArIr' },
    { value: 'GrKo', label: 'GrKo' },
    { value: 'KrLa', label: 'KrLa' },
    { value: 'MiŁu', label: 'MiŁu' },
    { value: 'DoMe', label: 'DoMe' },
    { value: 'MaSi', label: 'MaSi' },
    { value: 'ToWi', label: 'ToWi' },
    { value: 'RaZa', label: 'RaZa' },
    { value: 'MaZi', label: 'MaZi' },
];

const issueDropdown = [
    "Caused by Change",
    "Data error",
    "Provider error",
    "Business User error",
    "Security - Access",
    "Security - Other",
    "Security - Lost/stolen",
    "Power failure",
    "Capacity issue",
    "Design issue",
    "External cause",
    "Application error",
    "Infrastructure error",
    "Unknown"
];

const AddPostmortemForm = () => {
    return (
        <div style={{ width: "50%", margin: "20px auto" }}>
            <h1>Postmortem Form</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="incidentInput">Incident</Form.Label>
                    <Form.Control id="incidentInput" placeholder="Provided incident reference" />

                    <Form.Group className="mb-3" controlId="prepCheckbox">
                        <Form.Check type="checkbox" label="Prep" />
                    </Form.Group>

                    <DynamicSelect items={availableAssignedToOptions} type="person assigned to postmortem" label="Assigned To" />

                    <Form.Label htmlFor="issueDateInput">Issue Date</Form.Label>
                    <Form.Control type="date" id="issueDateInput" />

                    <Form.Group className="mb-3" controlId="inScopeCheckbox">
                        <Form.Check type="checkbox" label="In Scope" />
                    </Form.Group>

                    <Form.Label htmlFor="commentsTextarea">Comments</Form.Label>
                    <Form.Control as="textarea" id="commentsTextarea" placeholder="Provide additional information if necessary" rows={3} />

                    <DynamicSelect items={items} type="issue" label="Identified Issue" />
                    <DynamicSelect items={items} type="technology" label="Technology" />

                    <Form.Label htmlFor="rca">Pick Root Cause</Form.Label>
                    <Form.Select id="rca" defaultValue="">
                        <option value="" disabled>
                            Pick Root Cause
                        </option>
                        {issueDropdown.map((rca, index) => (
                            <option key={index} value={rca}>
                                {rca}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button type="submit" style={{ width: "100%", backgroundColor: "#ff6200", border: "none" }}>
                        Add Info
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default AddPostmortemForm;
