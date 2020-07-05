import React from 'react'
import styled from 'styled-components'

import {
  DialogContent,
  DialogFooter,
  ConfirmButton
} from '../FoodDialog/FoodDialog'
import { formatPrice } from '../Data/FoodData'
import { getPrice } from '../FoodDialog/FoodDialog'

const OrderStyled = styled.div`
  position: fixed;
  top: 49px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: calc(100vh - 49px);
  background-color: white;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 998;
`

const OrderContent = styled(DialogContent)`
  padding: 20px;

  .text {
    text-align: center;
  }
`

const OrderTitle = styled.h2`
  margin: 0;
  border-bottom: 1px solid grey;
  padding: 10px 0;
  font-size: 18px;
`

const OrderList = styled.ul`
  margin: 0;
  padding: 0;
`

const OrderItem = styled.li`
  display: grid;
  grid-template-columns: 20px 150px 60px;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid grey;
`

const OrderFooter = styled(DialogFooter)``

export function Order({ orders }) {
  const subtotal = orders.reduce((total, current) => {
    return total + getPrice(current)
  }, 0)
  const tax = subtotal * 0.07
  const total = subtotal + tax

  return (
    <OrderStyled>
      <OrderContent>
        {orders.length > 0 ? (
          <>
            <OrderTitle>Your Order: </OrderTitle>

            <OrderList>
              {orders.map(order => (
                <OrderItem key={order.name + Math.random().toFixed(2)}>
                  <div className="quantity">{order.quantity}</div>
                  <div className="name">{order.name}</div>
                  <div className="price">{formatPrice(getPrice(order))}</div>
                </OrderItem>
              ))}
              <OrderItem>
                <div></div>
                <div className="subtotal">Sub-Total</div>
                <div className="subtotal-price">{formatPrice(subtotal)}</div>
              </OrderItem>

              <OrderItem>
                <div></div>
                <div className="tax">Tax</div>
                <div className="tax-price">{formatPrice(tax)}</div>
              </OrderItem>

              <OrderItem>
                <div></div>
                <div className="total">Total</div>
                <div className="total-price">{formatPrice(total)}</div>
              </OrderItem>
            </OrderList>
          </>
        ) : (
          <p className="text">Your order is looking pretty empty.</p>
        )}
      </OrderContent>

      <OrderFooter>
        <ConfirmButton>Checkout</ConfirmButton>
      </OrderFooter>
    </OrderStyled>
  )
}
