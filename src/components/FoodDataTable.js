import React from 'react';

const FoodDataTable = ({ csvData }) => {
    // Extract unique dates from the csvData
    const uniqueDates = Array.from(new Set(csvData.flatMap(row => Object.keys(row).filter(key => key.includes('Date')))));

    // Generate table headers
    const headers = ['Food Name', ...uniqueDates];

    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {csvData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.FoodName}</td>
                            {uniqueDates.map((date, index) => (
                                <td key={index}>{row[date]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FoodDataTable;
