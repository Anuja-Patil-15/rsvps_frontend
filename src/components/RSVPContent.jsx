import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RSVPContent = () => {
  const navigate = useNavigate();

  // Standard Luxury Colors derived from the provided images
  const goldPrimary = "#f0d58b"; // From RSVP text in image_7dc39c.jpg
  const deepRed = "#7c0000";    // From the red carpet in image_7e3bb6.jpg

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 md:p-8 text-white relative font-sans">
      
      <div className="relative z-10 text-center max-w-6xl w-full space-y-6 md:space-y-10">
        
        {/* Header Intro - Classic Gold on Dark */}
        <h4 className={`text-[${goldPrimary}] text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase leading-loose md:leading-relaxed max-w-2xl mx-auto opacity-90`}>
          Twin City Global Friends Initiative Presents: <br className="md:hidden" /> Family & Friends Soirée & Brunch
        </h4>
        
        {/* Main RSVP Title - Standardized Gold */}
        <h1 className={`text-[${goldPrimary}] text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]`}>
          RSVP
        </h1>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-4 text-center md:text-left">
          
          {/* DAY 1 */}
          <div className="space-y-4 md:border-r md:border-white/10 px-2 md:px-6">
            <h5 className={`text-[${goldPrimary}] font-bold border-b border-[${goldPrimary}]/30 inline-block pb-1 tracking-widest text-sm uppercase italic`}>
              Day 1 | Labor Day Wknd
            </h5>
            <div className="space-y-3">
              <p className="text-sm md:text-base font-semibold uppercase tracking-tight leading-snug">
                Sat, Sept 5 | 6PM-12AM | 
                <a 
                  href="https://www.grandoccasionslaurel.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-[${goldPrimary}] hover:text-white underline ml-1 transition-colors inline-block decoration-1 underline-offset-4`}
                >
                  Grand Occasions, Laurel
                </a>
              </p>
              <p className="text-[12px] md:text-xs text-white/80 leading-relaxed font-light">
                Attire - Gentlemen: Strictly Black Suit & Bow-tie, Ladies: Elegant Dress | $130 Single / $250 Couples 
                <br className="hidden md:block" />
                <span className="mt-2 block md:inline italic md:not-italic text-white/60">
                  (Includes: Red Carpet Event, Complimentary Childcare, Open Bar and more)
                </span>
              </p>
            </div>
          </div>

          {/* DAY 2 */}
          <div className="space-y-4 px-2 md:px-6">
            <h5 className={`text-[${goldPrimary}] font-bold border-b border-[${goldPrimary}]/30 inline-block pb-1 tracking-widest text-sm uppercase italic`}>
              Day 2 | Sunday Brunch
            </h5>
            <div className="space-y-3">
              <p className="text-sm md:text-base font-semibold uppercase tracking-tight leading-snug">
                Sun, Sept 6 | 12PM-5PM | <span className={`text-[${goldPrimary}] block md:inline`}>Location: TBC (Maryland)</span>
              </p>
              <p className="text-[12px] md:text-xs text-white/80 leading-relaxed font-light">
                Casual Vibes (TCGFI T-Shirt) | Complimentary for All Guests | A relaxed brunch to connect, 
                unwind, and continue the Labor Day celebration.
              </p>
            </div>
          </div>
        </div>

        {/* Standard Action Button - Replaced Blue with Decent Crimson/Gold */}
        <div className="pt-6">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(240, 213, 139, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/InvitationForm')}
            className={`w-full md:w-auto bg-gradient-to-r from-[${deepRed}] to-[#a00000] text-white border border-[${goldPrimary}]/50 px-10 md:px-16 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-3 mx-auto uppercase tracking-[0.2em] text-xs`}
          >
            RSVP & Pay <span className="text-xl md:text-2xl leading-none">→</span>
          </motion.button>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-4">Standard Entry Requirements Apply</p>
        </div>
      </div>
    </div>
  );
};

export default RSVPContent;