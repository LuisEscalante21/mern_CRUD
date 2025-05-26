import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config.js';

export const validateAuthToken = (allowedUserTypes = []) => {
 return (req, res, next) => {
        try {
            if (!req.cookies){
            return res.json({ message: 'No token provided' });
            }

            const { authToken } = req.cookies;
            
            const decoded = jsonwebtoken.verify(authToken, config.JWT_SECRET);

            req.user = decoded;

            if(!allowedUserTypes.includes(decoded.userType)) {
                return res.json({ message: 'access denied' });
            }

            next()
            
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}

   