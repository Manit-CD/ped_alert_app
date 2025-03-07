import React, { useState } from "react";
import "../index.css";
import GoogleMapComponent from "./Maps";
import cx from "classnames";

import _ from "lodash";

function Modal({ data }) {
    const [activeTab, setActiveTab] = useState("users");

    const uniquePlaces = [
        ...new Set(data.data.map((location) => location.place)),
    ];

    // const uniqueTime = [
    //     ...new Set(data.data.map((record) => record.time)),
    // ];

    // console.log(">>>>>>>>>>>>>", uniquePlaces);

    return (
        <>
            <div className="">
                <div className="">
                    <h2>Comprehensive Map View</h2>
                    <GoogleMapComponent locations={data.coordinates} />

                    <div className="tab-container">
                        <div className="tabs">
                            <button
                                className={cx("tab-btn", {
                                    active: activeTab === "places",
                                })}
                                onClick={() => setActiveTab("places")}
                            >
                                Places
                            </button>
                            <button
                                className={cx("tab-btn", {
                                    active: activeTab === "users",
                                })}
                                onClick={() => setActiveTab("users")}
                            >
                                Users
                            </button>
                        </div>

                        <div className="tab-content-container">
                            <div className="tab-content">
                                {activeTab === "places" && (
                                    <ul>
                                        {uniquePlaces?.map((item, index) => {
                                            // uniquePlaces.map...
                                            return (
                                                <>
                                                    <div
                                                        key={index}
                                                        className="details-wrapper"
                                                    >
                                                        <div className="details-container">
                                                            <p>{item}</p>
                                                            {/* item */}
                                                        </div>
                                                        <hr />
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </ul>
                                )}
                                {activeTab === "users" && (
                                    <ul>
                                        {data?.data?.map((item, index) => {
                                            return (
                                                <>
                                                    <div
                                                        key={index}
                                                        className="details-wrapper"
                                                    >
                                                        <div className="details-container">
                                                            <div className="user-details">
                                                                <p>
                                                                    {
                                                                        item.user_name
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {item.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
