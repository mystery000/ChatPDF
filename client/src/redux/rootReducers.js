import auth from './auth/authSlice';
import plan from './plan/planSlice';

//Include all the reducer to combine and provide to configure store.

const rootReducer =  {
  auth,
  plan,
}

export default rootReducer;
