const userNamePattern = /^[a-zA-Z0-9_.-]{4,20}$/;
const passwordPattern ="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
const userEmailPattern=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

export { userNamePattern, passwordPattern,userEmailPattern };