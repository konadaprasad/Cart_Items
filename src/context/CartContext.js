import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  priceList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
