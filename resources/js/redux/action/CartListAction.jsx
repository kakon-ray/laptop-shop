import { ADD_CARTLIST,GET_CARTLIST,DELETE_CARTLIST,UPDATE_QUANTITY} from "../ActionType"


export const postCartList = (product) => {
    return {
        type: ADD_CARTLIST,
        payload: product
    }
}
export const getCartList = (data) => {
    return {
        type: GET_CARTLIST,
        payload: data
    }
}
export const deleteCartList = (id) => {
    return {
        type: DELETE_CARTLIST,
        payload: id
    }
}

export const update_cartqunatity = (id) => {
    return {
        type: UPDATE_QUANTITY,
        payload: id
    }
}
