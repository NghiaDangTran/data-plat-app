import React, { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Card,
    Form,
    Button,
    Container,
    Modal,
    Row,
    Col,
} from "react-bootstrap";
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
const data = Object.keys(groupedOptions)

function AutocompleteComponent() {


    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedFoodName, setSelectedFoodName] = useState("");
    const [seletedCategory, setSelectedCategory] = useState([])
    const [seletedCategoryname, setSelectedCategoryName] = useState("")

    const [storeName, setStoreName] = useState("")
    const [startDate, setStartDate] = useState((new Date()).setHours(0, 0, 0, 0));
    const [endDate, setEndDate] = useState((new Date()).setHours(23, 59, 59, 999));
    const [loading, setLoading] = useState(true); // Loading state
    const [options, setOptions] = useState([]); // State to store fetched options
    const [download, setdownload] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [loadingCsv, setLoadingCsv] = useState(false);
    const [csvStatData, setCsvStatData] = useState([])



    const handleShowModalStat = async () => {
        setShowModal(true);
        setLoadingCsv(true);

        try {
            const response = await fetch(
                "https://laptop-ga134362.tail87d12.ts.net/api/food/compareprice",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "1",
                    },
                    body: JSON.stringify({
                        foodName: selectedFood.length > 0 ? selectedFood[0] : selectedFoodName,
                        categoryName: seletedCategory.length > 0 ? seletedCategory[0] : seletedCategoryname,
                        storeName: storeName,
                        startDate: startDate,
                        endDate: endDate,
                        locationName: selectedProvince,
                    }),
                }
            );

            const dataCsv = await response.json();


            setCsvStatData(dataCsv.stat)
            setCsvData(dataCsv.csv);
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
                "https://laptop-ga134362.tail87d12.ts.net/api/food/CSV"
                ,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "1",
                    },
                    body: JSON.stringify({
                        foodName: selectedFood.length > 0 ? selectedFood[0] : selectedFoodName,
                        categoryName: seletedCategory.length > 0 ? seletedCategory[0] : seletedCategoryname,
                        storeName: storeName,
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
            console.log(results.data)
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
                    "https://laptop-ga134362.tail87d12.ts.net/api/food/searchName",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",

                            "ngrok-skip-browser-warning": "1",
                        },
                    }
                );
                let temp = await response.json()
                let newArray = temp.data
                newArray.sort((a, b) => {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                });
                setOptions(newArray);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    const handleDownload = async () => {
        setdownload(true)
        setShowModal(true)
        const response = await fetch(
            "https://laptop-ga134362.tail87d12.ts.net/api/food/CSV",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "1",
                },
                body: JSON.stringify({
                    foodName: selectedFood.length > 0 ? selectedFood[0] : selectedFoodName,
                    categoryName: seletedCategory.length > 0 ? seletedCategory[0] : seletedCategoryname,
                    storeName: storeName,
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
        setShowModal(false);
    };

    if (loading) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >

                <p >Data Is Loading...</p>

                <Spinner
                    animation="border"
                    role="status"
                    variant="primary"
                    style={{ width: "3rem", height: "3rem" }}
                >
                </Spinner>
            </Container>
        );
    }


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
                            <Typeahead
                                id="food-typeahead"
                                labelKey="name"
                                onChange={(e) => {
                                    setSelectedFood(e)
                                }}
                                options={options}
                                placeholder="All Food"
                                selected={selectedFood}
                                style={{ width: "100%" }}
                                onInputChange={(e) => {
                                    setSelectedFoodName(e)
                                }

                                }


                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column align-items-start">
                            <Form.Label>Food Category:</Form.Label>
                            <Typeahead
                                id="food-typeahead"
                                labelKey="name"
                                onChange={(e) => {
                                    setSelectedCategory(e)
                                }}
                                options={data}
                                placeholder="All Category"
                                selected={seletedCategory}
                                style={{ width: "100%" }}
                                onInputChange={(e) => {
                                    setSelectedCategoryName(e)
                                }

                                }


                            />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex flex-column align-items-start">
                            <Form.Label>Province :</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                            >

                                <option value="">All Province</option>
                                <option value="ontario">Ontario</option>
                                <option value="manitoba">Manitoba</option>
                                <option value="alberta">Alberta</option>
                                <option value="british_columbia">British Columbia</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex flex-column align-items-start">
                            <Form.Label>Store :</Form.Label>
                            <Form.Control
                                as="select"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                            >

                                <option value="">All Store</option>
                                <option value="superstore">superstore</option>
                                <option value="no_frills">no_frills</option>
                                <option value="loblaws">loblaws</option>
                                <option value="maxi">maxi</option>
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
                            onClick={handleShowModal}
                        >
                            Show Data
                        </Button>

                        <Button
                            className="mt-3 mr-3"
                            variant="primary"
                            block
                            style={{ borderRadius: "25px" }}
                            onClick={handleShowModalStat}
                        >
                            Compare Data
                        </Button>

                        <Button
                            className="mt-3"
                            variant="primary"
                            block
                            style={{ borderRadius: "25px" }}
                            onClick={
                                () => {

                                    // setdownload(true)

                                    handleDownload()
                                }
                            }
                        >
                            Download
                        </Button>
                    </Form>

                    <Modal
                        className="custom-modal"
                        show={showModal}
                        onHide={() => {
                            setdownload(false)
                            setShowModal(false)
                            setCsvStatData([])
                        }}
                        size="xl"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>CSV Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {download ? (<span>  Your Data is loading...                               <Spinner animation="border" />
                            </span>) : loadingCsv ? (
                                <span>  Your Data is loading...                               <Spinner animation="border" />
                                </span>
                            ) : (
                                        <>

                                            ({csvStatData.length > 0 && (
                                                <pre>
                                                    {JSON.stringify(csvStatData, null, 2)}
                                                </pre>
                                            )} )

                                            (<div style={{ width: "90%", margin: "auto" }}>
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Food Name</th>
                                                            <th>Search From</th>

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
                                                                <td>{row.SearchFrom}</td>

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
                                            </div>)
                                        </>


                            )
                            }



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

export default AutocompleteComponent;
