import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Form, Button, Container, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap
import Papa from "papaparse";

const groupedOptions = {
    "Fresh or Frozen Beef": {},
    "Fresh or Frozen Pork": {},
    "Other Fresh or Frozen Meat": {},
    "Fresh or Frozen Poultry": {},
    "Ham and Bacon": {}, "Other Processed Meat": {},
    "Fresh or Frozen Fish (including portions and fish sticks)": {},
    "Canned and Other Preserved Fish": {},
    Shellfish: {},
    "Other Fish, Seafood and Other Marine Products": {},
    "Fresh Milk": {},
    Butter: {},
    Cheese: {},
    "Ice Cream and Related Products": {},
    Eggs: {},
    "Other Dairy Products": {},
    "Bread, Rolls and Buns": {},
    "Cookies and Crackers": {},
    "Other Bakery Products": {},
    "Rice and Rice-based Mixes": {},
    "Breakfast Cereal and Other Cereal Products (excluding baby food)": {},
    "Pasta Products": {},
    "Flour and Flour-based Mixes": {},
    "Other Cereal Products": {},
    Apples: {},
    Oranges: {},
    Bananas: {},
    "Other Fresh Fruit": {},
    "Fruit Juices": {},
    "Dried Fruit": {},
    "Canned Fruit": {},
    "Other Preserved Fruit and Fruit Preparations": {},
    "Nuts and Seeds": {},
    Potatoes: {},
    Tomatoes: {},
    Lettuce: {},
    "Other Fresh Vegetables": {},
    "Frozen Vegetables": {},
    "Dried Vegetables": {},
    "Canned Vegetables and Other Vegetable Preparations": {},
    "Sugar and Confectionery": {},
    "Fats and Oils": {},
    "Coffee and Tea": {},
    "Condiments, Spices and Vinegars": {},
    "Other Food Preparations": {},
    "Non-Alcoholic Beverages": {},
    "Vegan and Plant-Based Alternatives": {},
    Snacks: {},
    "Seasonings and Condiments": {},

    "Food Preparations and Ingredients": {},
    "Fresh Herbs": {},
    "Dried Herbs": {},
    "Other Herbs and Supplements": {},

    "Household Cleaning Products": {},
    "Personal Care Items": {},
    "Pet Food and Supplies": {},
    "Other Household Items": {},
};

function HierarchicalSelect() {
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(true); // Loading state
    const [options, setOptions] = useState([]); // State to store fetched options
    const [mode, setMode] = useState("download");
    const [selectedProvince, setSelectedProvince] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [uniqueDates, setUniqueDates] = useState([]);
    const [loadingCsv, setLoadingCsv] = useState(false);


    const handleShowModal = async () => {
        setShowModal(true);
        setLoadingCsv(true);
        //   foodName,
        // startDate,
        // endDate,
        // storeName,
        // locationName,
        // categoryName,

        try {
            const response = await fetch(
                "https://laptop-ga134362.tail7b2c8.ts.net/api/food/CSV",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "1",
                    },
                    body: JSON.stringify({
                        categoryName: selectedFood[0], // assuming the user selects only one food
                        // store: selectedStore,
                        startDate: startDate,
                        endDate: endDate,
                        locationName: selectedProvince,
                    }),
                }
            );
            const csvText = await response.text();
            const results = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
            });
            console.log("test")
            setCsvData(results.data);
        } catch (error) {
            console.error("Failed to fetch CSV data:", error);
        }
        setLoadingCsv(false);
    };
    useEffect(() => {
        // Fetch options from the API
        const fetchOptions = async () => {
            try {
                // const response = await fetch("https://laptop-ga134362.tail7b2c8.ts.net/api/food/name", {
                //   headers: {
                //     "ngrok-skip-browser-warning": "1",
                //   },
                // });
                const data = Object.keys(groupedOptions);
                setOptions(data);
                setLoading(false); // Set loading to false after fetching
            } catch (error) {
                console.error("Failed to fetch options:", error);
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    const handleDownload = async () => {
        const response = await fetch(
            "https://laptop-ga134362.tail7b2c8.ts.net/api/food/CSV",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "1",
                },
                body: JSON.stringify({
                    categoryName: selectedFood[0], // assuming the user selects only one food
                    // store: selectedStore,
                    startDate: startDate,
                    endDate: endDate,
                    locationName: selectedProvince,
                }),
            }
        );

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `data.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    if (loading) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <Spinner
                    animation="border"
                    role="status"
                    variant="primary"
                    style={{ width: "3rem", height: "3rem" }}
                >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80%" }}
        >
            <Card
                style={{ width: "30rem", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}
            >
                <Card.Body>
                    <h3 className="mb-4">Selection Form</h3>
                    <Form>
                        <Form.Group className="mb-3 d-flex flex-column align-items-start">
                            <Form.Label>Category Name:</Form.Label>
                            <Typeahead
                                id="food-typeahead"
                                labelKey="name"
                                onChange={setSelectedFood}
                                options={options}
                                placeholder="Choose a food..."
                                selected={selectedFood}
                                style={{ width: "100%" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column align-items-start">
                            <Form.Label>Province :</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                            >
                                {/*  "ontario",
          "manitoba",
          "alberta",
          "british_columbia", */}
                                <option value="">Select Province</option>
                                <option value="ontario">Ontario</option>
                                <option value="manitoba">Manitoba</option>
                                <option value="alberta">Alberta</option>
                                <option value="british_columbia">British Columbia</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column align-items-start">
                            <Form.Label>Date From</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date.setHours(0, 0, 0, 0));
                                }}
                                style={{ width: "100%" }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex flex-column align-items-start">
                            <Form.Label column sm="3">
                                Date To
                            </Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={endDate}
                                onChange={(date) => {
                                    setEndDate(date.setHours(23, 59, 59, 999));
                                }}
                            />
                        </Form.Group>

                        <Button
                            className="mt-3 mr-3"
                            variant="primary"
                            block
                            style={{ borderRadius: "25px" }}
                            onClick={() => {

                                handleShowModal()
                            }}
                        >
                            Show Data
                        </Button>

                        <Button
                            className="mt-3"
                            variant="primary"
                            block
                            style={{ borderRadius: "25px" }}
                            onClick={handleDownload}
                        >
                            Download
                        </Button>
                    </Form>

                    <Modal
                        className="custom-modal"
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        size="xl"
                        centered
                        style={{ maxWidth: "90%" }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>CSV Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {loadingCsv ? (
                                <Spinner animation="border" />
                            ) : (
                                <div style={{ width: "90%", margin: "auto" }}>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Food Name</th>
                                                <th>Food Category</th>
                                                <th>Store Name</th>
                                                <th>Store Location</th>
                                                <th>Date</th>
                                                <th>Price</th>
                                                <th>Unit Count</th>
                                                <th>Unit Type</th>
                                                <th>Base Quantity</th>
                                                <th>Base Unit</th>
                                                <th>Price Per Unit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {csvData.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.FoodName}</td>
                                                    <td>{row.FoodCategory}</td>
                                                    <td>{row.StoreName}</td>
                                                    <td>{row.StoreLocation}</td>
                                                    <td>{row.Date}</td>
                                                    <td>{row.Price}</td>
                                                    <td>{row.UnitCount}</td>
                                                    <td>{row.UnitType}</td>
                                                    <td>{row.BaseQuantity}</td>
                                                    <td>{row.BaseUnit}</td>
                                                    <td>{row.PricePerUnit}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default HierarchicalSelect;
