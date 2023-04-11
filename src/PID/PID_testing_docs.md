# PID Controller Visualization Guide

This software provides a PID (Proportional, Integral, Derivative) controller visualization tool that simulates and displays the controller's output and its effect on a given process value. The software allows users to adjust the setpoint and PID parameters (Kp, Ki, Kd) in real-time while observing the controller's behavior through an interactive chart.

## Usage

### Input Fields

- **Setpoint**: The desired target value for the process.
- **Process Value**: The current value of the process being controlled. This value will be automatically updated by the simulation based on the output of the PID controller.
- **Kp**: The proportional gain parameter. Determines how aggressively the controller will respond to errors. Higher values lead to faster response times but may cause overshoot or oscillation.
- **Ki**: The integral gain parameter. Affects the controller's ability to eliminate steady-state errors over time. Higher values result in faster error correction but may cause overshoot or oscillation.
- **Kd**: The derivative gain parameter. Dampens the controller's response to rapid changes in error, providing stability. Higher values reduce overshoot and oscillation but may cause the system to respond more slowly.

### Output Fields

- **Output**: The current output of the PID controller.
- **P Output**: The current output contribution of the proportional term.
- **I Output**: The current output contribution of the integral term.
- **D Output**: The current output contribution of the derivative term.

### Chart

The chart displays the process value (red line) and the setpoint (blue horizontal line) over time. The vertical axis represents the process value, while the horizontal axis represents time. The chart updates in real-time as the PID controller adjusts the process value to reach the setpoint.

## How to Use

1. Enter the desired setpoint value in the "Setpoint" input field.
2. Adjust the PID parameters (Kp, Ki, Kd) as needed. Start with small values and increase them gradually to achieve the desired controller behavior.
3. Observe the chart as the PID controller attempts to adjust the process value to match the setpoint. Pay attention to overshoot, oscillation, and steady-state error.
4. Continue adjusting the PID parameters to optimize the controller's performance for your specific application.

## Tips

- When tuning the PID parameters, start by adjusting Kp to achieve a balance between response speed and overshoot. Then, fine-tune Ki to minimize steady-state error, and finally, adjust Kd to improve stability.
- If the system becomes unstable or oscillates, try reducing the Kp, Ki, or Kd values.
- Experiment with different combinations of PID parameters to find the best performance for your specific application.
