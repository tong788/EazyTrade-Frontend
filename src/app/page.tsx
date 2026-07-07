"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppSelector } from "@/store";

// SVG Icons for categories & details
const LaptopIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ShirtIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 8a2 2 0 00-1.688-1.864l-2.4-.48a2.68 2.68 0 01-1.996-1.523C14.072 2.457 13.118 2 12 2s-2.072.457-2.916 2.133a2.68 2.68 0 01-1.996 1.523l-2.4.48A2 2 0 003 8v11a2 2 0 002 2h14a2 2 0 002-2V8z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SportIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const VerificationShieldIcon = () => (
  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

// Mock Products Data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Zenith Pro Wireless Headphones",
    price: 189.99,
    category: "Electronics",
    rating: 4.9,
    reviews: 142,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Active noise cancelling, 40-hour battery life, premium spatial sound.",
  },
  {
    id: 2,
    name: "AeroFit Performance Sneakers",
    price: 85.00,
    category: "Fashion",
    rating: 4.7,
    reviews: 98,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-lightweight, breathable mesh fabric, energy-returning cushioning.",
  },
  {
    id: 3,
    name: "Minimalist Nordic Oak Coffee Table",
    price: 249.00,
    category: "Home & Living",
    rating: 4.8,
    reviews: 64,
    badge: "Free Shipping",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=600&q=80",
    description: "Sustainably-sourced oak, sleek steel legs, durable clear coat finish.",
  },
  {
    id: 4,
    name: "Chronos Classic Minimalist Watch",
    price: 135.00,
    category: "Fashion",
    rating: 4.6,
    reviews: 112,
    badge: "10% OFF",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Swiss movement, scratch-resistant sapphire glass, premium brown leather strap.",
  },
  {
    id: 5,
    name: "Smart Watch Elite Series",
    price: 299.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 215,
    badge: "New",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    description: "Always-on Retina display, advanced health tracking, 50m water resistance.",
  },
  {
    id: 6,
    name: "Ergonomic Office Mesh Chair",
    price: 195.00,
    category: "Home & Living",
    rating: 4.5,
    reviews: 83,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80",
    description: "Full lumbar support, 3D adjustable armrests, high-density foam seat.",
  },
];

// Mock Categories
const CATEGORIES = [
  { name: "Electronics", count: "1,240 items", icon: <LaptopIcon />, color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" },
  { name: "Fashion", count: "3,820 items", icon: <ShirtIcon />, color: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" },
  { name: "Home & Living", count: "950 items", icon: <HomeIcon />, color: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" },
  { name: "Sports", count: "610 items", icon: <SportIcon />, color: "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20" },
  { name: "Books & Stationery", count: "430 items", icon: <BookIcon />, color: "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20" },
];

const MainPage = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("All");
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  const filteredProducts = activeTab === "All"
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === activeTab);

  const triggerAddToCart = (productName: string) => {
    setCartNotification(`"${productName}" added to cart!`);
    setTimeout(() => {
      setCartNotification(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans antialiased text-stone-800">
      <Navbar />

      {/* Cart Popup Notification */}
      {cartNotification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#122c3c] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-blue-900/20 animate-slide-in">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-semibold">{cartNotification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        
        {/* Personalized Welcome Banner / Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#122c3c] to-[#0d202c] text-white shadow-xl">
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-112 h-112 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12 md:p-16 relative z-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              {isAuthenticated && user ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Logged in as {user.role}
                </span>
              ) : (
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-100">
                  Marketplace Hub
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {isAuthenticated && user ? (
                  <>Hello, {user.firstname}! <br /><span className="text-blue-200">Ready to trade today?</span></>
                ) : (
                  <>The Next-Gen Marketplace <br /><span className="text-blue-200">For Everyone</span></>
                )}
              </h1>
              
              <p className="text-blue-100/70 text-base md:text-lg max-w-lg leading-relaxed font-medium">
                Connect with buyers and sellers worldwide. List your items in seconds, shop secure escrow listings, and build your digital storefront.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="#"
                  className="px-6 py-3 font-bold bg-white text-[#122c3c] rounded-xl hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-md text-sm cursor-pointer"
                >
                  Explore Listings
                </Link>
                {!isAuthenticated && (
                  <Link
                    href="/auth/login"
                    className="px-6 py-3 font-bold bg-transparent border border-white/30 text-white rounded-xl hover:bg-white/10 hover:border-white/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 text-sm cursor-pointer"
                  >
                    Create Account
                  </Link>
                )}
                {isAuthenticated && (
                  <Link
                    href="#"
                    className="px-6 py-3 font-bold bg-[#0ea5e9] text-white rounded-xl hover:bg-[#0284c7] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 text-sm cursor-pointer shadow-lg shadow-sky-500/20"
                  >
                    Seller Center
                  </Link>
                )}
              </div>
            </div>

            {/* Dynamic CSS Artwork / Dashboard Mock on Right Side */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-2xs font-extrabold text-blue-200/50 uppercase tracking-widest">
                    Market Analytics
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-blue-100/80 mb-1">
                      <span>Monthly Trading Volume</span>
                      <span className="text-emerald-400 font-bold">+18.4%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-blue-400 to-sky-400 rounded-full w-[82%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-blue-100/80 mb-1">
                      <span>Seller Trust Score Index</span>
                      <span className="text-sky-400 font-bold">99.8%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-emerald-400 to-teal-400 rounded-full w-[95%]" />
                    </div>
                  </div>

                  {/* SVG Mock Sparkline Graph */}
                  <div className="pt-2">
                    <p className="text-3xs font-extrabold text-blue-200/40 uppercase tracking-wider mb-2">Live Price Swaps</p>
                    <div className="h-16 flex items-end justify-between gap-1.5">
                      {[40, 25, 35, 55, 45, 60, 85, 70, 75, 90, 80, 100].map((val, idx) => (
                        <div
                          key={idx}
                          style={{ height: `${val}%` }}
                          className={`w-full rounded-t-sm transition-all duration-300 ${
                            idx === 11 ? "bg-emerald-400" : "bg-blue-400/30 group-hover:bg-blue-400/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid / Statistics Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Secure Transactions", desc: "Escrow payment protection system", icon: <VerificationShieldIcon /> },
            {
              title: "Verified Sellers", desc: "100% ID & business validation",
              icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            {
              title: "Global Commerce", desc: "Ship & deliver anywhere with ease",
              icon: (
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V14a2 2 0 00-2-2h-.5a2 2 0 01-2-2v0a2 2 0 012-2h4a2 2 0 011.89 1.28L21 12a9 9 0 11-18-8.065M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
              )
            },
            {
              title: "Instant Support", desc: "24/7 dedicated helpline team",
              icon: (
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 bg-white border border-stone-200/60 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">{item.title}</h3>
                <p className="text-xs text-stone-500 mt-1 leading-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Categories Bar */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Browse Categories</h2>
              <p className="text-sm text-stone-500 mt-1">Explore our wide selection of verified products</p>
            </div>
            <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
              See All <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(cat.name)}
                className={`flex flex-col items-center justify-center p-6 bg-white border border-stone-200/60 rounded-2xl text-center group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  activeTab === cat.name ? "ring-2 ring-[#122c3c] border-transparent bg-stone-50/50" : ""
                }`}
              >
                <div className={`p-4 rounded-full ${cat.color} transition-all duration-200 mb-3`}>
                  {cat.icon}
                </div>
                <span className="font-bold text-sm text-stone-900 leading-tight group-hover:text-[#122c3c]">
                  {cat.name}
                </span>
                <span className="text-3xs font-semibold text-stone-400 mt-1 leading-none">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className="space-y-8">
          
          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-stone-200/80 pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Featured Listings</h2>
              <p className="text-sm text-stone-500">Handpicked high-quality products from top-rated sellers</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {["All", "Electronics", "Fashion", "Home & Living"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#122c3c] text-white shadow-md shadow-blue-900/10"
                      : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image container */}
                <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 inline-flex items-center px-2.5 py-1 rounded-lg text-2xs font-extrabold uppercase tracking-wider text-white bg-[#122c3c]/90 backdrop-blur-xs">
                      {product.badge}
                    </span>
                  )}
                  {/* Add Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-2xs font-bold uppercase tracking-wider text-stone-400">
                      <span>{product.category}</span>
                      <div className="flex items-center gap-1 text-stone-900 normal-case">
                        <StarIcon />
                        <span>{product.rating}</span>
                        <span className="text-stone-400 font-medium">({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-base text-stone-900 tracking-tight leading-snug group-hover:text-[#122c3c] transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-3xs font-extrabold text-stone-400 uppercase tracking-widest leading-none block">Price</span>
                      <span className="text-lg font-extrabold text-stone-900 leading-tight">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => triggerAddToCart(product.name)}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#122c3c] hover:bg-[#1a3f56] active:bg-[#0d202c] rounded-xl shadow-md shadow-blue-900/5 transition-all duration-150 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white border border-stone-200/60 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <LaptopIcon />
              </div>
              <h3 className="font-bold text-stone-900 text-base">No items found</h3>
              <p className="text-sm text-stone-500">No listings match the &quot;{activeTab}&quot; category at the moment.</p>
            </div>
          )}
        </section>

        {/* Call to Action: Start Selling */}
        <section className="bg-linear-to-br from-blue-50/50 to-stone-50 border border-stone-200/80 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="inline-block text-2xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-100/50 px-3 py-1 rounded-lg">
              Earn with EazyTrade
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Turn your unused items <br />into cash, instantly
            </h2>
            <p className="text-sm font-medium text-stone-500 leading-relaxed">
              Create a seller account, build your store, upload your products and start earning. Our escrow security guarantees you get paid safely.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="#"
              className="inline-block px-7 py-3.5 font-bold text-white bg-[#122c3c] hover:bg-[#1a3f56] hover:scale-[1.02] active:scale-[0.98] rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all text-sm cursor-pointer"
            >
              Start Selling Today
            </Link>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="bg-white border-t border-stone-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand column */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Image src="/png/EazyTrade.png" alt="EazyTrade Logo" width={36} height={36} />
                <span className="font-extrabold text-lg tracking-tight text-[#122c3c]">
                  EazyTrade
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium leading-relaxed max-w-xs">
                A new-gen secure E-commerce platform. Connect, sell, and shop with absolute peace of mind.
              </p>
              
              {/* Social icons */}
              <div className="flex gap-3">
                {["Facebook", "Twitter", "Instagram", "GitHub"].map((social) => (
                  <button key={social} className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 hover:text-[#122c3c] hover:bg-stone-100 hover:border-stone-300 transition-colors text-2xs cursor-pointer">
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Link column 1 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-950 mb-4">Shop</h4>
              <ul className="space-y-2">
                {["Browse Listings", "Trending Stores", "Deals of the Week", "Buyer Protection"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs font-medium text-stone-500 hover:text-[#122c3c] transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link column 2 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-950 mb-4">Sell</h4>
              <ul className="space-y-2">
                {["Open a Shop", "Seller Handbook", "Advertising Listings", "Seller Dashboard"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs font-medium text-stone-500 hover:text-[#122c3c] transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link column 3 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-950 mb-4">Platform</h4>
              <ul className="space-y-2">
                {["Help Center", "Community Forums", "API Integration", "Status & Logs"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs font-medium text-stone-500 hover:text-[#122c3c] transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="border-t border-stone-150 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-3xs font-bold uppercase tracking-wider text-stone-400">
            <p>© {new Date().getFullYear()} EazyTrade Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-[#122c3c]">Terms of Service</Link>
              <Link href="#" className="hover:text-[#122c3c]">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#122c3c]">Cookie Choice</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
