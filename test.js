function flattenData(data, depth = 1, parentKey = "", result = {}) {
    Object.keys(data).forEach((key) => {
        let newKey = parentKey ? `${parentKey} > ${key}` : key;
        if (typeof data[key] === "object" && Object.keys(data[key]).length > 0) {
            flattenData(data[key], depth + 1, newKey, result);
        }

        result[key] = {};
    });
    return result;
}

const transformedData = {
    "Meat - Fresh, frozen, processed meats (beef, pork, poultry, etc.)": {
        "Fresh or Frozen Meat": {
            "Fresh or Frozen Beef": {},
            "Fresh or Frozen Pork": {},
            "Other Fresh or Frozen Meat": {},
            "Fresh or Frozen Poultry": {},
        },
        "Processed Meat": { "Ham and Bacon": {}, "Other Processed Meat": {} },
    },
    "Seafood - Fresh, frozen, canned fish and marine products (excluding supplements)":
    {
        Fish: {
            "Fresh or Frozen Fish (including portions and fish sticks)": {},
            "Canned and Other Preserved Fish": {},
        },
        Shellfish: {},
        "Other Fish, Seafood and Other Marine Products": {},
    },
    "Dairy & Eggs - Milk, cheese, butter, and egg-based products": {
        "Dairy Products": {
            "Fresh Milk": {},
            Butter: {},
            Cheese: {},
            "Ice Cream and Related Products": {},
        },
        Eggs: {},
        "Other Dairy Products": {},
    },
    "Bakery & Cereal - Breads, rolls, rice, pasta, breakfast cereals (excluding baby food)":
    {
        "Bakery Products": {
            "Bread, Rolls and Buns": {},
            "Cookies and Crackers": {},
            "Other Bakery Products": {},
        },
        "Cereal Products (excluding baby food)": {
            "Rice and Rice-based Mixes": {},
            "Breakfast Cereal and Other Cereal Products (excluding baby food)": {},
            "Pasta Products": {},
            "Flour and Flour-based Mixes": {},
            "Other Cereal Products": {},
        },
    },
    "Fruits & Nuts - Fresh, dried, canned fruits, juices, nuts, seeds": {
        "Fresh Fruit": {
            Apples: {},
            Oranges: {},
            Bananas: {},
            "Other Fresh Fruit": {},
        },
        "Preserved Fruit and Fruit Preparations": {
            "Fruit Juices": {},
            "Dried Fruit": {},
            "Canned Fruit": {},
            "Other Preserved Fruit and Fruit Preparations": {},
        },
        "Nuts and Seeds": {},
    },
    "Vegetables - Fresh, frozen, dried, canned vegetables, and related preparations":
    {
        "Fresh Vegetables": {
            Potatoes: {},
            Tomatoes: {},
            Lettuce: {},
            "Other Fresh Vegetables": {},
        },
        "Preserved Vegetables and Vegetable Preparations": {
            "Frozen Vegetables": {},
            "Dried Vegetables": {},
            "Canned Vegetables and Other Vegetable Preparations": {},
        },
    },
    "Other Foods & Beverages - Sugar, confectionery, fats, oils, coffee, tea, spices, condiments, non-alcoholic drinks":
    {
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
    },
    "Herbs & Supplements - Fresh, dried herbs, vitamins, dietary supplements": {
        Supplements: {},
        "Fresh Herbs": {},
        "Dried Herbs": {},
        "Other Herbs and Supplements": {},
    },
    "Household Items - Cleaning products, personal care items, pet food, etc": {
        "Household Cleaning Products": {},
        "Personal Care Items": {},
        "Pet Food and Supplies": {},
        "Other Household Items": {},
    },
};

console.log(flattenData(transformedData));
