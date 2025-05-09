import React, { useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { decrement } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const CartComponent = () => {
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view cart');
        setLoading(false);
        return;
      }

      const response = await fetch('https://arambhskills-zxut.onrender.com/cart/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      if (data.status && data.data) {
        setCartItems(data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      if (item.type === 'course') {
        total += item.plan_price * item.qty;
      } else if (item.type === 'bundle') {
        total += item.bundle_price * item.qty;
      }
    });
    return total;
  };

  const gst = calculateTotal() * 0.18; // 18% GST
  const total = calculateTotal() + gst;

  const handleApplyCoupon = () => {
    // Add coupon logic here
    console.log('Applying coupon:', couponCode);
  };

  const handleDeleteItem = async (cartId) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to delete items');
        return;
      }

      const response = await fetch(`https://arambhskills-zxut.onrender.com/cart/delete/${cartId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Item removed successfully');
        // Refresh cart items immediately
        await fetchCartItems();
        // Clear success message after 2 seconds
        setTimeout(() => {
          setSuccess('');
        }, 2000);
      } else {
        setError('Failed to delete item');
      }
    } catch (error) {
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  if (loading && cartItems.length === 0) {
    return (
      <div className="flex flex-col  mx-auto p-4 md:p-12">
        <h1 className="text-2xl md:text-4xl font-medium text-gray-700 mb-6">Your cart items</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col  mx-auto p-4 md:p-12">
        <h1 className="text-2xl md:text-4xl font-medium text-gray-700 mb-6">Your cart items</h1>
        <div className="text-red-500 p-4 bg-red-50 rounded-md">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#020A47] text-white rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  mx-auto p-4 md:p-12">
      <h1 className="text-2xl md:text-4xl font-medium text-gray-700 mb-6">Your cart items</h1>

      {success && (
        <div className="text-green-500 p-4 bg-green-50 rounded-md mb-4">
          {success}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-4">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            to="/courses" 
            className="bg-[#020A47] text-white px-6 py-3 rounded-lg hover:bg-[#161d4d] transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="flex flex-col  lg:flex-row gap-9 lg:gap-20">
          {/* Cart Items Section */}
          <div className="lg:w-[50vw]">
            <div className="flex justify-between px-8 text-gray-600 md:text-2xl mb-4">
              <span>Items</span>
              <span>Price</span>
            </div>

            {cartItems.map((item) => (
              <div key={item.cart_id} className="flex  gap-4 border-t-[3px] border-gray-200 py-4">
                <img
                  src="/placeholder.svg"
                  alt="Course thumbnail"
                  className="md:w-40 md:h-20 h-12 w-16 flex object-cover rounded"
                />
                <div className="flex-grow justify-center items-center">
                  <h3 className="font-medium">
                    {item.type === 'course' ? item.course_name : item.bundle_name}
                  </h3>
                  <p className="text-sm w-full lg:w-[60%]">
                    {item.type === 'course' ? item.plan_name : 'Bundle'} (Qty: {item.qty})
                  </p>
                </div>
                <div className="flex   items-center justify-center">
                  <span className="text-gray-900 flex">
                    ₹{item.type === 'course' ? item.plan_price : item.bundle_price}
                  </span>
                  <button 
                    className="ml-4" 
                    onClick={() => handleDeleteItem(item.cart_id)}
                    disabled={loading}
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="md:w-[500px]  bg-white   rounded-lg shadow-2xl p-6 ">
            <h2 className="text-3xl font-medium mb-4">Total</h2>

            <div className="space-y-2  mb-4">
              {cartItems.map((item) => (
                <div key={item.cart_id} className="flex justify-between">
                  <span>{item.type === 'course' ? item.course_name : item.bundle_name}</span>
                  <span>₹ {item.type === 'course' ? item.plan_price * item.qty : item.bundle_price * item.qty}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>GST</span>
                <span>₹ {gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium  pt-2">
                <span>Aarambh Points</span>
                <input className='size-5' type="checkbox" name="" id="" />
              </div>
            </div>

            <div className="flex relative gap-2 mb-4">
              <input
                type="text"
                placeholder="Apply Coupon"
                className=" px-3 py-2 border w-[80%] border-gray-300 rounded  "
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                onClick={handleApplyCoupon}
                className="px-8 py-2.5 absolute -end-2 bg-[#020A47] text-white rounded "
              >
                Apply
              </button>
            </div>

            <button className="w-full py-3 bg-[#020A47] text-white rounded-md  transition-colors">
              Continue to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;