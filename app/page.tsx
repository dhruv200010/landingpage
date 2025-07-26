'use client';

import { useState, useEffect } from 'react';
import { 
  FiCheckCircle, 
  FiPlay, 
  FiZap, 
  FiScissors, 
  FiTag, 
  FiEye, 
  FiStar, 
  FiUsers, 
  FiSettings, 
  FiChevronDown, 
  FiArrowRight, 
  FiClock, 
  FiHeart, 
  FiTarget, 
  FiShield, 
  FiGift,
  FiX,
  FiXCircle
} from 'react-icons/fi';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeFeature, setActiveFeature] = useState('ai-clipping');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer effect
  useEffect(() => {
    const targetDate = new Date('August 3, 2025 00:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-play slideshow and feature switching
  useEffect(() => {
    const interval = setInterval(() => {
      const activeFeatureData = aiFeatures.find(f => f.id === activeFeature);
      if (activeFeatureData?.slides) {
        setCurrentSlide((prev) => 
          prev < activeFeatureData.slides.length - 1 ? prev + 1 : 0
        );
      }
      
      // Auto-switch between features every 6 seconds
      const currentFeatureIndex = aiFeatures.findIndex(f => f.id === activeFeature);
      const nextFeatureIndex = (currentFeatureIndex + 1) % aiFeatures.length;
      setActiveFeature(aiFeatures[nextFeatureIndex].id);
      setCurrentSlide(0);
    }, 6000); // Change feature every 6 seconds

    return () => clearInterval(interval);
  }, [activeFeature]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Send email to Make.com webhook
      await fetch('https://hook.us2.make.com/8hamrtcq1dj54cfvmrpwb72mok8lb417', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const aiFeatures = [
    {
      id: 'ai-clipping',
      icon: "✂️",
      title: "AI Clipping",
      description: "Effortlessly finds and cuts viral-worthy moments that are bound to go viral, no timeline scrubbing needed.",
      image: "/ai clipping.gif",
      slides: [
        "/ai clipping.gif",
        "/ai-analysis.jpg",
        "/upload-interface.png"
      ]
    },
    {
      id: 'ai-captioning',
      icon: "🏷️",
      title: "AI Captioning",
      description: "99% best in Market transcription accurate subtitle, Hinglish, Hindi & more supported!",
      image: "/ai captioning.gif",
      slides: [
        "/ai captioning.gif",
        "/different subs.gif",
        "/upload-interface.png"
      ]
    },
    {
      id: 'ai-reframe',
      icon: "👁️",
      title: "AI Reframe",
      description: "Smart cropping that keeps faces in frame — perfect vertical Shorts every time.",
      image: "/ai reframe.gif",
      slides: [
        "/ai reframe.gif",
        "/ai-analysis.jpg",
        "/upload-interface.png"
      ]
    },
    {
      id: 'ai-titles',
      icon: "⭐",
      title: "AI Titles",
      description: "Auto-generates viral titles, tags, and descriptions tailored to your content. No Gibberish robotic titles anymore!",
      image: "/ai titles.jpg",
      slides: [
        "/ai titles.jpg",
        "/ai-analysis.jpg",
        "/upload-interface.png"
      ]
    },
    {
      id: 'trim-silence',
      icon: "⚡",
      title: "Trim Silence",
      description: "Automatically removes awkward pauses, filler words, and silence! Saving hours with the industry's smartest silence trimmer.",
      image: "/trim silence.jpg",
      slides: [
        "/trim silence.jpg",
        "/ai-analysis.jpg",
        "/upload-interface.png"
      ]
    }
  ];





  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-3 md:top-4 z-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/30 backdrop-blur-2xl rounded-full shadow-lg border border-white/30 px-4 md:px-6 py-3 md:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 md:space-x-4">
                <img 
                  src="/headerlogo.png" 
                  alt="AI Video Editor Logo" 
                  className="max-h-[26px] sm:max-h-[40px] object-contain"
                />
              </div>
              
              <nav className="hidden md:flex items-center space-x-8">
              </nav>
              
              <div className="flex items-center space-x-3 md:space-x-4">
                <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors hidden sm:block font-medium">Features</a>
                <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors hidden sm:block font-medium">Pricing</a>
                                 <a href="#hero" className="btn-gradient px-3 md:px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-white py-6 md:py-8">
        {/* Background SVG */}
        <div className="absolute inset-0 opacity-60">
          <img 
            src="/stripes.svg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-600 mb-3 md:mb-4">
              Post more ⚡ Grow faster
            </h2>
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-4 md:mb-6 leading-[1.5] md:leading-[1.6] lg:leading-[1.7]">
              Turn <span className="elevated-underline">Raw Video</span> into<br className="block lg:hidden" />
              <span className="hero-gradient">Viral Shorts</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 mb-6 md:mb-8 max-w-3xl mx-auto">
              AI-powered video editing that finds viral moments, adds captions, reframes content, and generates titles automatically
            </p>

            {/* Email Signup Form */}
            {!isSubmitted ? (
              <div className="max-w-2xl mx-auto mb-6 md:mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-slate-800 rounded-2xl p-1 flex flex-col sm:flex-row items-center">
                    <div className="flex-1 flex items-center px-3 py-2 w-full">
                      <FiPlay className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Drop your email to join the beta"
                        className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-base md:text-lg min-w-0"
                        disabled={isLoading}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-white text-slate-900 px-4 md:px-6 py-2 rounded-xl font-semibold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:bg-slate-50 transition-colors w-full sm:w-auto mt-2 sm:mt-0 flex-shrink-0"
                    >
                      {isLoading ? 'Signing up...' : (
                        <>
                          Get Early Access
                          <FiArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 flex-shrink-0" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                </form>
              </div>
            ) : (
                             <div className="max-w-2xl mx-auto mb-6 md:mb-8">
                 <div className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6">
                   <div className="text-center">
                     <div className="text-4xl mb-3">📧</div>
                     <h3 className="text-base md:text-lg font-semibold text-green-800 mb-2">Thanks for signing up!</h3>
                     <p className="text-sm md:text-base text-green-700">Make sure to check your inbox and spam folder</p>
                   </div>
                 </div>
               </div>
            )}

            {/* P.S. Text */}
            <p className="text-slate-500 text-xs -mt-4 md:-mt-6 mb-4 md:mb-6">
              ✉️ P.S. Access details will be shared via email. Limited beta slots — don't miss out.
            </p>

            {/* Launch Offer */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 md:p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-2 md:mb-3">
                <FiGift className="w-4 h-4 md:w-5 md:h-5 text-purple-600 mr-2 flex-shrink-0" />
                <span className="text-purple-600 font-semibold text-sm md:text-base">Launch Offer</span>
              </div>
              <p className="text-slate-700 mb-2 text-sm md:text-base">
                <strong>Free until launch.</strong>
              </p>
              <p className="text-slate-600 text-xs md:text-sm">
                🎁 Bonus: Get 2 months of Pro access after launch — only if you sign up early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section - Simple Photo Slideshow */}
      <section id="features" className="py-4 md:py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navigation Bar */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-2 mb-6 md:mb-8">
            {aiFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => {
                  setActiveFeature(feature.id);
                  setCurrentSlide(0);
                }}
                className={`flex items-center px-3 md:px-4 py-2 md:py-2 rounded-lg text-sm md:text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                  activeFeature === feature.id
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent'
                }`}
              >
                <span className="mr-2 md:mr-2 text-base md:text-sm">{feature.icon}</span>
                <span className="hidden sm:inline">{feature.title}</span>
                <span className="sm:hidden text-base">{feature.title.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Description Text */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              {aiFeatures.find(f => f.id === activeFeature)?.description}
            </p>
          </div>

          {/* Simple Photo Display */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            <div className="relative aspect-[3/2] bg-slate-100">
              {aiFeatures.find(f => f.id === activeFeature)?.slides && (
                <img 
                  src={aiFeatures.find(f => f.id === activeFeature)?.slides[currentSlide]}
                  alt={aiFeatures.find(f => f.id === activeFeature)?.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              )}
            </div>
          </div>
        </div>
      </section>



      {/* Video Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Create TikToks That Get 👁️ Views
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Reels made with our tool are <span className="text-purple-600 font-bold">"12x more"</span> likely to get <span className="text-red-500 font-bold">Shared</span>, <span className="text-green-500 font-bold">Saved</span>, and <span className="text-yellow-500 font-bold">Seen.</span>
            </p>
          </div>

          {/* Video Screens Container */}
          <div className="relative flex justify-center items-center">
            {/* Screen 1 */}
            <div className="relative transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105 z-10">
              <div className="relative w-48 h-72 md:w-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                {/* GIF Background */}
                <img 
                  src="/gif1.gif" 
                  alt="Video Demo 1" 
                  className="w-full h-full object-cover"
                />
                
                {/* View Count Overlay */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <FiPlay className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-medium">273K</span>
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <FiPlay className="w-4 h-4 text-blue-600 ml-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 2 */}
            <div className="relative transform rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105 z-20 -ml-8 md:-ml-12">
              <div className="relative w-48 h-72 md:w-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                {/* GIF Background */}
                <img 
                  src="/gif2.gif" 
                  alt="Video Demo 2" 
                  className="w-full h-full object-cover"
                />
                
                {/* View Count Overlay */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <FiPlay className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-medium">3.5M</span>
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <FiPlay className="w-4 h-4 text-white ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>


                  </div>
        </section>

      {/* Comparison Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our AI Video Editor?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See the difference AI-powered editing makes for your content creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* With Our Tool */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">😎</div>
                <h3 className="text-xl font-bold text-slate-900">With Our AI Tool</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700"><strong>Watermark-free</strong> (even on free trial)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700">Finds <strong>viral clips</strong> — no scrubbing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700"><strong>99% accurate</strong> multilingual captions</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700">Auto-generates <strong>viral titles & tags</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700"><strong>Instantly</strong> removes silence & fillers</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700"><strong>12x more reach</strong>, <strong>10x less effort</strong></span>
                </li>
              </ul>
            </div>

            {/* Traditional Tools */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">😩</div>
                <h3 className="text-xl font-bold text-slate-900">Traditional Tools</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Force you to pay just to remove watermark</span>
                </li>
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Scrub. Cut. Repeat.</span>
                </li>
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Captions miss half the words</span>
                </li>

                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Robotic, boring titles</span>
                </li>
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Silence trimming = pain</span>
                </li>
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">1 short = 2 hours of work</span>
                </li>
              </ul>
            </div>

            {/* Current Situation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">😵</div>
                <h3 className="text-xl font-bold text-slate-900">Your Current Struggle</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Can't test tools properly without paying first</span>
                </li>
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Stuck editing for hours</span>
                </li>

                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Low views, low motivation</span>
                </li>
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Manually doing everything</span>
                </li>
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Quality's hit or miss</span>
                </li>
                <li className="flex items-start">
                  <FiXCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">Feels like too much effort for too little growth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Plans that match your needs
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our pricing is simple, transparent and adapts to the size of your brand.
            </p>
          </div>



          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Early Creator Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiUsers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Early Creator</h3>
                <p className="text-slate-600 text-sm">For solo creators getting started</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-slate-400 line-through text-lg">$9/mo</span>
                  <span className="text-3xl font-bold text-slate-900 ml-2">$0</span>
                  <span className="text-slate-600 ml-1">today</span>
                </div>
                <p className="text-sm text-slate-500">Free during beta</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700">100 credits/month</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700">Auto-detect viral clips</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700">99% accurate multilingual subtitles</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700">Smart silence & filler removal</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700">Viral title + tag generator</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700">No watermark (even now)</span>
                </li>
                                 <li className="flex items-center">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                     <span className="text-white text-xs font-bold">✓</span>
                   </div>
                   <span className="text-slate-700">Export or auto-post to Shorts, Reels, TikTok</span>
                 </li>
                                 </ul>

                             <div className="mt-8">
                 <a href="#hero" className="block">
                   <button className="w-full btn-gradient py-3 rounded-lg font-semibold text-white hover:transform hover:scale-105 transition-all duration-300">
                     Free now
                   </button>
                 </a>
                 <p className="text-slate-500 text-sm italic text-center mt-2">* No credit card required</p>
               </div>
            </div>

            {/* Beta Pro Plan - Highlighted */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl border-2 border-blue-500 relative hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">Most Popular</span>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiStar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Beta Pro</h3>
                <p className="text-slate-300 text-sm">For power users & small teams</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-slate-400 line-through text-lg">$19/mo</span>
                  <span className="text-3xl font-bold text-white ml-2">$0</span>
                  <span className="text-slate-300 ml-1">today</span>
                </div>
                <p className="text-sm text-slate-400">Free during beta</p>
              </div>

                             <ul className="space-y-3 mb-6">
                 <li className="flex items-center">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                     <span className="text-white text-xs font-bold">✓</span>
                   </div>
                   <span className="text-slate-200">250 credits/month</span>
                 </li>
                 <li className="flex items-center">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                     <span className="text-white text-xs font-bold">✓</span>
                   </div>
                   <span className="text-slate-200">Everything in Creator</span>
                 </li>
                 <li className="flex items-center">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                     <span className="text-white text-xs font-bold">✓</span>
                   </div>
                   <span className="text-slate-200">Team access (2 seats)</span>
                 </li>
                 <li className="flex items-center">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                     <span className="text-white text-xs font-bold">✓</span>
                   </div>
                   <span className="text-slate-200">Custom branding & fonts</span>
                 </li>
                 <li className="flex items-center">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                     <span className="text-white text-xs font-bold">✓</span>
                   </div>
                   <span className="text-slate-200">Post scheduling</span>
                 </li>
                 <li className="flex items-center">
                   <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                     <span className="text-white text-xs font-bold">✓</span>
                   </div>
                   <span className="text-slate-200">Priority processing</span>
                 </li>
                 <li className="flex items-center">
                   <span className="text-2xl mr-3 flex-shrink-0">🚀</span>
                   <span className="text-slate-200 font-bold">Bonus 2 months free after launch</span>
                 </li>
               </ul>

               <div className="mt-2">
                <a href="#hero">
                  <button className="w-full btn-gradient py-3 rounded-lg font-semibold text-white hover:transform hover:scale-105 transition-all duration-300">
                    Get early access
                  </button>
                </a>
                <p className="text-slate-400 text-sm italic text-center mt-2">No credit card required</p>
              </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to take your channel to the next level?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join 100+ beta users using <strong>AI</strong> to clip <strong>highlights</strong>, auto-caption, and boost <strong>reach</strong> daily.
          </p>
          
          {/* Countdown Timer */}
          <div className="mb-8">
            <div className="bg-white rounded-3xl p-4 md:p-8 shadow-2xl border border-gray-200 mb-6">
              <div className="text-center mb-4 md:mb-6">
                <div className="flex items-center justify-center mb-2 md:mb-3">
                  <FiClock className="w-5 h-5 md:w-7 md:h-7 text-black mr-2 md:mr-3" />
                  <span className="text-black font-bold text-lg md:text-xl">⏰ LIMITED TIME OFFER</span>
                </div>
                <p className="text-gray-600 text-sm md:text-base">Get early access before launch pricing kicks in</p>
              </div>
              
              <div className="flex justify-center items-end space-x-3 md:space-x-4 lg:space-x-6">
                {/* Days */}
                <div className="flex flex-col items-center">
                  <div className="flex space-x-0.5 md:space-x-1 lg:space-x-2">
                    {[...countdown.days.toString().padStart(2, '0')].map((digit, i) => (
                      <div key={i} className="relative bg-black h-16 w-8 md:h-20 md:w-12 lg:h-24 lg:w-14 xl:h-32 xl:w-20 rounded-md md:rounded-lg flex items-center justify-center border border-gray-800 shadow-lg mx-0.5">
                        <span className="font-mono font-extrabold text-2xl md:text-4xl lg:text-5xl xl:text-7xl text-white z-10 select-none tracking-wider" style={{letterSpacing: '0.08em', lineHeight: '1.1', fontStretch: 'expanded', transform: 'scaleY(1.4)'}}>
                          {digit}
                        </span>
                        <div className="absolute left-1 right-1 top-1/2 h-0.5 bg-gray-400/40 rounded-full -translate-y-1/2" />
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-500 text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider mt-1">Days</span>
                </div>
                
                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="flex space-x-0.5 md:space-x-1 lg:space-x-2">
                    {[...countdown.hours.toString().padStart(2, '0')].map((digit, i) => (
                      <div key={i} className="relative bg-black h-16 w-8 md:h-20 md:w-12 lg:h-24 lg:w-14 xl:h-32 xl:w-20 rounded-md md:rounded-lg flex items-center justify-center border border-gray-800 shadow-lg mx-0.5">
                        <span className="font-mono font-extrabold text-2xl md:text-4xl lg:text-5xl xl:text-7xl text-white z-10 select-none tracking-wider" style={{letterSpacing: '0.08em', lineHeight: '1.1', fontStretch: 'expanded', transform: 'scaleY(1.4)'}}>
                          {digit}
                        </span>
                        <div className="absolute left-1 right-1 top-1/2 h-0.5 bg-gray-400/40 rounded-full -translate-y-1/2" />
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-500 text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider mt-1">Hours</span>
                </div>
                
                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="flex space-x-0.5 md:space-x-1 lg:space-x-2">
                    {[...countdown.minutes.toString().padStart(2, '0')].map((digit, i) => (
                      <div key={i} className="relative bg-black h-16 w-8 md:h-20 md:w-12 lg:h-24 lg:w-14 xl:h-32 xl:w-20 rounded-md md:rounded-lg flex items-center justify-center border border-gray-800 shadow-lg mx-0.5">
                        <span className="font-mono font-extrabold text-2xl md:text-4xl lg:text-5xl xl:text-7xl text-white z-10 select-none tracking-wider" style={{letterSpacing: '0.08em', lineHeight: '1.1', fontStretch: 'expanded', transform: 'scaleY(1.4)'}}>
                          {digit}
                        </span>
                        <div className="absolute left-1 right-1 top-1/2 h-0.5 bg-gray-400/40 rounded-full -translate-y-1/2" />
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-500 text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider mt-1">Minutes</span>
                </div>
                
                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="flex space-x-0.5 md:space-x-1 lg:space-x-2">
                    {[...countdown.seconds.toString().padStart(2, '0')].map((digit, i) => (
                      <div key={i} className="relative bg-black h-16 w-8 md:h-20 md:w-12 lg:h-24 lg:w-14 xl:h-32 xl:w-20 rounded-md md:rounded-lg flex items-center justify-center border border-gray-800 shadow-lg mx-0.5">
                        <span className="font-mono font-extrabold text-2xl md:text-4xl lg:text-5xl xl:text-7xl text-white z-10 select-none tracking-wider" style={{letterSpacing: '0.08em', lineHeight: '1.1', fontStretch: 'expanded', transform: 'scaleY(1.4)'}}>
                          {digit}
                        </span>
                        <div className="absolute left-1 right-1 top-1/2 h-0.5 bg-gray-400/40 rounded-full -translate-y-1/2" />
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-500 text-[8px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider mt-1">Seconds</span>
                </div>
              </div>
            </div>
          </div>
          
          <a
            href="#hero"
            className="btn-gradient inline-block px-8 py-4 text-white font-semibold rounded-lg text-lg"
          >
            Get Access Now
            <FiArrowRight className="w-5 h-5 ml-2 inline" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Navigation links centered */}
          <div className="flex justify-center space-x-6 text-sm mb-8">
            <a href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>

          {/* Full-width footer logo */}
          <div className="w-full px-0 mb-6">
            <img
              src="/footerlogo.png"
              alt="Makereels Logo"
              className="w-full object-cover"
            />
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 pt-4 text-center text-sm text-slate-400">
            <p>&copy; 2025 Makereels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
