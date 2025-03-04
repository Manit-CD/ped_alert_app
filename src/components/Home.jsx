import React, { useEffect } from "react";
import { useState } from "react";
import Pin from "./Pin";
import Content from "./Content";

function Home() {
    const [isPassCorrect, setIsPassCorrect] = useState(false);

    function handleSuccess() {
        setIsPassCorrect(true);
    }

    return (
        <>
            <div className="home-wrapper">
                {isPassCorrect ? (
                    <Content />
                ) : (
                    <Pin password="12345" onSuccess={handleSuccess} />
                )}
            </div>
        </>
    );
}

export default Home;
