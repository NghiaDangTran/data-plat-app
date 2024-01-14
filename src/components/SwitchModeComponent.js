import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import AutocompleteComponent from "./AutocompleteComponent";
import AddDataCard from "./AddDataCard";
import HierarchicalSelect from "./HierarchicalSelect";

function SwitchModeComponent() {
    const [mode, setMode] = useState("download"); // "download" or "add"

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <Card
                style={{
                    width: "30rem",
                    height: "auto",
                    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Card.Body style={{ overflowY: "auto", height: "100%" }}>
                    <div className="d-flex justify-content-between mb-3">
                        <Button
                            variant={mode === "download" ? "primary" : "outline-primary"}
                            onClick={() => setMode("download")}
                        >
                            Name Data
                        </Button>
                        <Button
                            variant={mode === "category" ? "primary" : "outline-primary"}
                            onClick={() => setMode("category")}
                        >
                            Category Data
                        </Button>
                        <Button
                            variant={mode === "add" ? "primary" : "outline-primary"}
                            onClick={() => setMode("add")}
                        >
                            Add Data
                        </Button>
                    </div>

                    {mode === "download" ? (
                        <AutocompleteComponent />
                    ) : mode === "category" ? (
                        <HierarchicalSelect />
                    ) : <AddDataCard />}
                </Card.Body>
                <p>Note: If after you search and don't find the food you want try to add it to the data base</p>
            </Card>

        </Container>
    );
}

export default SwitchModeComponent;
