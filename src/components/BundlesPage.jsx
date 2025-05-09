import React, { useState, useEffect } from "react";
import Nav from "./Common/Nav";
import Bannertemp from "./BundlesPage/Bannertemp";
import { FaArrowRight } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import FAQ from './homePage/FAQ';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Contact from "./BundlesPage/Contact";

function BundlesPage() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [bundles, setBundles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await fetch("https://arambhskills-zxut.onrender.com/courses/get_bundles/");
        if (!response.ok) {
          throw new Error('Failed to fetch bundles');
        }
        const data = await response.json();
        if (data.status && data.data) {
          setBundles(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  // Handle Show More click
  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 2);
      setLoading(false);
    }, 1000);
  };

  const location = useLocation();
  const isBundlesPage = location.pathname === '/bundles';

  const handleAddBundleToCart = async (bundleId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle case when user is not logged in
        return;
      }

      const requestBody = {
        bundle_id: parseInt(bundleId)
      };

      console.log('Sending bundle data to API:', requestBody);

      const response = await fetch('https://arambhskills-zxut.onrender.com/cart/add_to_cart/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add bundle to cart');
      }

      if (responseData.status) {
        // Use navigate instead of window.location
        navigate('/checkout');
      }
    } catch (error) {
      console.error('Error adding bundle to cart:', error);
    }
  };

  if (error) {
    return (
      <div>
        <Nav bundle={isBundlesPage ? "#020A47" : "#0000"} />
        <Bannertemp />
        <div className="text-center p-8">
          <p className="text-red-500">Error: {error}</p>
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
    <>
      <Nav bundle={isBundlesPage ? "#020A47" : "#0000"} />
      <Bannertemp />
      <div className="min-h-screen py-4 pb-16">
        <div className="flex flex-wrap justify-center drop-shadow-2xl items-center gap-6 px-6 xl:gap-12 2xl:gap-12 py-5">
          {loading
            ? Array.from({ length: visibleCount }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white hidden md:block h-[60vh] sm:w-[75%] lg:w-[48%] xl:w-[42%] 2xl:w-[30%] relative rounded-lg shadow-md hover:shadow-xl transition duration-300 py-4 px-4"
                >
                  {/* Skeleton Loader */}
                  <div className="bg-gray-300 h-32 sm:h-40 lg:h-48 xl:h-56 2xl:h-60 w-full rounded-md mb-4 animate-pulse"></div>
                  <div className="h-6 sm:h-8 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                  <div className="h-4 sm:h-6 bg-gray-300 rounded-md mb-3 animate-pulse"></div>
                  <div className="h-10 sm:h-12 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              ))
            : bundles.slice(0, visibleCount).map((bundle) => (
                <div
                  key={bundle.id}
                  className="bg-white w-[100%] md:w-[75%] lg:w-[48%] xl:w-[42%] 2xl:w-[30%] relative rounded-lg shadow-xl hover:shadow-2xl transition duration-300 py-2"
                >
                  <div className="w-full shadow-2xl py-2 rounded-lg flex flex-col justify-center items-center bg-[#020A47]">
                    <h1 className="text-white text-xl lg:text-2xl">{bundle.title}</h1>
                    <h1 className="text-white text-xl lg:text-2xl flex justify-center items-center">
                      <LuIndianRupee />
                      {bundle.price}
                    </h1>
                  </div>
                  
                  {/* Topics List */}
                  {bundle.bundle_data.topics.slice(0, 4).map((topic, index) => (
                    <div key={index} className="flex py-2 px-2 border-b-[1px] border-[#0000001f]">
                      <div className="flex gap-8 w-full items-center">
                        <div className="h-[100%] md:w-[20%] rounded-md bg-gray-200"></div>
                        <h1 className="text-sm">{topic}</h1>
                      </div>
                      <h1 className="flex text-lg mr-8 items-center">
                        <LuIndianRupee />
                        {Math.floor(bundle.price / 4)}
                      </h1>
                    </div>
                  ))}

                  <div className="h-[15vh] flex flex-col px-4 justify-center">
                    <h1 className="flex font-bold text-lg gap-2 items-center">
                      <GoDotFill className="rounded-full" /> {bundle.bundle_data.course_format.mode}
                    </h1>
                    <h1 className="flex font-bold text-lg gap-2 items-center">
                      <GoDotFill /> {bundle.credits_applied ? "Credits Applicable" : "No Credits"}
                    </h1>
                  </div>

                  <div className="flex w-full h-full justify-center py-1 pb-2 items-center">
                    <button 
                      onClick={() => handleAddBundleToCart(bundle.id)}
                      className="bg-[#020A47] w-[80%] md:w-[40%] lg:w-[80%] text-lg lg:text-xl flex justify-center items-center gap-4 text-[#ffff] py-4 rounded-2xl"
                    >
                      Buy Now <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
        </div>
        {!loading && visibleCount < bundles.length && (
          <div className="flex justify-center items-center py-8 mt-16 gap-4">
            <button
              onClick={handleShowMore}
              className="bg-[#020A47] flex justify-center items-center gap-4 text-[#ffff] px-8 py-2 rounded-3xl"
              disabled={loading}
            >
              Show More <FaArrowRight />
            </button>
          </div>
        )}
      </div>
      <FAQ />
      <Contact value={"Didn't Get Your Answer?"} />
    </>
  );
}

export default BundlesPage;
