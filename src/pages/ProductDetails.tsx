import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import PageWrapper from '@/components/layout/PageWrapper';

interface Product {
  id: number;
  code: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  category: string;
  availability: 'in-stock' | 'out-of-stock';
  qtyPerPack: number;
  pricingTiers: Array<{
    minQty: number;
    maxQty: number;
    price: number;
  }>;
}

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock product data - in real app this would come from API
  const product: Product = {
    id: 1,
    code: 'MLM-001',
    brand: 'LifeEasy',
    price: 2500,
    description: 'MLM Software Solution - Complete Network Marketing Platform with advanced features for business growth',
    image: '/product1.jpeg',
    category: 'software',
    availability: 'in-stock',
    qtyPerPack: 1,
    pricingTiers: [
      { minQty: 1, maxQty: 5, price: 2500 },
      { minQty: 6, maxQty: 20, price: 2300 },
      { minQty: 21, maxQty: 50, price: 2100 }
    ]
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= product.qtyPerPack) {
      setQuantity(newQty);
      // Update selected tier based on quantity
      const tierIndex = product.pricingTiers.findIndex(
        tier => newQty >= tier.minQty && newQty <= tier.maxQty
      );
      if (tierIndex !== -1) {
        setSelectedTier(tierIndex);
      }
    }
  };

  const getCurrentPrice = () => {
    return product.pricingTiers[selectedTier].price;
  };

  const getTotalPrice = () => {
    return (getCurrentPrice() * quantity).toFixed(2);
  };

  const handleGetQuotation = () => {
    setShowConfirmation(true);
    // In real app, this would send the quote request to backend
  };

  const formatQuantity = (qty: number) => {
    return qty.toLocaleString();
  };

  return (
    <PageWrapper>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/store')}
                className={`hover:underline ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                All Products
              </button>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                /
              </span>
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {product.category}
              </span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                /
              </span>
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {product.code}
              </span>
            </nav>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
                             <div className={`rounded-lg overflow-hidden ${
                 theme === 'dark' ? 'bg-black' : 'bg-white'
               } p-8`}>
                <img
                  src={product.image}
                  alt={product.code}
                  className="w-full h-auto max-w-md object-contain"
                />
              </div>
            </motion.div>

            {/* Right Side - Product Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Product Code */}
              <div>
                <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.code}
                </h1>
                <p className={`text-lg ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {product.description}
                </p>
              </div>

              {/* Unit Price */}
              <div>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  ₹ {getCurrentPrice().toFixed(2)}
                </span>
                <span className={`text-sm ml-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  per unit
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - product.qtyPerPack)}
                    disabled={quantity <= product.qtyPerPack}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      quantity <= product.qtyPerPack
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.qtyPerPack)}
                    className={`w-24 text-center border rounded-lg px-3 py-2 ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + product.qtyPerPack)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    +
                  </button>
                </div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Qty per pack: {formatQuantity(product.qtyPerPack)}
                </p>
              </div>

              {/* Pricing Tiers */}
              <div className="space-y-3">
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Pricing Tiers
                </h3>
                <div className={`border rounded-lg overflow-hidden ${
                  theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  {product.pricingTiers.map((tier, index) => (
                    <label
                      key={index}
                      className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                        selectedTier === index
                          ? theme === 'dark'
                            ? 'bg-blue-900 text-white'
                            : 'bg-blue-50 text-blue-900'
                          : theme === 'dark'
                            ? 'hover:bg-gray-800'
                            : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="pricingTier"
                          checked={selectedTier === index}
                          onChange={() => setSelectedTier(index)}
                          className="text-blue-600"
                        />
                        <span className="font-medium">
                          {formatQuantity(tier.minQty)} - {formatQuantity(tier.maxQty)}
                        </span>
                      </div>
                      <span className="font-bold">
                        ₹ {tier.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className={`text-xl font-bold p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Total:
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  ₹ {getTotalPrice()}
                </span>
              </div>

              {/* Get Quotation Button */}
              <button
                onClick={handleGetQuotation}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Get Quotation</span>
              </button>
            </motion.div>
          </div>

          {/* Confirmation Message */}
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 rounded-lg bg-green-100 border border-green-300"
            >
              <p className="text-green-800 text-center">
                We have received your request for quote. Our sales team will get back to you as soon as possible.
              </p>
            </motion.div>
          )}

          {/* Additional Information */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Data Sheet */}
            <div className="space-y-3">
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Data Sheet:
              </h3>
              <button className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
              }`}>
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 7L12 3.586A2 2 0 0010.586 3H6a2 2 0 00-2 2zm5 12a1 1 0 11-2 0 1 1 0 012 0zm3-7a1 1 0 00-1-1H9a1 1 0 100 2h4a1 1 0 001-1z" clipRule="evenodd" />
                </svg>
                <span>PDF</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Share:
              </h3>
              <div className="flex space-x-3">
                {[
                  { name: 'Facebook', icon: 'f', color: 'bg-blue-600' },
                  { name: 'X', icon: 'X', color: 'bg-blue-500' },
                  { name: 'Pinterest', icon: 'P', color: 'bg-red-600' },
                  { name: 'Email', icon: '✉', color: 'bg-gray-600' }
                ].map((social) => (
                  <button
                    key={social.name}
                    className={`w-10 h-10 rounded-full ${social.color} text-white flex items-center justify-center font-semibold hover:scale-110 transition-transform`}
                    title={social.name}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetails; 