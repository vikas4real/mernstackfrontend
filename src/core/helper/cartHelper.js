export const addProductToCart = (product, next) => {
   let cart = [];
   let totalPrice = 0; // Initialize the total price variable
   if (typeof window !== undefined) {
      // Get the cart from localStorage
      if (localStorage.getItem("cart")) {
         cart = JSON.parse(localStorage.getItem("cart"));
      }

      // Check if the product already exists in the cart
      const productIndex = cart.findIndex((item) => item._id === product._id);

      if (productIndex === -1) {
         // If the product is not in the cart, add it with the updated price
         cart.push({
            ...product,
            count: 1,
            totalPrice: product.price, // Initial total price (price * 1)
         });
      } else {
         // If the product is already in the cart, increase its quantity and update the total price
         cart[productIndex].count += 1;
         cart[productIndex].totalPrice =
            cart[productIndex].count * product.price;
      }

      // Calculate the total price of all items in the cart
      cart.forEach((item) => {
         totalPrice += item.totalPrice;
      });

      // Save the updated cart and total price back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPrice", totalPrice); // Save total price in localStorage
      next();
   }
};

export const removeItemFromCart = (productId) => {
   let cart = [];
   let totalPrice = 0; // Initialize the total price variable
   if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
         cart = JSON.parse(localStorage.getItem("cart"));
      }

      const productIndex = cart.findIndex((item) => item._id === productId);

      if (productIndex !== -1) {
         // If the product exists in the cart, decrease quantity or remove it
         if (cart[productIndex].count > 1) {
            // Decrease quantity and update the total price
            cart[productIndex].count -= 1;
            cart[productIndex].totalPrice =
               cart[productIndex].count * cart[productIndex].price;
         } else {
            // If quantity is 1, remove the product from the cart
            cart.splice(productIndex, 1);
         }
      }

      // Calculate the total price of all items in the cart
      cart.forEach((item) => {
         totalPrice += item.totalPrice;
      });

      // Save the updated cart and total price back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPrice", totalPrice); // Save total price in localStorage
   }
   return cart;
};
export const loadCart = () => {
   if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
         return JSON.parse(localStorage.getItem("cart"));
      }
   }
};
export const emptyCart = () => {
   if (typeof window !== undefined) {
      localStorage.removeItem("cart");
   }
};
export const getFinalPrice = () => {
   if (typeof window !== undefined) {
      if (localStorage.getItem("totalPrice")) {
         return JSON.parse(localStorage.getItem("totalPrice"));
      }
   }
};
