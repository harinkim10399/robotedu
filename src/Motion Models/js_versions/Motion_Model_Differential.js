class diff {
    constructor (r_l, r_r, L, u_l, u_r, x, y, theta) {
        this.r_l = r_l;
        this.r_r = r_r;
        this.L = L;
        this.u_l = u_l;
        this.u_r = u_r;
        this.x = x;
        this.y = y;
        this.theta = theta;
        this.time = 0;
        this.t_step = 0.1;
    }

    // motion of model when wheel speeds are different based in robotStep
    forwardKinematics (R, omega, ICC, x, y, theta, t) {
        // matrix multiplication linearly to find rotation
        let x_new = (Math.cos(omega * t) * (x - ICC[0])) + (-Math.sin(omega * t) * (y - ICC[1])) + ICC[0];
        let y_new = (Math.sin(omega * t) * (x - ICC[0])) + (Math.cos(omega * t) * (y - ICC[1])) + ICC[1];
        let theta_new = theta + (omega * t);
        return [x_new, y_new, theta_new];
    }
    
    // motion of wheels when velocities are the same in both wheels
    straightMotion (v, x, y, theta, t) {
        let x_new = x + (v * t * Math.cos(theta));
        let y_new = y + (v * t * Math.sin(theta));
        return [x_new, y_new, theta];
    }
    
    // theoretical step the robot takes once called
    robotStep (r_l, r_r, L, u_l, u_r, x, y, theta, t) {
        // tangental velocities on the horizantal surface which it moves
        let v_l = u_l * r_l;
        let v_r = u_r * r_r;
    
        // no need for pi check like others
        // turn no based on single wheel
        if (v_l == v_r) {
            return this.straightMotion(v_l, x, y, theta, t);
        }

        
        // find turning radius of motion
        let R = (L/2) * (v_l + v_r)/(v_r - v_l);
        // angular speed of "particle" moving around the ICC
        let omega = (v_r - v_l)/L;
        // point used for center of "orbit" for motion model
        let ICC = [x - R * Math.sin(theta), y + R * Math.cos(theta)];
    
        return this.forwardKinematics(R, omega, ICC, x,y, theta, t);

    }
    
    main () {
        // total time that has passed
        this.time += this.t_step;
        // result in coordinates and theta (angle from horizantal)
        let result = this.robotStep(this.r_l, this.r_r, this.L, this.u_l, this.u_r, this.x, this.y, this.theta, this.t_step);
        // update x, y, and theta
        [this.x, this.y, this.theta] = result;
        console.log(result)
        return result;
    }



}
export default diff;