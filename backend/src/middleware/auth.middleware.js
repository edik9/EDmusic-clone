import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, resizeBy, next) => {
  if(!req.auth.userId){
    return res.status(401).json({message: "Unauthorized - you must be logget in"})
  }
  next()
}

export const requireAdmin = async(req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId)
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress

    if(!isAdmin) {
      return res.status(403).json({ message: "Unauthorized - you must be admin"})
    }

    next()
  } catch (error) {
    next(error)
  }
}