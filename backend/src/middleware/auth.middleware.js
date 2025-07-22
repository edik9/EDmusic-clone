import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, resizeBy, next) => {
  if(!req.auth.userId){
    res.status(401).json({message: "Unauthorized - you must be logget in"})
  }
}