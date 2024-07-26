import jwt from "jsonwebtoken";
import "dotenv/config.js"; // import dotenv to use process.env
import User from "../models/User.js";
import connection from "../../config/db/index.js";


class Auth {
    static createJWTToken(email) {
        const payLoad =  {
            email: email
        };

        const options = {
            expiresIn: '1h',
            algorithm: 'HS256'
        };

        const token = jwt.sign(payLoad, process.env.SECRET_KEY, options);
        console.log(`Token: ${token}`);
        return token;
    }

    // verify token
    static verifyJWTToken = (req, res, next) => {
        // get token from http header Authorization
        let token = null;
        const authHeader = req.headers['authorization']; console.log(`AuthHeader: ${authHeader}`);
        if(authHeader != null) 
        {
            token = authHeader && authHeader.split(' ')[1]; console.log(`Token from Header: ${token}`);
        } else {
            // get token from http cookie
            token = req.cookies.token; console.log(`Token from Cookie: ${token}`);
        }
        if(token == null) return res.status(401).json({ message: 'Unauthorized' });

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                console.log(`Decoded: ${decoded}`);
                req.email = decoded.email; 
                console.log(`Email: ${req.email}`);
                next();
            }
        });
    }

    static verifyAdmin = async (req, res, next) => {
        connection.connect().then(async (db) => {   
            try {
                const userEmail = req.email; // Lấy địa chỉ email từ request
                const user = await User.findByEmail(db, userEmail); // Lấy thông tin người dùng từ cơ sở dữ liệu
                console.log(user);
                if (!user || user.role !== 'admin') {
                    return res.status(403).json({ message: 'Không phải admin đòi dô' });
                }
                // Nếu người dùng có vai trò là admin, tiếp tục đến middleware tiếp theo
                next();
            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        };
    }


export default Auth;