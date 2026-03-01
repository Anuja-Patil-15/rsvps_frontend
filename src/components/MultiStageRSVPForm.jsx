import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import redCarpet from '../assets/redCrapet.jpg'; // Verify this spelling in your folder!

// Corrected API Base URL logic
const api = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/rsvp' 
    : 'https://rsvps-backend.onrender.com/api/rsvp',
});

const MultiStageRSVPForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', tableCompanion: '', dietary: 'No restrictions',
    liquor: '', children: 'No', brunch: 'Yes', tshirtSize: ''
  });

  // Load Razorpay Script on Mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      setError("Payment gateway is loading. Please try again in a moment.");
      return;
    }

    setLoading(true);
    setError('');

    const options = {
      key: "rzp_test_SLpbyLTNPFychl", // REPLACE THIS WITH YOUR KEY FROM DASHBOARD
      amount: 13000, // ₹130 in paise
      currency: "INR",
      name: "The Soirée",
      description: "Guest Registration Fee",
      image: "https://your-logo-url.com/logo.png", // Optional
      handler: async function (response) {
        try {
          // Send data to your backend after successful payment
          await api.post('/', {
            ...formData,
            paymentId: response.razorpay_payment_id,
            paymentStatus: 'success'
          });
          setStep(4);
        } catch (err) {
          console.error(err);
          setError(err.response?.data?.message || "Payment succeeded, but we couldn't save your details. Please contact support.");
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email
      },
      theme: { color: "#f0d58b" },
      modal: {
        ondismiss: () => setLoading(false)
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-white relative overflow-hidden font-sans">
      {/* Background Layer */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${redCarpet})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent z-0" />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-2xl bg-black/40 backdrop-blur-3xl p-8 md:p-16 border border-white/10 rounded-[2rem] shadow-2xl">
        
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-[#ff4d4d] text-[10px] tracking-widest uppercase text-center border border-[#ff4d4d]/30 p-2">
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }} className="text-center">
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
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <h2 className="font-serif text-xl tracking-[0.2em] uppercase text-[#f0d58b] mb-8">Reservation Summary</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-4 backdrop-blur-md">
                <div className="flex justify-between text-[10px] tracking-widest uppercase border-b border-white/5 pb-2">
                  <span className="text-white/40">Guest</span>
                  <span>{formData.name}</span>
                </div>
                <div className="flex justify-between text-[10px] tracking-widest uppercase border-b border-white/5 pb-2">
                  <span className="text-white/40">Access</span>
                  <span>Soirée & Brunch</span>
                </div>
                <div className="flex justify-between text-xl font-serif pt-4">
                  <span className="text-[#f0d58b]">Contribution</span>
                  <span>₹130.00</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#f0d58b] text-black py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.3em] hover:shadow-[0_0_30px_rgba(240,213,139,0.4)] transition-all disabled:opacity-50 mb-6"
              >
                {loading ? 'Processing Payment...' : 'Authorize & Register'}
              </button>

              <button onClick={() => setStep(2)} className="text-white/40 uppercase text-[9px] tracking-widest hover:text-white transition-all">
                ← Edit Information
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
              <div className="text-[#f0d58b] text-6xl mb-8">◈</div>
              <h2 className="text-3xl font-serif tracking-[0.3em] uppercase mb-4">Confirmed</h2>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-12">Your invitation is secured. We await your arrival.</p>
              <button
                onClick={() => { setStep(1); setFormData({ name: '', email: '', tableCompanion: '', dietary: 'No restrictions', liquor: '', children: 'No', brunch: 'Yes', tshirtSize: '' }); }}
                className="text-[#f0d58b] border border-[#f0d58b]/20 px-10 py-4 rounded-full hover:bg-[#f0d58b] hover:text-black transition-all text-[9px] tracking-[0.3em] uppercase"
              >
                Register Another Guest
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 3 && (
          <div className="flex flex-col items-center mt-12 gap-6">
            <button
              onClick={() => {
                if (step === 1) {
                  (formData.name && formData.email) ? setStep(2) : setError("Please provide your name and email.");
                } else if (step === 2) {
                  setStep(3);
                }
              }}
              className="w-full bg-[#f0d58b] text-black py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.3em] hover:shadow-[0_0_30px_rgba(240,213,139,0.4)] transition-all"
            >
              {step === 1 ? 'Proceed to Details' : 'Review Summary'}
            </button>

            {step === 2 && (
              <button onClick={() => setStep(1)} className="text-white/40 uppercase text-[9px] tracking-widest hover:text-white transition-all">
                ← Previous Step
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStageRSVPForm;