import React, { useState } from "react";
import Logo from "../assets/manit_logo.jpg";
import "../index.css";

function Pin({ password, onSuccess }) {
    const [pin, setPin] = useState("");

    function handleFormSubmit(e) {
        e.preventDefault();
    }

    function handlePassChange(e) {
        setPin(e.target.value);
    }

    function handlePassCheck() {
        if (pin === password) {
            onSuccess();
        } else {
            alert("Incorrect Password");
            setPin("");
        }
    }

    return (
        <>
            <div className="home-container">
                <div>
                    <h1>
                        Welcome to{" "}
                        <span style={{ color: "#1b67fe" }}>Pedestrian App</span>{" "}
                        Trends Analysis
                    </h1>
                </div>

                <div className="pin-wrapper">
                    <div className="logo-container">
                        <img
                            src={Logo}
                            alt="Maulana Azad National Institute of Technology, Bhopal"
                            className="logo-img"
                        />
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="pin-container">
                            <input
                                autoFocus
                                className="pin-input"
                                type="password"
                                maxLength="5"
                                value={pin}
                                onChange={handlePassChange}
                            />
                            <button
                                onClick={handlePassCheck}
                                className="pin-submit-btn"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Pin;
