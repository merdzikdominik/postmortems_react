import React, { useState } from "react"
import { Button } from "react-bootstrap"

const AddPostmortem = ({ onClick }) => {

    return (
        <div>
            <Button className="w-100" style={{backgroundColor: "#ff6200", border: "none"}} onClick={onClick}>Add postmortem</Button>
        </div>
    )
}

export default AddPostmortem