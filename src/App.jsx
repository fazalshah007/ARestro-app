import {  Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllProducts, getUserData } from "./http/AllRequestFromServer"
import { userDataFromServer } from "./store/AuthSlice/AuthSlice"
import { fetchedAllProducts } from "./store/ProductSlice/ProductSlice"
import SpinnerDemo from "./components/customized/spinner/spinner-01"
import { toast } from "react-toastify"
import {
    LoginForm,
    SignupForm,

    AuthLayouts,
    MainLayout,

    Home,
    Orders,
    Cart,
    Account,
    AllProducts,
    SingleProduct,

    Dashboard,
    CheckOut,
    NotFound,
    DashboardStats,
    DashboardProductTable,

    ContactTable,
    ViewMessage,

    AllUsers,

    ViewAllOrders,
    ViewSingleOrder,

    CreateProduct,
    EditProduct
} from "./pages"


const App = () => {

  const [loading, setLoading] = useState(true)

  const state = useSelector(state => state.AuthSlice)
  const stateProduct = useSelector(state => state.productSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    
    ; (async () => {
      try {

        const allProductsFetched = await getAllProducts()
        dispatch(fetchedAllProducts(allProductsFetched.data.data))


      } catch (error) {
        toast.error(`${error?.response?.data?.message || error?.message == "Network Error" ? "Server Connection Error" : error?.message }`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        console.log(error);

      }
    })()
  }, [stateProduct?.updateComponent])

  useEffect(() => {



    ; (async () => {
      try {
        const response = await getUserData()

        dispatch(userDataFromServer(response?.data))
        setLoading(false)

      } catch (error) {

        setLoading(false)
        // console.log(error.response.data.message);

      }
    })()
  }, [state?.isAuthUser])


  if (loading) {
    return (
      <SpinnerDemo />
    )
  }

  return (
    <>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home products={stateProduct.products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<AllProducts products={stateProduct.products} />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>
        <Route element={<ProtectedRoute state={state} allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardStats />} />
            <Route path="products" element={<DashboardProductTable />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="orders" element={<ViewAllOrders />} />
            <Route path="view-order/:id" element={<ViewSingleOrder />} />
            <Route path="contacts" element={<ContactTable />} />
            <Route path="view-message/:id" element={<ViewMessage />} />
          </Route>

        </Route>
        <Route element={<ProtectedRoute state={state} allowedRoles={["customer"]} />}>
          <Route path="/checkout" element={<CheckOut />} />
          <Route element={<MainLayout />}>
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>
        <Route path="/login" element={
          <AuthLayouts state={state} allowedRoles={["admin"]}>
            <LoginForm />
          </AuthLayouts>
        } />
        <Route path="/signup" element={
          <AuthLayouts state={state} allowedRoles={["admin"]}>
            <SignupForm />
          </AuthLayouts>
        } />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </>
  )
}

export default App
