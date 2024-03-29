import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, priceList} = value
      let totalAmout 
  
      cartList.forEach(eachItem=>{
        totalAmount+=eachItem.price*eachItem.quantity
      })
      console.log(totalAmount)
      return (
        <div className="summary-cont">
          <h1 className="heading1">
            Order Total: <span className="span"> Rs {totalAmount}/-</span>
          </h1>
          <p className="para">{cartList.length} Items in cart</p>
          <button className="btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
