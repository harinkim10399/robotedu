class PIDController {
    constructor(kp, ki, kd) {
        this.kp = kp;
        this.ki = ki;
        this.kd = kd;
        this.previousError = 0;
        this.integral = 0;
    }

    update(setpoint, processValue, dt) {
        const error = setpoint - processValue;
        this.integral += error * dt;
        const derivative = (error - this.previousError) / dt;
        const output = this.kp * error + this.ki * this.integral + this.kd * derivative;
        this.previousError = error;
        return output;
    }
}

// Resize the canvas according to its container
function resizeCanvas() {
    chartCanvas.width = chartCanvas.offsetWidth;
    chartCanvas.height = chartCanvas.offsetHeight;
    chartWidth = chartCanvas.width;
    chartHeight = chartCanvas.height;
}

const setpointInput = document.getElementById("setpoint");
const processValueInput = document.getElementById("processValue");
const kpInput = document.getElementById("kp");
const kiInput = document.getElementById("ki");
const kdInput = document.getElementById("kd");
const pOutput = document.getElementById("pOutput");
const iOutput = document.getElementById("iOutput");
const dOutput = document.getElementById("dOutput");
const outputInput = document.getElementById("output");

const pidController = new PIDController(+kpInput.value, +kiInput.value, +kdInput.value);

let previousTime = performance.now();

const chartCanvas = document.getElementById("chart");
const chartCtx = chartCanvas.getContext("2d");
resizeCanvas(); // Call this function to set the initial size of the canvas
const chartData = [];

// Call this function whenever an input value changes
function onInputChange() {
    pidController.kp = +kpInput.value;
    pidController.ki = +kiInput.value;
    pidController.kd = +kdInput.value;
}

// Add event listeners for the inputs
setpointInput.addEventListener("input", onInputChange);
processValueInput.addEventListener("input", onInputChange);
kpInput.addEventListener("input", onInputChange);
kiInput.addEventListener("input", onInputChange);
kdInput.addEventListener("input", onInputChange);


function drawChart() {
    chartCtx.clearRect(0, 0, chartWidth, chartHeight);

    // Draw grid lines
    chartCtx.strokeStyle = "#ddd";
    chartCtx.beginPath();
    for (let x = 0; x <= chartWidth; x += chartWidth / 10) {
        chartCtx.moveTo(x, 0);
        chartCtx.lineTo(x, chartHeight);
    }
    for (let y = 0; y <= chartHeight; y += chartHeight / 10) {
        chartCtx.moveTo(0, y);
        chartCtx.lineTo(chartWidth, y);
    }
    chartCtx.stroke();

    // Calculate maxValue
    const maxValue = Math.max(...chartData, +setpointInput.value) * 1.05; // Ensure maxValue is always greater than setpoint

    // Draw process value line
    chartCtx.beginPath();
    chartCtx.strokeStyle = "#f00";
    chartCtx.moveTo(0, chartHeight - chartData[0] / maxValue * chartHeight);
    for (let i = 1; i < chartData.length; i++) {
        const x = i / chartData.length * chartWidth;
        const y = chartHeight - chartData[i] / maxValue * chartHeight;
        chartCtx.lineTo(x, y);
    }
    chartCtx.stroke();

    // Draw setpoint line
    const setpoint = +setpointInput.value;
    const setpointY = chartHeight - setpoint / maxValue * chartHeight;
    chartCtx.strokeStyle = "#00f";
    chartCtx.beginPath();
    chartCtx.moveTo(0, setpointY);
    chartCtx.lineTo(chartWidth, setpointY);
    chartCtx.stroke();

    // Add axis labels
    chartCtx.font = "14px Arial";
    chartCtx.fillStyle = "#000";
    chartCtx.fillText("Time", chartWidth - 40, chartHeight - 10);
    chartCtx.save();
    chartCtx.rotate(-Math.PI / 2);
    chartCtx.fillText("Process Value", -chartHeight / 2 - 50, 40);
    chartCtx.restore();

    // Add numerical label values for the process value axis
    chartCtx.font = "12px Arial";
    chartCtx.fillStyle = "#000";
    const numOfYLabels = 10;
    for (let i = 0; i <= numOfYLabels; i++) {
        const y = chartHeight - i * (chartHeight / numOfYLabels);
        const value = (i * maxValue / numOfYLabels).toFixed(1);
        chartCtx.fillText(value, 5, y + 4);
    }
}
function update() {
    const currentTime = performance.now();
    const dt = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    const setpoint = +setpointInput.value;
    const processValue = +processValueInput.value;
    pidController.kp = +kpInput.value;
    pidController.ki = +kiInput.value;
    pidController.kd = +kdInput.value;

    const error = setpoint - processValue;
    const derivative = (error - pidController.previousError) / dt;

    const pTerm = pidController.kp * error;
    const iTerm = pidController.ki * pidController.integral;
    const dTerm = pidController.kd * derivative;

    pOutput.textContent = pTerm.toFixed(2);
    iOutput.textContent = iTerm.toFixed(2);
    dOutput.textContent = dTerm.toFixed(2);

    const output = pidController.update(setpoint, processValue, dt);
    outputInput.value = output.toFixed(2);

    // This line simulates a process value change based on the output.
    // You can modify the factor (0.001) to control the rate of change.
    processValueInput.value = (+processValueInput.value + output * 0.1).toFixed(2);

    // Update and draw chart
    chartData.push(+processValueInput.value);
    if (chartData.length > chartWidth) {
        chartData.shift();
    }
    drawChart();

    setTimeout(update, 1000 / 60); // Run the update function approximately 60 times per second
}

// Listen for window resize events to update the canvas size
window.addEventListener("resize", () => {
    resizeCanvas();
    drawChart(); // Redraw the chart after resizing the canvas
});


update();