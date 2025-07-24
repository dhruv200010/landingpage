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
  FiGift 
} from 'react-icons/fi';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeFeature, setActiveFeature] = useState('ai-clipping');
  const [currentSlide, setCurrentSlide] = useState(0);

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
    
    // Simulate API call - replace with your actual backend integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the email to your backend
      // For now, we'll just simulate success
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
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FiPlay className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-lg md:text-xl font-bold text-slate-900">AI Video Editor</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
            </nav>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <a href="#features" className="nav-link text-slate-600 hover:text-slate-900 hidden sm:block">Features</a>
              <a href="#pricing" className="nav-link text-slate-600 hover:text-slate-900 hidden sm:block">Pricing</a>
              <a href="#login" className="px-2 md:px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-xs md:text-sm">Login</a>
              <a href="#signup" className="btn-gradient px-2 md:px-4 py-2 rounded-lg text-white text-xs md:text-sm">Sign Up</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-6 md:py-8">
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
                  <div className="flex items-center">
                    <FiCheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-green-800">Thanks for signing up!</h3>
                      <p className="text-sm md:text-base text-green-700">We'll notify you when the beta launches.</p>
                    </div>
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
      <section className="py-4 md:py-6 bg-white">
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



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to create viral content effortlessly?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join creators who are already using AI to find viral moments, add captions, and generate engaging titles automatically.
          </p>
          <a
            href="#signup"
            className="btn-gradient inline-block px-8 py-4 text-white font-semibold rounded-lg text-lg"
          >
            Get Early Access
            <FiArrowRight className="w-5 h-5 ml-2 inline" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FiPlay className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold">AI Video Editor</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 AI Video Editor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
