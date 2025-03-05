import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Loader from "./Loader";
import "../index.css";

function Content() {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const token = "007c7643f181104371e583667baccece44de71ab";

        fetch("/api/alerts/", {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setData(data);
                setLoader(false);
                setError(false);
            })
            .catch((error) => {
                console.log("---------", error);
                setLoader(false);
                setError(true);
            });
    }, []);

    return (
        <>
            <div className="content-container">
                <h1>Activity Trends</h1>
                {error ? (
                    <div className="error-container">
                        <h3>We encountered an error...</h3>
                        <p>Try Refreshing the page</p>
                    </div>
                ) : loader ? (
                    <Loader />
                ) : (
                    <Dashboard data={data} />
                )}
            </div>
        </>
    );
}

export default Content;
