import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MultiStageRSVPForm from './MultiStageRSVPForm'; // Ensure path is correct
import redCarpetImage from '../assets/redCrapet.jpg'; 
import RSVPContent from './RSVPContent';

const GrandInvitation = () => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // Elegant delay before the gates open
    const timer = setTimeout(() => setIsOpened(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const gold = "#f0d58b";
  const matteBlack = "#0d0d0d";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center font-serif">
      
      {/* LAYER 1: THE REVEALED BACKGROUND */}
      <motion.div 
        initial={{ scale: 1.1, filter: 'blur(8px)' }}
        animate={isOpened ? { scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 3.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${redCarpetImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      </motion.div>

      {/* LAYER 2: THE LUXURY OPENING GATES */}
      <AnimatePresence>
        {!isOpened && (
          <div className="absolute inset-0 z-50 overflow-hidden">
            {/* Top Gate */}
            <motion.div
              exit={{ y: '-100%' }}
              transition={{ duration: 2.2, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-0 border-b border-[#f0d58b]/30"
              style={{ backgroundColor: matteBlack, clipPath: "polygon(0 0, 100% 0, 50% 50%)" }}
            />
            {/* Bottom Gate */}
            <motion.div
              exit={{ y: '100%' }}
              transition={{ duration: 2.2, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-0 border-t border-[#f0d58b]/30"
              style={{ backgroundColor: matteBlack, clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
            />
            {/* Left Gate */}
            <motion.div
              exit={{ x: '-100%' }}
              transition={{ duration: 2.2, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-0 border-r border-[#f0d58b]/30"
              style={{ backgroundColor: matteBlack, clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
            />
            {/* Right Gate */}
            <motion.div
              exit={{ x: '100%' }}
              transition={{ duration: 2.2, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-0 border-l border-[#f0d58b]/30"
              style={{ backgroundColor: matteBlack, clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}
            />

            {/* CENTER SEAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              transition={{ duration: 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]"
            >
              <div className="w-40 h-40 rounded-full bg-black border-2 border-[#f0d58b] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(240,213,139,0.3)]">
                <span className="text-[#f0d58b] text-[10px] tracking-[0.5em] uppercase mb-1">Invitation</span>
                <h2 className="text-[#f0d58b] text-4xl font-light tracking-widest uppercase italic">VIP</h2>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LAYER 3: RSVP FORM REVEAL */}
      <AnimatePresence>
        {isOpened && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.2, duration: 1.5 }}
            className="relative z-30 w-full max-w-4xl px-4"
          >
            <RSVPContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AMBIENT LUXURY LIGHTING */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_rgba(240,213,139,0.1)_0%,_transparent_70%)] pointer-events-none"
      />
    </div>
  );
};

export default GrandInvitation;