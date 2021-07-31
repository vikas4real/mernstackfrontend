import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Mac from "./core/Mac";
import IPhone from "./core/IPhone";
import IPad from "./core/IPad";
import Watch from "./core/Watch";
import Accessories from "./core/Accessories";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "src/user/UserDashboard";
import Profile from "./user/Profile";
import AdminDashboard from "src/user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import UpdateCategory from "./admin/UpdateCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import ManageOrders from "./admin/ManageOrders";
import Cart from "./core/Cart";
import { createOrder } from "./core/helper/orderHelper";
import Orders from "./user/Orders";

const Routes = () => {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/mac" exact component={Mac} />
            <Route path="/iphone" exact component={IPhone} />
            <Route path="/ipad" exact component={IPad} />
            <Route path="/watch" exact component={Watch} />
            <Route path="/accessories" exact component={Accessories} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/cart" exact component={Cart} />

            <AdminRoute
               path="/admin/dashboard"
               exact
               component={AdminDashboard}
            />
            <AdminRoute
               path="/admin/category/create"
               exact
               component={AddCategory}
            />
            <AdminRoute
               path="/admin/categories"
               exact
               component={ManageCategories}
            />
            <AdminRoute
               path="/admin/category/update/:categoryId"
               exact
               component={UpdateCategory}
            />
            <AdminRoute
               path="/admin/product/create"
               exact
               component={AddProduct}
            />
            <AdminRoute
               path="/admin/products"
               exact
               component={ManageProducts}
            />
            <AdminRoute
               path="/admin/product/update/:productId"
               exact
               component={UpdateProduct}
            />
            <AdminRoute path="/admin/orders" exact component={ManageOrders} />

            <PrivateRoute
               path="/user/dashboard"
               exact
               component={UserDashboard}
            />
            <PrivateRoute path="/user/profile" exact component={Profile} />
            <PrivateRoute path="/user/orders" exact component={Orders} />
            <PrivateRoute
               path="/order/create/:userId"
               exact
               component={createOrder}
            />
         </Switch>
      </BrowserRouter>
   );
};
export default Routes;
