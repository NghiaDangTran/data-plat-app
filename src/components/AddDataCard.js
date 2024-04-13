import { useState } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";

export default function AddDataCard() {
    const [foodName, setFoodName] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [status, setStatus] = useState("");

    const handleAddData = async () => {
        try {

            setStatus("Waiting to update...")
            const response = await fetch(
                "https://laptop-ga134362.tail87d12.ts.net/api/food/insertFoodName",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "1",
                    },
                    body: JSON.stringify({
                        foodInsert: foodName,
                        fileName: "/usr/data/job.txt"
                    }),
                }
            );

            console.log(response.status)
            if (response.status === 200) {
            }

            if (response.status === 409) {
                setStatus(`Item '${foodName}' already exists, please search it `)


            }
            if (response.status === 503) {
                setStatus("Foodname cannot be empty")
            }
            setStatus("Your Data is added to database, it may take some before you see the data update")

        } catch (err) {
            console.error("Error adding data:", err);
            setStatus("Failed to add data, it maybe because the server is down");
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "auto" }}
        >
            <Card
                style={{ width: "30rem", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}
            >
                <Card.Body>
                    <h3 className="mb-4">Selection Form</h3>
                    <Form>
                        <Form.Group className="mb-3 d-flex flex-column align-items-start">
                            <Form.Label>Food Name:</Form.Label>

                            <Form.Control type="text"
                                placeholder="Enter the food you want to search"

                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                    <Button
                        className="mt-3"
                        variant="primary"
                        block
                        style={{ borderRadius: "25px" }}
                        onClick={
                            () => {
                                handleAddData()
                                setShowModal(true)

                            }
                        }
                    >
                        Add Data
                    </Button>
                </Card.Body>


            </Card>
            <Modal
                className="custom-modal"
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                }}
                size="xl"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <p>{status}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
