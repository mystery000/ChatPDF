import app from "./app/appSlice";
import auth from "./auth/authSlice";
import plan from "./plan/planSlice";
import source from "./source/sourceSlice";
import message from "./message/messageSlice";
import document from "./document/documentSlice";
//Include all the reducer to combine and provide to configure store.

const rootReducer = {
    app,
    auth,
    plan,
    source,
    message,
    document,
};

export default rootReducer;
