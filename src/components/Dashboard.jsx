import React, { useState } from "react";
import locations from "./locations";
import "../index.css";
import Modal from "./Modal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Dashboard = ({ data }) => {
    const [details, setDetails] = useState({
        date: Date,
        data: [],
        coordinates: [],
    });

    const convertTimestampToTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const convertTimestampToDay = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("en-IN", {
            day: "2-digit",
        });
    };

    const [selectedYear, setSelectedYear] = useState("2025");
    const [showModal, setShowModal] = useState(false);

    const selectedFields = [
        "user_name",
        "timestamp",
        "timestamp",
        "place_name",
    ];
    const newFieldNames = {
        user_name: "Name",
        timestamp: "Date",
        timestamp: "Time",
        place_name: "Place",
    };

    const exportToExcelByMonth = (
        data,
        selectedFields,
        fieldNames,
        fileName = "data.xlsx"
    ) => {
        // Group data by month
        const groupedData = data.reduce((acc, item) => {
            const date = new Date(item.timestamp);
            const monthYear = date.toLocaleString("en-IN", {
                month: "long",
                year: "numeric",
            });

            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }

            // Pick only selected fields and rename them
            const filteredItem = selectedFields.reduce((obj, key) => {
                if (key === "timestamp") {
                    obj[fieldNames["date"] || "Date"] =
                        convertTimestampToDay(date); // Extract Date
                    obj[fieldNames["time"] || "Time"] =
                        convertTimestampToTime(date); // Extract Time
                } else {
                    obj[fieldNames[key] || key] = item[key]; // Rename field if a custom name exists
                }
                return obj;
            }, {});

            acc[monthYear].push(filteredItem);
            return acc;
        }, {});

        const workbook = XLSX.utils.book_new();

        // Create a sheet for each month
        Object.entries(groupedData).forEach(([month, records]) => {
            const worksheet = XLSX.utils.json_to_sheet(records);
            XLSX.utils.book_append_sheet(workbook, worksheet, month);
        });

        // Create and save file
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const dataBlob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(dataBlob, fileName);
    };

    // Extract years dynamically from the data
    const uniqueYears = [
        ...new Set(
            locations.map((item) => new Date(item.timestamp).getFullYear()) //data.map
        ),
    ];

    // console.log(">>>>>>>>>>>", uniqueYears);

    // Filter and sort data by month
    const filteredData = locations //data
        .filter(
            (item) =>
                new Date(item.timestamp).getFullYear().toString() ===
                selectedYear
        )
        .reduce((acc, item) => {
            const day = new Date(item.timestamp).toLocaleString("default", {
                day: "2-digit",
                month: "long",
            });
            if (!acc[day]) acc[day] = [];
            acc[day].push(item);
            return acc;
        }, {});

    // console.log(">>>>>>>", filteredData);

    const filteredDetails = Object.entries(filteredData).map(
        ([date, records]) => ({
            date,
            det: records.map(({ user_name, place_name, timestamp }) => ({
                user_name: user_name,
                place: place_name,
                time: convertTimestampToTime(timestamp),
            })),
            coordinates: records.map(({ latitude, longitude }) => ({
                lat: latitude,
                lng: longitude,
            })),
        })
    );

    function handleDetClick(record) {
        setShowModal(true);
        setDetails({
            date: "",
            coordinates: record.coordinates,
            data: record.det,
        });
    }

    function handleCloseClick() {
        setShowModal(false);
    }

    return (
        <div className="dashboard-container mx-auto p-4">
            <div className="dashboard-options mb-4">
                <div>
                    <label className="mr-2 font-bold">
                        Select Year: &nbsp;
                    </label>
                    <select
                        className="p-2 border rounded"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        {uniqueYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() =>
                        exportToExcelByMonth(
                            locations,
                            selectedFields,
                            newFieldNames
                        )
                    }
                >
                    Download Excel
                </button>
            </div>

            {Object.entries(filteredDetails).map(([day, record]) => (
                <div key={day} className="mb-6">
                    <div className="dashboard-entries-container">
                        <div className="dashboard-entries">
                            <p>{record.date}</p>
                            <div>
                                <button
                                    onClick={() => handleDetClick(record)}
                                    className="details-btn"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div
                className="modal-container"
                style={{ visibility: showModal ? "visible" : "hidden" }}
            >
                <div className="modal-wrapper">
                    <div>
                        <Modal data={details} />
                    </div>
                </div>
                <button onClick={handleCloseClick}>Close</button>
            </div>
        </div>
    );
};

export default Dashboard;
