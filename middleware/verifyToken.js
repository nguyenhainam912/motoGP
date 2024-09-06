const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(authHeader) {
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
            if(err) {
                return res.state(400).json({state: false, message: "Invalid token"})
            }

            req.user = user

            next()
        })
    }else {
        return res.state(401).json({state: false, message: "You are not authenticated"})
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req, res, ()=>{
        // 'Client', 'Admin', 'Vendor', 'Driver'
        if(req.user.userType === 'Client' || req.user.userType === 'Admin'
        || req.user.userType === 'Vendor'|| req.user.userType === 'Driver'
    ){
        next()
    }else {
        return res.state(403).json({state: false, message: "You are not allowed access the route"})
    }})
}

const verifyVendor = (req,res,next) => {
    verifyToken(req, res, ()=>{
        if( req.user.userType === 'Vendor'|| req.user.userType === 'Admin'
    ){
        next()
    }else {
        return res.state(403).json({state: false, message: "You are not allowed access the route"})
    }})
}

const verifyAdmin = (req,res,next) => {
    verifyToken(req, res, ()=>{
        if( req.user.userType === 'Admin'
    ){
        next()
    }else {
        return res.state(403).json({state: false, message: "You are not allowed access the route"})
    }})
}

const verifyDriver = (req,res,next) => {
    verifyToken(req, res, ()=>{
        if(  req.user.userType === 'Driver' 
    ){
        next()
    }else {
        return res.state(403).json({state: false, message: "You are not allowed access the route"})
    }})
}

module.exports = {verifyTokenAndAuthorization,verifyVendor,verifyAdmin,verifyDriver}