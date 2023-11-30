import React, { useEffect, useState } from "react";
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

function AutocompleteComponent() {
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [startDate, setStartDate] = useState((new Date()).setHours(0, 0, 0, 0));
    const [endDate, setEndDate] = useState((new Date()).setHours(23, 59, 59, 999));
    const [loading, setLoading] = useState(true); // Loading state
    const [options, setOptions] = useState([]); // State to store fetched options
    const [mode, setMode] = useState("download");
    const [selectedProvince, setSelectedProvince] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [loadingCsv, setLoadingCsv] = useState(false);

    const handleShowModalAll = async () => {
        setShowModal(true);
        setLoadingCsv(true);
        try {
            const response = await fetch(
                "https://d8ad-76-64-103-207.ngrok-free.app/api/food/CSVall",
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
            // console.log(results.data);
            setCsvData(results.data);
        } catch (error) {
            console.error("Failed to fetch CSV data:", error);
        }
        setLoadingCsv(false);
    };

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
                "https://d8ad-76-64-103-207.ngrok-free.app/api/food/CSV",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "1",
                    },
                    body: JSON.stringify({
                        foodName: selectedFood[0], // assuming the user selects only one food
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
            // console.log(results.data);
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
                // const response = await fetch(
                //     "https://d8ad-76-64-103-207.ngrok-free.app/api/food/name",
                //     {
                //         headers: {
                //             "ngrok-skip-browser-warning": "1",
                //         },
                //     }
                // );
                // const rawData = await response.json(); // rawData is the array with duplicates

                let mySet = new Set([
                    "Shrimp cocktail",
                    "Soft Drinks",
                    "Sunflower seeds",
                    "Eggs",
                    "Peanuts",
                    "Spinach",
                    "Macadamia Nuts",
                    "Pasta",
                    "Brown Sugar",
                    "Sourdough Bread",
                    "Peanut butter",
                    "Sunflower Oil",
                    "Honey",
                    "Granola",
                    "Tilapia Fillets",
                    "Disposable Plates",
                    "Candied Fruit",
                    "Block cheese",
                    "Pears",
                    "Celery",
                    "Cayenne Pepper",
                    "Balsamic Vinegar",
                    "Turkey Stock",
                    "White Sugar",
                    "Lasagna Noodles",
                    "Wieners",
                    "Beef Gravy",
                    "Sparkling Wine",
                    "White rice",
                    "Protein Bars",
                    "Chicken drumsticks",
                    "Frozen french fried potatoes",
                    "Brussels Sprouts",
                    "Avocado",
                    "Parsnips",
                    "White bread",
                    "Vegetable Broth",
                    "White Wine",
                    "Raisins",
                    "Coconut Sugar",
                    "Jasmine Rice",
                    "Frozen broccoli",
                    "Frozen mixed vegetables",
                    "Chicken",
                    "Heavy Cream",
                    "Ice Cream",
                    "Beef stewing cuts",
                    "Pork rib cuts",
                    "Butter",
                    "Fresh Turkey",
                    "Cinnamon",
                    "Body Wash",
                    "Coconut Milk",
                    "Dried lentils",
                    "Cottage Cheese",
                    "Hot Sauce",
                    "Whole chicken",
                    "Cranberries",
                    "Shampoo",
                    "Brandy",
                    "Pepper",
                    "Frozen corn",
                    "Frozen Shrimp",
                    "Salad Dressing",
                    "Wheat flour",
                    "Beer",
                    "Paprika",
                    "Champagne",
                    "Salsa",
                    "Fresh Cranberries",
                    "Canned tuna",
                    "Vegetable Oil",
                    "Suet",
                    "Bell Peppers",
                    "Bay Leaves",
                    "Deodorant",
                    "Pork loin cuts",
                    "Cantaloupe",
                    "Whole-grain vegetable pizza",
                    "Sultanas",
                    "Almonds",
                    "Turkey breasts",
                    "Halloween candies",
                    "Lobster",
                    "Flatbread and pita",
                    "Party Platters",
                    "Mulled Wine Ingredients",
                    "Mangoes",
                    "Parsley",
                    "Sesame Oil",
                    "Rolls",
                    "Oranges",
                    "Half Ham",
                    "English muffins",
                    "Dijon Mustard",
                    "Chocolate Chips",
                    "Hot Chocolate",
                    "Mulled Wine",
                    "Fruitcake",
                    "Thyme",
                    "Rosemary",
                    "Diced or whole peeled tomatoes",
                    "Rice",
                    "Whole Grain Mustard",
                    "Whole Ham",
                    "Roasted or ground coffee",
                    "Beef for Roasts",
                    "Canned beans and lentils",
                    "Beef top sirloin cuts",
                    "Frozen shrimp",
                    "Cocoa Powder",
                    "Toilet Paper",
                    "Olive Oil",
                    "Cookies and sweet biscuits",
                    "Tomato Soup",
                    "Brown rice",
                    "Granola Bars",
                    "Cereal",
                    "Yogurt",
                    "Pasta",
                    "Coconut Water",
                    "Canned tomatoes",
                    "Ketchup",
                    "Salad greens",
                    "Candy Canes",
                    "Beef Stock",
                    "Bananas",
                    "Limes",
                    "Reusable Containers",
                    "Mushrooms",
                    "Sugar",
                    "Beef Drippings",
                    "Star Anise",
                    "Olives",
                    "Dried Lentils",
                    "Beef rib cuts",
                    "Whole Wheat Pasta",
                    "Panko Bread Crumbs",
                    "Rum",
                    "Crackers and crisp breads",
                    "Cranberry Sauce",
                    "Hand Soap",
                    "Apples",
                    "Iceberg lettuce",
                    "Sparkling Grape Juice",
                    "Frozen Berries",
                    "Lemons",
                    "Frozen peas",
                    "Cashews",
                    "Beef for Stews",
                    "Squash",
                    "Sweet potatoes",
                    "Orange Juice",
                    "Mozzarella Cheese",
                    "Quinoa",
                    "English Muffins",
                    "Halibut",
                    "Chicken thigh",
                    "Turkey Bacon",
                    "Mustard",
                    "Tofu",
                    "Canola oil",
                    "Cucumbers",
                    "Fresh Shrimp",
                    "Disposable Cups",
                    "Bread Cubes",
                    "Canned baked beans",
                    "Baking Soda",
                    "Ham",
                    "Cream Cheese",
                    "Christmas Cookies",
                    "Almond Butter",
                    "Potatoes",
                    "Frozen Cranberries",
                    "Beef Striploin cuts",
                    "Parchment Paper",
                    "Spices",
                    "Frozen green beans",
                    "Wild Rice",
                    "Juices",
                    "Chicken breasts",
                    "Barbecue sauce",
                    "Romaine lettuce",
                    "Pretzels",
                    "Bread Crumbs",
                    "Milk",
                    "Chips",
                    "Frozen pizza",
                    "Aluminum Foil",
                    "Feta Cheese",
                    "Cilantro",
                    "Hoisin Sauce",
                    "Soy milk",
                    "Festive Decorations",
                    "Cabbage",
                    "Peppers",
                    "Cherry Tomatoes",
                    "Flaxseeds",
                    "Tomatoes",
                    "Mixed Greens",
                    "Chia Seeds",
                    "Party Snacks",
                    "Whole-grain pasta",
                    "Frozen Vegetables",
                    "Salt",
                    "Vinegar",
                    "Blueberries",
                    "Variety of Cheeses",
                    "Basil",
                    "Smoked Salmon",
                    "Fresh salmon",
                    "Salad",
                    "Nonfat cooking spray",
                    "Whiskey",
                    "Extra Virgin Olive Oil",
                    "Pork shoulder cuts",
                    "Garlic",
                    "Whipped Cream",
                    "Dry beans and legumes",
                    "Chicken Stock",
                    "Wine for Mulled Wine",
                    "Pasta sauce",
                    "Hazelnuts",
                    "Oatmeal",
                    "Canned corn",
                    "Bottled Water",
                    "Vanilla Extract",
                    "Firm tofu",
                    "Sage",
                    "Chocolate",
                    "Baking Yeast",
                    "Extra Virgin Olive Oil Spray",
                    "Nut milk",
                    "Frozen strawberries",
                    "Baby food",
                    "Strawberries",
                    "Salmon Fillets",
                    "Frozen salmon",
                    "Barbecue Sauce",
                    "Laundry Detergent",
                    "Laundry detergent",
                    "Mincemeat",
                    "Onions",
                    "Broccoli",
                    "Tomato sauce",
                    "Bagels",
                    "Bread",
                    "Eggnog",
                    "Halloween Candy",
                    "Chicken Broth",
                    "Whole Turkey",
                    "Brownie Mix",
                    "Shortbread",
                    "Holiday Lights",
                    "Brown Rice Cakes",
                    "Tea (20 bags)",
                    "Mangos",
                    "Apple juice",
                    "Crackers",
                    "Maple Syrup",
                    "Cumin",
                    "Vodka",
                    "Tortillas",
                    "Toothpaste",
                    "Dried Blueberries",
                    "Ground Beef",
                    "Sea Salt",
                    "Yeast",
                    "Red Wine",
                    "Vegetable Stock",
                    "Canned soup",
                    "Grapes",
                    "Lettuce",
                    "Canola Oil",
                    "Oil",
                    "Canned peach",
                    "Flour",
                    "Sweet Corn",
                    "Coffee",
                    "Pickles",
                    "Bacon",
                    "Ground Pork",
                    "Carrots",
                    "Currants",
                    "Skinless chicken",
                    "Sausage",
                    "Chives",
                    "Apple Cider Vinegar",
                    "Canned Vegetables",
                    "Fresh Turkey Breast",
                    "Decorating Icings",
                    "Pie Crusts",
                    "Pumpkin Seeds",
                    "Whole-grain crackers",
                    "Conditioner",
                    "Boneless Chicken",
                    "Baking Powder",
                    "Hummus",
                    "Whole-grain waffles",
                    "Nuts",
                    "Meatless burgers",
                    "Tea",
                    "Soy Milk",
                    "Skim or low-fat milk or soymilk",
                    "Sparkling water",
                    "Canned salmon",
                    "Cornstarch",
                    "Sliced Peaches",
                    "Dried Beans",
                    "Jarred capers and olives",
                    "Grains",
                    "Frozen spinach",
                    "Canned pear",
                    "Mascarpone Cheese",
                    "Mayonnaise",
                    "Dried Fruits",
                    "Disposable Utensils",
                    "Parmesan Cheese",
                    "Dry or fresh pasta",
                    "Powdered Sugar",
                    "Sprinkles",
                    "Margarine",
                    "Plastic Wrap",
                    "Pizza Sauce",
                    "Cloves",
                    "Infant formula",
                    "Coconut",
                    "Roast Turkey",
                    "Stuffed Turkey",
                    "Stuffed Chicken",
                    "Gravy",
                    "Mashed Potatoes",
                    "Roasted Vegetables",
                    "Yorkshire Pudding",
                    "Tourtière",
                    "Baked Ham",
                    "Christmas Pudding",
                    "Mincemeat Pie",
                ]);
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
            "https://d8ad-76-64-103-207.ngrok-free.app/api/food/CSV",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "1",
                },
                body: JSON.stringify({
                    foodName: selectedFood[0], // assuming the user selects only one food
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
                            <Form.Label>Food Name:</Form.Label>
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
                                    console.log(date)
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

export default AutocompleteComponent;
