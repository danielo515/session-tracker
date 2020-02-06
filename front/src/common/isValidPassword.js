const passwordRejex = /[!@#$%^&a-zA-Z0-9 ]{8,}/
const isValidPassword = (password) => passwordRejex.test(password)
export default isValidPassword