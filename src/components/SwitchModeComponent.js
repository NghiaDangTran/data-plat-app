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
                    height: "40rem",
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
                            variant={mode === "add" ? "primary" : "outline-primary"}
                            onClick={() => setMode("add")}
                        >
                            Category Data
                        </Button>
                    </div>

                    {mode === "download" ? (
                        <AutocompleteComponent />
                    ) : (
                        <HierarchicalSelect />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SwitchModeComponent;
