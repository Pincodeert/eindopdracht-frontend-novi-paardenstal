import {jwtDecode} from "jwt-decode";

function isTokenValid(token) {
    const decodedToken = jwtDecode(token);
    const expirationUnix = decodedToken.exp;
    const now = new Date().getTime();
    const nowUnix = Math.round(now / 1000);

    return expirationUnix - nowUnix > 0;
}

export default isTokenValid;