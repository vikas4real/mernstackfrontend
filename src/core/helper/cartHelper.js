export const addProductToCart = (product, next) => {
   let cart = [];
   let totalPrice = 0;
   if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
         cart = JSON.parse(localStorage.getItem("cart"));
      }

      const productIndex = cart.findIndex((item) => item._id === product._id);

      if (productIndex === -1) {
         cart.push({
            ...product,
            count: 1,
            totalPrice: product.price, // Initialize price based on quantity
         });
      } else {
         cart[productIndex].count += 1;
         cart[productIndex].totalPrice =
            cart[productIndex].count * product.price; // Recalculate totalPrice
      }

      cart.forEach((item) => {
         totalPrice += item.totalPrice;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPrice", totalPrice);
      next(); // Update the cart in parent component
   }
};

export const removeItemFromCart = (productId, next) => {
   let cart = [];
   let totalPrice = 0;
   if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
         cart = JSON.parse(localStorage.getItem("cart"));
      }

      const productIndex = cart.findIndex((item) => item._id === productId);

      if (productIndex !== -1) {
         // If the quantity is greater than 1, decrease it
         if (cart[productIndex].count > 1) {
            cart[productIndex].count -= 1;
            cart[productIndex].totalPrice =
               cart[productIndex].count * cart[productIndex].price;
         } else {
            // If quantity is 1, remove the product from the cart
            cart.splice(productIndex, 1);
         }
      }

      // Recalculate total price
      cart.forEach((item) => {
         totalPrice += item.totalPrice;
      });

      // If the cart is empty, set totalPrice to 0
      if (cart.length === 0) {
         totalPrice = 0;
      }

      // Save the updated cart and total price to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPrice", totalPrice);

      // Trigger the callback to update the UI
      next();
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
