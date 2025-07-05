import { loginUser, logOutUser } from "@/store/AuthSlice/AuthSlice";
import store from "@/store/store";
import { getRefreshToken } from "@/utils/RefreshTokenSet";
import axios from "axios";
const rootURL = "https://a-restro-api.vercel.app/api/v1" // for production URL
// const rootURL = "http://localhost:5000/api/v1" for development URL

// ------------ defalut instance ----------------------
const instance = axios.create({
    baseURL: rootURL,
})

// ------------------------ ALL INTERCEPTORS HANDLER ---------------------------------

instance.interceptors.request.use((config) => {
  const state = store.getState()
  const token = state.AuthSlice.accessToken;
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});


instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // const refreshToken = localStorage.getItem("refreshToken");
        const refreshToken = getRefreshToken()
        const res = await axios.post(`${rootURL}/refresh`, { refreshToken });

        // ✅ Update token in Redux
        store.dispatch(loginUser({ accessToken: res.data.accessToken }));

        // ✅ Update Authorization header
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return instance(originalRequest); // Retry request
      } catch (err) {
        store.dispatch(logOutUser());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ------------------------ ALL INTERCEPTORS HANDLER ---------------------------------

export const getUserData = async () => {
  try {
    const user = await instance.get("/user");
    return user
  } catch (error) {
    console.log(error);
    
  }
}

export const getAllUserData = async () => {
  const allUser = await instance.get("/all-users");
  return allUser;
}

export const updateUserData = async (data) => {
  const user = await instance.patch("/update-user", data);
  return user
}

export const loggedOutUser = async () => {
  const user = await instance.get("/logout");
  return user
}

// ----------------------------------SEND MESSAGE HANDLERS ------------------------------------------------
export const sendMessage = async (data) => { 
   const message = await axios.post(`${rootURL}/send-message`, data);
   return message;
 }

export const getAllMessages = async () => {
  const allMessages = await instance.get("/all-messages");
  return allMessages;
}

export const getSingleMessage = async (id) => {
  const singleMessage = await instance.get(`/view-message/${id}`);
  return singleMessage;
}

export const deleteMessage = async (id) => {
  const deleteMessage = await instance.delete(`/delete-contact/${id}`);
  return deleteMessage;
}

// ------------------------- ORDERS ----------------------------------------------------

export const orderNow = async (data) => {
  const order = await instance.post("/create-order", data);
  return order;
}

export const getOrders = async () => {
  const order = await instance.get("/get-orders");
  return order;
}

export const getSingleOrder = async (id) => {
  const singleOrder = await instance.get(`/orders/${id}`);
  return singleOrder;
}

export const singleOrderDelete = async (id) => {
  const deleteOrder = await instance.delete(`/delete-order/${id}`);
  return deleteOrder;
}

export const statusOrderUpdate = async (id, data) => {
  const updatedOrderStatus = await instance.patch(`/orders/${id}/status`, data);
  return updatedOrderStatus;
}

export const getOrderStatSales = async () => {
  const dailySalesStats = await instance.get(`/daily-sales`);
  return dailySalesStats;
}

// ------------------------- ORDERS----------------------------------------------------



export const getAllProducts = async (category = null, page = 0) => {

  let allProducts;
  if(category || page){
    allProducts = await axios.get(`${rootURL}/products?category=${category}&page=${page}`)
  }else {
    allProducts = await axios.get(`${rootURL}/products`)
  }
  
  return allProducts;
}

export const getSingleProduct = async (id) => {
  const singleProduct = await axios.get(`${rootURL}/products/${id}`)
  return singleProduct;
}


export const createProduct = async (data) => {
  const createdProduct = await instance.post("/create-product", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return createdProduct;
}

export const updateProduct = async (id, data) => {
  const createdProduct = await instance.put(`/update-product/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return createdProduct;
}


export const deleteProduct = async (id) => {
  const deletedProduct = await instance.delete(`/delete-product/${id}`);
  return deletedProduct;
}

// ----------------- LOGIN or REGISTER USER -------------------

export const loginWithEmailAndPassword = async (data) => { 
  
   const user = await axios.post(`${rootURL}/login`, data);
   return user
 }

export const registerWithEmailAndPassword = async (data) => { 
  
   const user = await axios.post(`${rootURL}/register`, data);
   return user
 }