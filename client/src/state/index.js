import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],

}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        // will create number of other actions here will be used later on

        // addToCart: (state, action) => {
        //     state.cart = [...state.cart, action.payload.item];
        // } ,
        addToCart: (state, action) => {
            //If the item exists in the cart or not
            const itemIndex = state.cart.findIndex(item => item.id === action.payload.item.id);

            if (itemIndex >= 0) {
                // Item already exists in the cart, so increase its count
                state.cart[itemIndex].count += action.payload.item.count || 1;
            } else {
                // Item does not exist in the cart, so add it with a count of 1
                state.cart = [...state.cart, { ...action.payload.item, count: 1 }];
            }
        },


        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            });
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            });
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },


    }
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;