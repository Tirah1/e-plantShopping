import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity,addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const dispatch = useDispatch();
  
    const calculateTotalAmount = (items) => {
        let total = 0; 
        for (const item of items) {
            const cost = parseFloat(item.cost.replace('$', ''));
            total += cost * item.quantity; 
        }
        return total; 

  };
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleContinueShopping = (e) => {
    onContinueShopping();
   
  };
  
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

 
  const handleIncrement = (item) => {
   dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
   updateCartIcon();   
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        updateCartIcon();
    } else {
        dispatch(removeItem(item.name)); 
      }
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); 
    updateCartIcon();
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return cost * item.quantity;
  }
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
      <h3 style={{ color: 'black' }}>Total Quantity: {totalQuantity}</h3>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


