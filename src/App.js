import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    priceList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const result = cartList.find(each => each.id === product.id)
    if (result === undefined) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
        priceList: [...prevState.priceList, product.price * product.quantity],
      }))
    } else {
      const newQuantity = result.quantity + product.quantity
      this.setState({
        cartList: cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {...eachItem, quantity: newQuantity}
          }
          return eachItem
        }),
        priceList: cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return eachItem.price * newQuantity
          }
          return eachItem.price * eachItem.quantity
        }),
      })
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList, priceList} = this.state
    const selectedItem = cartList.filter(item => item.id === id)
    const deletedPrice = selectedItem[0].price * selectedItem[0].quantity
    const price = priceList.filter(item => item !== deletedPrice)
    console.log(price)
    const result = cartList.filter(item => item.id !== id)

    this.setState({cartList: result, priceList: price})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const result = cartList.find(each => each.id === id)
    const newQuantity = result.quantity + 1
    this.setState({
      cartList: cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: newQuantity}
        }
        return eachItem
      }),
      priceList: cartList.map(eachItem => {
        if (eachItem.id === id) {
          return eachItem.price * newQuantity
        }
        return eachItem.price * eachItem.quantity
      }),
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const result = cartList.find(each => each.id === id)
    const newQuantity = result.quantity - 1
    if (newQuantity < 1) {
      this.removeCartItem(id)
    } else {
      this.setState({
        cartList: cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, quantity: newQuantity}
          }
          return eachItem
        }),
        priceList: cartList.map(eachItem => {
          if (eachItem.id === id) {
            return eachItem.price * newQuantity
          }
          return eachItem.price * eachItem.quantity
        }),
      })
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: [], priceList: []})
  }

  render() {
    const {cartList, priceList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          priceList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
