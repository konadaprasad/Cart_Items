import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem cartItemDetails={eachCartItem} key={eachCartItem.id} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
