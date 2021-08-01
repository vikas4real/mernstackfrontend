import { API } from "../../backend";
export const getProducts = () => {
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
export const getProductsMac = () => {
   return fetch(`${API}/mac`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => {
         console.log(err);
      });
};
export const getProductsIphone = () => {
   return fetch(`${API}/iphone`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => {
         console.log(err);
      });
};
export const getProductsIpad = () => {
   return fetch(`${API}/ipad`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => {
         console.log(err);
      });
};
export const getProductsWatch = () => {
   return fetch(`${API}/watch`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => {
         console.log(err);
      });
};
export const getProductsAccessories = () => {
   return fetch(`${API}/accessories`, {
      method: "GET",
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => {
         console.log(err);
      });
};
