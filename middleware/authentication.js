import { validateToken } from "../utils/auth.utils.js";
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const cookieToken = req.cookies[cookieName];

    if (!cookieToken) {
      return next(); 
    }

    try {
      const payloadUser = validateToken(cookieToken);
      req.user = payloadUser;
    } catch (error) {
      console.log('Error:', error.message);
    }
    next();
  };
}


function checkForLogin()
{
  return (req, res, next) => {
    if (!req.user) {
      return res.render("login",{error:"You first have to be logged in !!"});
    }
    else{
      next();
    }
  }
}

export {checkForAuthenticationCookie,checkForLogin};
