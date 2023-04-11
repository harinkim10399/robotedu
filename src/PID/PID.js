import React, { useState } from "react";

function PIDController() {
    const [kp, setKp] = useState(0);
    const [ki, setKi] = useState(0);
    const [kd, setKd] = useState(0);
    const [setpoint, setSetpoint] = useState(0);
    const [processValue, setProcessValue] = useState(0);
    const [output, setOutput] = useState(0);
    let sumError = 0;
    let lastError = 0;

    function calculateOutput() {
        const error = setpoint - processValue;
        const pTerm = kp * error;
        const iTerm = ki * (error + sumError);
        const dTerm = kd * (error - lastError);

        sumError += error;
        lastError = error;

        const newOutput = pTerm + iTerm + dTerm;
        setOutput(newOutput);
    }

    return (
        <div>
            <h1>PID Controller</h1>
            <div>
                <label htmlFor="kp">Kp:</label>
                <input
                    type="number"
                    id="kp"
                    value={kp}
                    onChange={(e) => setKp(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="ki">Ki:</label>
                <input
                    type="number"
                    id="ki"
                    value={ki}
                    onChange={(e) => setKi(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="kd">Kd:</label>
                <input
                    type="number"
                    id="kd"
                    value={kd}
                    onChange={(e) => setKd(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="setpoint">Setpoint:</label>
                <input
                    type="number"
                    id="setpoint"
                    value={setpoint}
                    onChange={(e) => setSetpoint(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="processValue">Process Value:</label>
                <input
                    type="number"
                    id="processValue"
                    value={processValue}
                    onChange={(e) => setProcessValue(e.target.value)}
                />
            </div>
            <button onClick={calculateOutput}>Calculate Output</button>
            <div>
                <label htmlFor="output">Output:</label>
                <input type="number" id="output" value={output} readOnly />
            </div>
        </div>
    );
}

export default PIDController;