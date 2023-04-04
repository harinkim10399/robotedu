import numpy as np

#Bicycle Robot Model
############################################################
#THE BICYCLE IS EXACTLY THE SAME AS THE TRICYCLE, WITH L=0
#(the distance between the two back wheels is 0, representing only one wheel)
############################################################
#Input:
#Input Vehicle parameters:
#r = radius of the front wheel
#d = distance between the front wheel and the two back wheels
#L = 0 (only one back wheel)
#Control Input parameters:
#u = front wheel angular velocity
#alpha = steering angle of the front wheel
#Robot State Input parameters
#(x,y) = initial robot position in 2D, measured at the center between the two back wheels
#theta = initial robot orientation, angle counterclockwise from the x-axis

#Output: New robot state
#(x,y) = position in 2D
#theta = angle with respect to the x-axis

#The following input parameters should be reflected in the visualization of the robot model:
#r, alpha, d

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


#this is the only part that's different from the differential drive model
def robotStep(r, d, u, alpha, x, y, theta, t):
    v = u * r                               #linear velocity of the front wheel

    if alpha == 0:                          #driving straight
        [x,y,theta] = straightMotion(v, x, y, theta, t)
    else:
        R = d * np.tan((np.pi/2) - alpha)
        omega = v/np.sqrt(d**2 + R**2)
        ICC = [x - R * np.sin(theta), y + R * np.cos(theta)] #Instantaneous Center of Curvature

        [x,y,theta] = forwardKinematics(R, omega, ICC, x,y, theta, t)

    return [x,y,theta]


def main(x, y, r, d, u, alpha, theta):
    
    robot_path = []

    t = 0
    t_step = 1                       #update rate for the visualization

    #read all the input parameters described above from the user interface

    robot_path.append((x,y))

    loopy = 0
    
    #main loop
    while(loopy < 10):
        t = t+t_step
        [x, y , theta] = robotStep(r, d, u, alpha, x, y, theta, t_step)
        robot_path.append((x,y))
        loopy += 1
        
    print(robot_path)
