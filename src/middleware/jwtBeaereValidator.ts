import { verify } from '@server/utils/jwt';

export const jwtValidator = (req, res, next) => {
    
    try 
    {
        const jwtToken = (req.get("Authorization") || req.get("authorization") || "" ).replace("Bearer ");
        const decoded = verify(jwtToken);
        req.user = decoded;
    } catch (error)
    {
        console.log("JWTMIDDLEWARE: ", error);
        res.status(403).json({ error: "Invalid Token" });
    }
    
    
}