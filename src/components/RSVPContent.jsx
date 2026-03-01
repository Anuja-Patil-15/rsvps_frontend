import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RSVPContent = () => {
  const navigate = useNavigate();
  const goldPrimary = "#f0d58b";
  const deepRed = "#7c0000";

  // 1. Parent Sequence Orchestration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8, // Timing between major sections
      },
    },
  };

  // 2. Character Reveal Variants for that cinematic "Birthday Brunch" look
  const charVariants = {
    hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)", y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // 3. Block Text Variants (Keeps your full text content intact)
  const blockFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  // Helper for Character-by-Character animation
  const CharacterReveal = ({ text, className, staggerDelay = 0.05 }) => (
    <motion.div className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          transition={{ delay: index * staggerDelay }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-1 md:p-8 text-white relative font-sans overflow-hidden">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-6xl w-full space-y-10 md:space-y-16"
      >

        {/* STEP 1: First Line Character Reveal */}
       <motion.div 
  variants={blockFade} 
  className="max-w-3xl mx-auto"
>
  <CharacterReveal
    text="TWIN CITY GLOBAL FRIENDS INITIATIVE PRESENTS: FAMILY & FRIENDS SOIRÉE & BRUNCH"
    staggerDelay={0.02}
    className={`text-[${goldPrimary}] text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase leading-relaxed`}
  />
</motion.div>

        {/* STEP 2: RSVP Single Character Reveal */}
        <CharacterReveal
          text="RSVP"
          staggerDelay={0.15}
          className={`text-[${goldPrimary}] text-5xl sm:text-6xl md:text-[9rem] font-black tracking-widest drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]`}
        />

        {/* STEP 3: Day 1 & Day 2 Sections (Sliding in from center) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 text-center md:text-left">

          {/* DAY 1 - Full Content */}
          <motion.div variants={blockFade} className="space-y-6 md:border-r md:border-white/10 px-6">
            <CharacterReveal
              text="DAY 1 | LABOR DAY WKND"
              className={`text-[${goldPrimary}] font-bold border-b border-[${goldPrimary}]/30 inline-block pb-1 tracking-[0.2em] text-sm italic`}
            />
            <div className="space-y-4">
              <p className="text-sm md:text-base font-bold uppercase tracking-widest leading-snug">
                Sat, Sept 5 | 6PM-12AM |
                <a
                  href="https://www.grandoccasionslaurel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[${goldPrimary}] hover:text-white underline ml-2 transition-colors inline-block decoration-1 underline-offset-4`}
                >
                  Grand Occasions, Laurel
                </a>
              </p>
              <p className="text-[12px] md:text-sm text-white/80 leading-relaxed font-light">
                Attire - Gentlemen: Strictly Black Suit & Bow-tie, Ladies: Elegant Dress | $130 Single / $250 Couples
                <br className="hidden md:block" />
                <span className="mt-3 block italic text-white/50">
                  (Includes: Red Carpet Event, Complimentary Childcare, Open Bar and more)
                </span>
              </p>
            </div>
          </motion.div>

          {/* DAY 2 - Full Content */}
          <motion.div variants={blockFade} className="space-y-6 px-6">
            <CharacterReveal
              text="DAY 2 | SUNDAY BRUNCH"
              className={`text-[${goldPrimary}] font-bold border-b border-[${goldPrimary}]/30 inline-block pb-1 tracking-[0.2em] text-sm italic`}
            />
            <div className="space-y-4">
              <p className="text-sm md:text-base font-bold uppercase tracking-widest leading-snug">
                Sun, Sept 6 | 12PM-5PM | <span className={`text-[${goldPrimary}] block md:inline`}>Location: TBC (Maryland)</span>
              </p>
              <p className="text-[12px] md:text-sm text-white/80 leading-relaxed font-light">
                Casual Vibes (TCGFI T-Shirt) | Complimentary for All Guests | A relaxed brunch to connect,
                unwind, and continue the Labor Day celebration.
              </p>
            </div>
          </motion.div>
        </div>

        {/* STEP 4: Final Button Reveal */}
        <motion.div variants={blockFade} className="pt-8">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(240, 213, 139, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/InvitationForm')}
            className={`w-full md:w-auto bg-gradient-to-r from-[${deepRed}] to-[#a00000] text-white border border-[${goldPrimary}]/50 px-12 md:px-24 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all flex items-center justify-center gap-4 mx-auto`}
          >
            RSVP & Pay <span className="text-2xl leading-none">→</span>
          </motion.button>
          <motion.p variants={blockFade} className="text-[10px] text-white/30 uppercase tracking-[0.5em] mt-8">
            Standard Entry Requirements Apply
          </motion.p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default RSVPContent;