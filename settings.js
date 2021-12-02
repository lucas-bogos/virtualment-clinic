require('dotenv').config();

export default (() => {
    return {
        "hostName": process.env.HOST,
        "accessPort": process.env.PORT,
        "sessionSecret": process.env.SESSION_SECRET
    }
}) ();
