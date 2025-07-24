'use client';

import { useState } from 'react';
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
      icon: <FiScissors className="w-5 h-5" />,
      title: "AI Clipping",
      description: "Auto-detect viral-worthy moments"
    },
    {
      id: 'ai-captioning',
      icon: <FiTag className="w-5 h-5" />,
      title: "AI Captioning",
      description: "Generate accurate, stylish subtitles"
    },
    {
      id: 'ai-reframe',
      icon: <FiEye className="w-5 h-5" />,
      title: "AI Reframe",
      description: "Optimize for different platforms"
    },
    {
      id: 'ai-broll',
      icon: <FiPlay className="w-5 h-5" />,
      title: "AI B-Roll",
      description: "Auto-generate complementary footage"
    },
    {
      id: 'ai-audio',
      icon: <FiZap className="w-5 h-5" />,
      title: "AI Audio Enhance",
      description: "Crystal clear audio optimization"
    },
    {
      id: 'ai-voiceover',
      icon: <FiStar className="w-5 h-5" />,
      title: "AI Voice-over",
      description: "Natural-sounding voice synthesis"
    }
  ];





  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FiPlay className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-slate-900">Automation Tool</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
            </nav>
            
            <div className="flex items-center space-x-4">
              <a href="#features" className="nav-link text-slate-600 hover:text-slate-900">Features</a>
              <a href="#pricing" className="nav-link text-slate-600 hover:text-slate-900">Pricing</a>
              <a href="#login" className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm">Login</a>
              <a href="#signup" className="btn-gradient px-4 py-2 rounded-lg text-white text-sm">Sign Up</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 mb-4">
              Post more ⚡ Grow faster
            </h2>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Turn <span className="elevated-underline">Raw Video</span> into{' '}
              <span className="hero-gradient">Viral Shorts</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Let AutomationTool do the <em className="italic">"Boring"</em> work so you can do what you ❤️
            </p>

            {/* Email Signup Form */}
            {!isSubmitted ? (
              <div className="max-w-2xl mx-auto mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                                     <div className="bg-slate-800 rounded-2xl p-1 flex items-center">
                     <div className="flex-1 flex items-center px-3 py-2">
                       <FiPlay className="w-5 h-5 text-slate-400 mr-2" />
                       <input
                         type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="Drop your email to join the beta"
                         className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-lg"
                         disabled={isLoading}
                       />
                     </div>
                                           <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-white text-slate-900 px-6 py-2 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:bg-slate-50 transition-colors"
                      >
                      {isLoading ? 'Signing up...' : (
                        <>
                          Get Early Access
                          <FiArrowRight className="w-5 h-5 ml-2" />
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
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center">
                    <FiCheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Thanks for signing up!</h3>
                      <p className="text-green-700">We'll notify you when the beta launches.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

                         {/* P.S. Text */}
             <p className="text-slate-500 text-xs -mt-6 mb-6">
               ✉️ P.S. Access details will be shared via email. Limited beta slots — don't miss out.
             </p>

             {/* Launch Offer */}
             <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 max-w-2xl mx-auto">
               <div className="flex items-center justify-center mb-3">
                 <FiGift className="w-5 h-5 text-purple-600 mr-2" />
                 <span className="text-purple-600 font-semibold">Launch Offer</span>
               </div>
               <p className="text-slate-700 mb-2">
                 <strong>Free until launch.</strong>
               </p>
               <p className="text-slate-600 text-sm">
                 🎁 Bonus: Get 2 months of Pro access after launch — only if you sign up early.
               </p>
             </div>
          </div>
        </div>
      </section>



      {/* AI Features Row */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI-Powered Video Automation
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Every creator is becoming video-first. Automation Tool helps your content stay top of mind.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {aiFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`feature-card text-left ${
                  activeFeature === feature.id ? 'active' : ''
                }`}
              >
                <div className={`mb-3 ${activeFeature === feature.id ? 'text-white' : 'text-slate-400'}`}>
                  {feature.icon}
                </div>
                <h3 className={`font-semibold mb-1 ${
                  activeFeature === feature.id ? 'text-white' : 'text-white'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${
                  activeFeature === feature.id ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  {feature.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to revolutionize your content creation?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of creators who are already automating their viral shorts creation.
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
              <span className="ml-3 text-xl font-bold">Automation Tool</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Automation Tool. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
