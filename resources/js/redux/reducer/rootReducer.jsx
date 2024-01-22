import { combineReducers } from "redux";
import productReducer from "./ProductReducer";


const rootReducer = combineReducers({
  product: productReducer,

});

export default rootReducer;