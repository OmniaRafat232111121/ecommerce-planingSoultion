import { createSlice } from "@reduxjs/toolkit";
import { StoreProduct } from "../../type";
interface NextState {
    productData: StoreProduct[];
    favoriteData: StoreProduct[];
    allProducts: StoreProduct[];
    userInfo: null | string;
  }
  
  const initialState: NextState = {
    productData: [],
    favoriteData: [],
    allProducts: [],
    userInfo: null,
  }
export const nextSlice = createSlice({
    name:'next',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const newProduct = action.payload;
            const existingProduct = state.productData.find(
              (product) => product._id === newProduct._id
            );
        
            if (existingProduct) {
              existingProduct.quantity += 1;
            } else {
              state.productData.push({
                ...newProduct,
                quantity: 1,
              });
            }
          },
          addToFavorite: (state, action) => {
            const newFavorite = action.payload;
            const existingFavorite = state.favoriteData.find(
              (product) => product._id === newFavorite._id
            );
        
            if (!existingFavorite) {
              state.favoriteData.push(newFavorite);
            }
          },
          removeFromFavorite: (state, action) => {
            const productId = action.payload;
            state.favoriteData = state.favoriteData.filter(
              (product) => product._id !== productId
            );
          },
          deleteFavorite: (state, action) => {
            state.favoriteData = state.favoriteData.filter(
              (item) => item._id !== action.payload
            );
          },
          increaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
              (item: StoreProduct) => item._id === action.payload._id
            );
            existingProduct && existingProduct.quantity++;
          },
          decreaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
              (item: StoreProduct) => item._id === action.payload._id
            );
            if (existingProduct?.quantity === 1) {
              existingProduct.quantity = 1;
            } else {
              existingProduct!.quantity--;
            }
          },
          deleteProduct: (state, action) => {
            state.productData = state.productData.filter(
              (item) => item._id !== action.payload
            );
          },
          resetCart: (state) => {
            state.productData = [];
          },
          resetFavoriteData: (state) => {
            state.favoriteData = [];
          },
          addUser: (state, action) => {
            state.userInfo = action.payload;
          },
          removeUser: (state) => {
            state.userInfo = null;
          },
        

    }
})
export const {addToCart , addToFavorite, removeFromFavorite,deleteFavorite,
  addUser,removeUser,
   increaseQuantity,decreaseQuantity,deleteProduct,resetCart,resetFavoriteData}=nextSlice.actions;
export default nextSlice.reducer;