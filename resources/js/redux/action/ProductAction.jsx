import { GET_PRODUCT, ADD_PRODUCT,DELETE_PORDUCT,UPDATE_PORDUCT} from "../ActionType"


export const postProduct = (data) => {
    return {
        type: ADD_PRODUCT,
        payload: data
    }
}
export const getProduct = (data) => {
    return {
        type: GET_PRODUCT,
        payload: data
    }
}
export const deleteProduct = (data) => {
    return {
        type: DELETE_PORDUCT,
        payload: data
    }
}
export const updateProduct = (data) => {
    return {
        type: UPDATE_PORDUCT,
        payload: data
    }
}
