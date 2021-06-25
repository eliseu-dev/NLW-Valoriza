import express, { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub:string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken =  req.headers.authorization
    if(!authToken){
        return res.status(401).end()
    }

    const [,token] = authToken.split(" ")

    try {
        const { sub } = verify(token, "f084a9751bcf08ceb2a68eda5c48eb37") as PayLoad
        req.user_id = sub 

        return next()
    } catch (err) {
        return res.status(401).end()
    }





}