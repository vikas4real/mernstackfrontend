import { API } from "../../backend";

//Signup Helper

export const signup = (user) => {
   return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//Signin Helper

export const signin = (user) => {
   return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//Authenticate Signin User

export const authenticate = (data, next) => {
   if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
   }
};

//isAuthenticated Helper

export const isAuthenticated = () => {
   if (typeof window == "undefined") {
      return false;
   }
   if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
   } else {
      return false;
   }
};

//Signout Helper

export const signout = (next) => {
   if (typeof window !== "undefined") {
      localStorage.removeItem("jwt", JSON.stringify(data));
      next();
      return fetch(`${API}/signout`, { method: "GET" })
         .then((response) => console.log("Signed Out Successfulluy"))
         .catch((err) => console.log(err));
   }
};
