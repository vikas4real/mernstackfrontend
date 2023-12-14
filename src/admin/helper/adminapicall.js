import { API } from "../../backend";

//<------------Category Calls---------->

//Add Category Call
export const addCategory = (userId, token, category) => {
   return fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//update category
export const updateCategory = (categoryId, userId, token, newName) => {
   return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newName),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// get All Categories Call

export const getAllCategories = () => {
   return fetch(`${API}/categories`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//get category by id
export const getCategoryById = (categoryId) => {
   return fetch(`${API}/category/${categoryId}`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// Delete Category Call
export const deleteCategory = (categoryId, userId, token) => {
   return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//<------------Product Calls---------->

//Add Product Call
export const addProduct = (userId, token, product) => {
   return fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: product,
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// get All Products Call

export const getAllProducts = () => {
   return fetch(`${API}/products`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => {
         console.log(err);
      });
};

// get Single Product Call

export const getProduct = (productId) => {
   return fetch(`${API}/product/${productId}`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//Update Product Call
export const updateProduct = (productId, userId, token, product) => {
   return fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: product,
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// Delete Product Call
export const deleteProduct = (productId, userId, token) => {
   return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//<------- get All Orders --------->

export const getAllOrders = (userId, token) => {
   return fetch(`${API}/${userId}/order/all`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => {
         console.log(err);
      });
};
