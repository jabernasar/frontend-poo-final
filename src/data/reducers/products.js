import {
   GET_ALL_PRODUCTS,
   SET_LOADING_PRODUCTS,
   ORDER_BY_NAME,
   ORDER_BY_PRICE,
   FILTER_BY_CATEGORY,
   RESTART_FILTERS,
   GET_ALL_CATEGORIES,
   SET_OPTIONS,
   RESTART_PRODUCTS,
   SEARCH_BY_NAME,
   PAGINATE_COUNTRIES,
   SET_PAGE
} from "../actions/types";
// import { toast } from "react-toastify";

// Intial State
const initialState = {
   products: [],
   categories: [],
   loadingProducts: false,
   paginatedProducts: [],
   currentProducts: [],
   currentPage: 1,
   filtered: [],
   cart: [],
   options: {
      order: "asc",        // Puede ser: asc o desc
      orderBy: "name",     //Puede ser por: name, price
   }
};

// Reducers REDUX
export default function reducer(state = initialState, action) {
   const {
      type,
      payload
   } = action;

   switch (type) {
      case SET_PAGE:
         return {
            ...state,
            currentPage: payload,
            currentProducts: state.paginatedProducts[payload]
         };
      case SET_LOADING_PRODUCTS:
         return { ...state, loadingProducts: payload };
      case GET_ALL_PRODUCTS:
         return { ...state, products: payload, filtered: payload, loadingProducts: false };
      case GET_ALL_CATEGORIES:
         return { ...state, loadingProducts: false, categories: payload };
      case SET_OPTIONS:
         const { name, value } = payload;
         return { ...state, options: { ...state.options, [name]: value } };
      case FILTER_BY_CATEGORY: //vienen del back ya filtrados
      case SEARCH_BY_NAME:
         return { ...state, filtered: payload, loadingProducts: false };
      case RESTART_FILTERS:
         return { ...state, options: initialState.options };
      case RESTART_PRODUCTS:
         return { ...state, filtered: state.products };
      case PAGINATE_COUNTRIES:
         let filtered = [...state.filtered];
         let paginatedProducts = [];

         if (filtered.length > 0) {
            while (filtered.length > 0) {
               // Poniendo de 10 en 10 cada página
               paginatedProducts.push(filtered.splice(0, 10))
            }
         }
         // Cada que se paginan los productos también establezco la pagina actual como 1
         return { ...state, paginatedProducts, currentProducts: paginatedProducts[0], currentPage: 1 };
      case ORDER_BY_NAME:
      case ORDER_BY_PRICE:
         const { order, orderBy } = state.options;

         if (orderBy === "name") {
            if (order === "asc") {
               filtered = [...state.filtered];
               filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
               return { ...state, filtered };
            } else {
               filtered = [...state.filtered];
               filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
               return { ...state, filtered };
            }
         } else {
            if (order === "asc") {
               filtered = [...state.filtered];
               filtered = filtered.sort((a, b) => a.price - b.price);
               return { ...state, filtered };
            } else {
               filtered = [...state.filtered];
               filtered = filtered.sort((a, b) => b.price - a.price);
               return { ...state, filtered };
            }
         }
      default:
         return { ...state };
   }
}

