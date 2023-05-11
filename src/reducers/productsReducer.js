import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    fetchProducts(state, action) {
      state.products = action.payload;
    },
    updateProduct(state, action) {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex !== -1) {
        state.products[productIndex].name = action.payload.name;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    addProduct(state, action) {
      const newProduct = action.payload;
      state.products = [...state.products, newProduct];
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    deleteProduct(state, action) {
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.products = filteredProducts;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

export const { fetchProducts, updateProduct, addProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
