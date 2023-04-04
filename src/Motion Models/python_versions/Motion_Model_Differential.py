import numpy as np
#Differential Drive Robot Model
#Input:
#Input Vehicle parameters:
#r_l = radius of the left wheel
#r_r = radius of the right wheel
#L = distance between the two wheels
#Control Input parameters:
#u_l = left wheel angular velocity
#u_r = right wheel angular velocity
#Robot State Input parameters
#(x,y) = initial robot position in 2D, measured at the center between the two wheels
#theta = initial robot orientation, angle counterclockwise from the x-axis

#Output: New robot state
#(x,y) = position in 2D
#theta = angle with respect to the x-axis

#The following input parameters should be reflected in the visualization of the robot model:
#r_l, r_r, L


#this method is the same for all robot models
def forwardKinematics(R, omega, ICC, x, y, theta, t):
    x_new = (np.cos(omega * t) * (x - ICC[0])) + (-np.sin(omega * t) * (y - ICC[1])) + ICC[0]
    y_new = (np.sin(omega * t) * (x - ICC[0])) + (np.cos(omega * t) * (y - ICC[1])) + ICC[1]
    theta_new = theta + (omega * t)
    return [x_new, y_new, theta_new]

#this method is the same for all robot models
def straightMotion(v, x, y, theta, t):
    x_new = x + (v * t * np.cos(theta))
    y_new = y + (v * t * np.sin(theta))
    theta_new = theta
    return [x_new, y_new, theta_new]


#one step of the robot's motion
def robotStep(r_l, r_r, L, u_l, u_r, x, y, theta, t):
    v_l = u_l * r_l                                  #linear velocity of the left wheel
    v_r = u_r * r_r                                  #linear velocity of the right wheel

    if v_l == v_r:                                   #driving straight
        [x,y,theta] = straightMotion(v_l, x, y, theta, t)

    else:
        R = (L/2) * (v_l + v_r)/(v_r - v_l)
        omega = (v_r - v_l)/L
        ICC = [x - R * np.sin(theta), y + R * np.cos(theta)] #Instantaneous Center of Curvature

        [x,y,theta] = forwardKinematics(R, omega, ICC, x,y, theta, t)

    return [x,y,theta]


def main(r_l, r_r, L, u_l, u_r, x, y, theta):

    robot_path = []

    t = 0
    t_step = 0.1                                       #update rate for the visualization

    #read all the input parameters described above from the user interface

    robot_path.append((x,y))

    #main loop
    loopy = 0
    
    
    while(loopy < 100):
        t = t+t_step
        [x, y , theta] = robotStep(r_l, r_r, L, u_l, u_r, x, y, theta, t_step)
        robot_path.append((x,y))
        loopy += 1;
        
    print(robot_path)
