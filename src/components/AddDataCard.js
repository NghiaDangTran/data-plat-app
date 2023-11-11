import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function AddDataCard() {
    const [foodName, setFoodName] = useState("");
    const handleAddData = async () => {
        try {
            const response = await fetch(
                "https://3024-2604-3d09-a576-f900-c9a0-9b8-9fe6-f650.ngrok-free.app/api/food/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "1",
                    },
                    body: JSON.stringify({
                        name: foodName,
                    }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // This will alert the success message.
            } else {
                alert(data.error); // This will alert the error message.
            }
        } catch (err) {
            console.error("Error adding data:", err);
            alert("Failed to add data.");
        }
    };

    return (
        <>
            <h3 className="mb-4">Add Food Name</h3>
            <Form.Group>
                <Form.Control
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="Enter food name..."
                />
            </Form.Group>
            <Button
                className="mt-4"
                variant="primary"
                block
                style={{ borderRadius: "25px" }}
                onClick={handleAddData}
            >
                Add Data
            </Button>
        </>
    );
}
