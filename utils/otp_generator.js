function generateOtp () {
    const otp = Math.floor(10000 + Math.random() * 900000)

    return otp.toString().substring(0, 6)
}

module.exports = generateOtp