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
    processValueInput.value = (+processValueInput.value + output * 0.001).toFixed(2);

    setTimeout(update, 1000 / 20); // Run the update function approximately 60 times per second
}
update();