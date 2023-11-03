import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Form, Button, Container, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap
import Papa from "papaparse";

function AutocompleteComponent() {
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(true); // Loading state
    const [options, setOptions] = useState([]); // State to store fetched options
    const [mode, setMode] = useState("download");

    const [showModal, setShowModal] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [loadingCsv, setLoadingCsv] = useState(false);

    const handleShowModalAll = async () => {
        setShowModal(true);
        setLoadingCsv(true);
        try {
            const response = await fetch(
                "https://ea51-74-12-186-31.ngrok-free.app/api/food/CSVall",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "1",
                    },
                    body: JSON.stringify({
                        foodName: selectedFood[0], // assuming the user selects only one food
                        // store: selectedStore,
                        // startDate: startDate.toISOString().split("T")[0],
                        // endDate: endDate.toISOString().split("T")[0],
                    }),
                }
            );
            const csvText = await response.text();
            const results = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
            });
            console.log(results.data);
            setCsvData(results.data);
        } catch (error) {
            console.error("Failed to fetch CSV data:", error);
        }
        setLoadingCsv(false);
    };

    const handleShowModal = async () => {
        setShowModal(true);
        setLoadingCsv(true);
        try {
            const response = await fetch(
          "https://ea51-74-12-186-31.ngrok-free.app/api/food/CSV",
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "ngrok-skip-browser-warning": "1",
              },
              body: JSON.stringify({
                  foodName: selectedFood[0], // assuming the user selects only one food
                  // store: selectedStore,
                  // startDate: startDate.toISOString().split("T")[0],
                  // endDate: endDate.toISOString().split("T")[0],
              }),
          }
      );
            const csvText = await response.text();
            const results = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
            });
            console.log(results.data);
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
                const response = await fetch(
            "https://ea51-74-12-186-31.ngrok-free.app/api/food/name",
            {
                headers: {
                    "ngrok-skip-browser-warning": "1",
                },
            }
        );
          const rawData = await response.json(); // rawData is the array with duplicates

          let mySet = new Set(rawData);
          let newArray = [...mySet];
          setOptions(newArray);
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
        "https://ea51-74-12-186-31.ngrok-free.app/api/food/CSV",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "1",
            },
            body: JSON.stringify({
                foodName: selectedFood[0], // assuming the user selects only one food
                // store: selectedStore,
                // startDate: startDate.toISOString().split("T")[0],
                // endDate: endDate.toISOString().split("T")[0],
            }),
        }
    );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedFood[0]}.csv`;
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
                    <h3 className="mb-4">Food Name</h3>
                    <Typeahead
                        id="food-typeahead"
                        labelKey="name"
                        onChange={setSelectedFood}
                        options={options}
                        placeholder="Choose a food..."
                        selected={selectedFood}
                    />

                  <Button
                      className="mt-4 mr-3"
                      variant="primary"
                      block
                      style={{ borderRadius: "25px" }}
                      onClick={handleShowModal}
                  >
                      Show Data
                  </Button>

                  <Button
                      className="mt-4"
                      variant="primary"
                      block
                      style={{ borderRadius: "25px" }}
                      onClick={handleDownload}
                  >
                      Download
                  </Button>
              </Card.Body>
          </Card>

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
      </Container>
  );
}

export default AutocompleteComponent;
