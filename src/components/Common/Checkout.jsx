import React from 'react';
import Nav from './Nav';
import CartComponent from './CartComponent';
import Bannertemp from './Bannertemp';

const Checkout = ({  }) => {
  return (
    <div>
      <Nav />
      <Bannertemp value={"Aarambh Cart"} />
      <CartComponent  />
    </div>
  );
};

export default Checkout;