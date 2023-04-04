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

const setpointInput = document.getElementById("setpoint");
const processValueInput = document.getElementById("processValue");
const kpInput = document.getElementById("kp");
const kiInput = document.getElementById("ki");
const kdInput = document.getElementById("kd");
const outputInput = document.getElementById("output");

const pidController = new PIDController(+kpInput.value, +kiInput.value, +kdInput.value);

let previousTime = performance.now();

const chartCanvas = document.getElementById("chart");
const chartCtx = chartCanvas.getContext("2d");
const chartWidth = chartCanvas.width;
const chartHeight = chartCanvas.height;
const chartData = [];

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

    // Draw process value line
    chartCtx.beginPath();
    chartCtx.strokeStyle = "#f00";
    chartCtx.moveTo(0, chartHeight - chartData[0] / setpoint * chartHeight);
    for (let i = 1; i < chartData.length; i++) {
        const x = i / chartData.length * chartWidth;
        const y = chartHeight - chartData[i] / setpoint * chartHeight;
        chartCtx.lineTo(x, y);
    }
    chartCtx.stroke();
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

update();