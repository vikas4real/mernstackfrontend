import { API } from "../../backend";

//<---------- Get All Orders ------------->
export const getAllUserOrders = (userId, token) => {
   return fetch(`${API}/${userId}/orders`, {
      method: "GET",
      headers: {
         Accept: "application/json",
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

//<----- Update Profile Helper -------->
export const updateProfile = (userId, token) => {
   return fetch(`${API}/user/update/${userId}`, {
      method: "PUT",
      headers: {
         Accept: "application/json",
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
