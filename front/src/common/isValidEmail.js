const emailRejex = /[^@]+@[^.@]+\..+/;
const isValidEmail = (email = '') => emailRejex.test(email);
export default isValidEmail;
