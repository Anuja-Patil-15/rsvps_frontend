import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import redCarpet from '../assets/redCrapet.jpg';

const api = axios.create({
  baseURL: 'https://rsvps-backend.onrender.com/api/rsvp',
});

const MultiStageRSVPForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', tableCompanion: '', dietary: '',
    liquor: '', children: '', brunch: '', tshirtSize: ''
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/submit', formData);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'The guest list is currently full.');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for the "YouTube-style" font reveals
  const textVariant = {
    hidden: { opacity: 0, y: 20, letterSpacing: "0.5em" },
    visible: { 
      opacity: 1, 
      y: 0, 
      letterSpacing: "0.2em",
      transition: { duration: 1.2, ease: "easeOut" } 
    }
  };

  const labelClasses = "block text-[10px] font-bold mb-3 text-[#f0d58b] uppercase tracking-[0.3em] font-serif";
  const inputClasses = "w-full bg-white/5 backdrop-blur-xl border-b border-white/20 px-4 py-4 outline-none focus:border-[#f0d58b] transition-all text-white placeholder:text-white/20 mb-6 font-light";
  const pillButtonClasses = (isSelected) => `px-8 py-3 rounded-full border transition-all text-[9px] uppercase tracking-widest ${isSelected ? 'bg-[#f0d58b] text-black border-[#f0d58b] shadow-[0_0_20px_rgba(240,213,139,0.3)]' : 'border-white/20 text-white/60 hover:border-white'}`;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background with subtle parallax-like zoom */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${redCarpet})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent z-0" />

      <div className="relative z-10 w-full max-w-2xl bg-black/40 backdrop-blur-3xl p-8 md:p-16 border border-white/10 rounded-[2rem] shadow-2xl">
        
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-[#ff4d4d] text-[10px] tracking-widest uppercase text-center border border-[#ff4d4d]/30 p-2">
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial="hidden" animate="visible" exit="hidden" className="text-center">
              <motion.h1 variants={textVariant} className="text-4xl md:text-6xl font-serif mb-2 tracking-[0.3em] uppercase italic">
                The Soirée
              </motion.h1>
              <motion.p variants={textVariant} className="text-[#f0d58b] text-[10px] mb-12 uppercase tracking-[0.4em]">
                Formal Invitation & Guest Registration
              </motion.p>
              
              <div className="text-left space-y-4">
                <label className={labelClasses}>Full Distinguished Name</label>
                <input type="text" placeholder="Johnathan Doe" className={inputClasses} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                
                <label className={labelClasses}>Electronic Mail</label>
                <input type="email" placeholder="rsvp@soiree.com" className={inputClasses} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-10">
              <h2 className="text-center font-serif text-xl tracking-[0.2em] uppercase text-[#f0d58b] mb-12">Accommodations</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClasses}>Dietary Preferences</label>
                  <div className="flex flex-col gap-3">
                    {['No restrictions', 'Vegetarian', 'Vegan'].map((option) => (
                      <button key={option} type="button" onClick={() => setFormData({ ...formData, dietary: option })} className={pillButtonClasses(formData.dietary === option)}>{option}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>T-Shirt Size (Commemorative)</label>
                  <select className={`${inputClasses} mt-2`} value={formData.tshirtSize} onChange={(e) => setFormData({ ...formData, tshirtSize: e.target.value })}>
                    <option value="" className="bg-neutral-900">Select...</option>
                    {['S', 'M', 'L', 'XL', '2XL'].map(size => <option key={size} value={size} className="bg-neutral-900">{size}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClasses}>Preferred Libations (Wine/Liquor)</label>
                <input type="text" placeholder="e.g. Cabernet, Grey Goose" className={inputClasses} value={formData.liquor} onChange={(e) => setFormData({ ...formData, liquor: e.target.value })} />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
              <div className="text-[#f0d58b] text-6xl mb-8">◈</div>
              <h2 className="text-3xl font-serif tracking-[0.3em] uppercase mb-4">Confirmed</h2>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-12">We await your arrival in black-tie attire.</p>
              <button 
                onClick={() => { setStep(1); setFormData({name:'', email:'', tableCompanion:'', dietary:'', liquor:'', children:'', brunch:'', tshirtSize:''}); }} 
                className="text-[#f0d58b] border border-[#f0d58b]/20 px-8 py-3 rounded-full hover:bg-[#f0d58b] hover:text-black transition-all text-[9px] tracking-widest uppercase"
              >
                Register Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 3 && (
          <div className="flex flex-col items-center mt-12 gap-6">
            <button
              onClick={() => step === 1 ? (formData.name && formData.email ? setStep(2) : setError("Please state your name and email.")) : handleSubmit()}
              disabled={loading}
              className="w-full bg-[#f0d58b] text-black py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.3em] hover:shadow-[0_0_30px_rgba(240,213,139,0.4)] transition-all disabled:opacity-50"
            >
              {loading ? 'Submitting...' : step === 1 ? 'Proceed to Details' : 'Finalize Reservation'}
            </button>
            
            {step > 1 && (
              <button onClick={() => setStep(1)} className="text-white/40 uppercase text-[9px] tracking-widest hover:text-white transition-all">
                ← Modify Previous Details
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStageRSVPForm;