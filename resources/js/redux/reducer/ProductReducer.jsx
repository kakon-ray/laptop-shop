
import Swal from "sweetalert2"
import { GET_PRODUCT, ADD_PRODUCT, GET_CARTLIST, DELETE_PORDUCT, DELETE_CARTLIST, UPDATE_PORDUCT,UPDATE_QUANTITY, ADD_CARTLIST } from "../ActionType"

const initialState = {
    cart: [],
    product: [],

}


const productReducer = (state = initialState, action) => {
    const selectedProduct = state.cart.filter(item => item.id === action.payload.id)
    const updateProduct = state.product.filter(item => item.id != action.payload.id)

    switch (action.type) {

        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }

        case ADD_PRODUCT:
            return {
                ...state,
                product: [...state.product, action.payload]
            }

        case DELETE_PORDUCT:
            return {
                ...state,
                product: state.product.filter(
                    (item) => item.id !== action.payload
                ),
            }

        case UPDATE_PORDUCT:
            return {
                ...state,
                product: [...updateProduct, action.payload]

            }

        case GET_CARTLIST:
            return {
                ...state,
                cart: action.payload
            }

        case ADD_CARTLIST:
            if (selectedProduct.length) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Already added to Cart',
                    showConfirmButton: false,
                    timer: 1500
                })

                return {
                    ...state,
                    cart: [...state.cart]
                }

            }
            else {
                localStorage.setItem('cart', JSON.stringify([...state.cart, { ...action.payload, quantity: 1 }]));
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'This product has Successfully added',
                    showConfirmButton: false,
                    timer: 1500
                })
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: 1 }]
                }
            }

        case DELETE_CARTLIST:
            const newCart = state.cart.filter(
                (item) => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(newCart));

            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Delete Cart Item',
                showConfirmButton: false,
                timer: 1500
            })
            return {
                ...state,
                cart: state.cart.filter(
                    (item) => item.id !== action.payload
                ),
            }

        case UPDATE_QUANTITY:
            const cartlist = state.cart.map(item =>
                item.id == action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

            localStorage.setItem('cart', JSON.stringify(cartlist));
            return {

                ...state,
                cart: [...cartlist]
            }

        default:
            return state
    }
}

export default productReducer