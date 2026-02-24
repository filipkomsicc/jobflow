/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Calendar,
  Users,
  TrendingUp,
  ShieldCheck,
  Clock,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Cal, { getCalApi } from "@calcom/embed-react";
import ReactMarkdown from "react-markdown";
import privacyPolicy from "./content/privacy-policy.md?raw";
import termsofService from "./content/terms-of-service.md?raw";

const Navbar = ({ setView }: { setView: (view: 'home' | 'privacy' | 'terms') => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      setView('home');
      setIsOpen(false);
    }
  };


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <img
                src="src/img/jobflow-logo-transparent.png"
              alt="JobFlowCrew Logo"
              className="h-10 w-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#problem" onClick={(e) => handleNavClick(e, '#problem')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">The Problem</a>
            <a href="#approach" onClick={(e) => handleNavClick(e, '#approach')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Our Approach</a>
            <a href="#why-us" onClick={(e) => handleNavClick(e, '#why-us')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Why Us</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">FAQ</a>
            <a
              href="#final-cta"
              onClick={(e) => handleNavClick(e, '#final-cta')}
              className="bg-brand text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-brand-dark transition-all shadow-sm"
            >
              See If You Qualify
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="#problem" onClick={(e) => handleNavClick(e, '#problem')} className="block px-3 py-2 text-base font-medium text-zinc-600 hover:text-zinc-900">The Problem</a>
              <a href="#approach" onClick={(e) => handleNavClick(e, '#approach')} className="block px-3 py-2 text-base font-medium text-zinc-600 hover:text-zinc-900">Our Approach</a>
              <a href="#why-us" onClick={(e) => handleNavClick(e, '#why-us')} className="block px-3 py-2 text-base font-medium text-zinc-600 hover:text-zinc-900">Why Us</a>
              <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="block px-3 py-2 text-base font-medium text-zinc-600 hover:text-zinc-900">FAQ</a>
              <div className="pt-4">
                <a
                  href="#final-cta"
                  onClick={(e) => handleNavClick(e, '#final-cta')}
                  className="block w-full bg-brand text-white px-5 py-3 rounded-xl text-base font-medium text-center"
                >
                  See If You Qualify
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-zinc-900">{question}</span>
        <ChevronDown className={`text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-zinc-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'privacy' | 'terms'>('home');

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#e87a00"},"dark":{"cal-brand":"#e87a00"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  const PrivacyPolicy = () => (
  <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <button
      onClick={() => setView("home")}
      className="text-brand font-medium mb-8 flex items-center hover:underline"
    >
      <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Home
    </button>

      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
    <div className="prose prose-zinc">
      <ReactMarkdown>{privacyPolicy}</ReactMarkdown>
    </div>
  </div>
);

  const TermsOfService = () => (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={() => setView('home')} className="text-brand font-medium mb-8 flex items-center hover:underline">
        <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Home
      </button>
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
    <div className="prose prose-zinc">
      <ReactMarkdown>{termsofService}</ReactMarkdown>
    </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-brand-light selection:text-brand-dark overflow-x-hidden">
      <Navbar setView={setView} />

      {view === 'privacy' && <PrivacyPolicy />}
      {view === 'terms' && <TermsOfService />}

      {view === 'home' && (
        <>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="src/public/remodel.jpg"
                // src="src/img/jobflow-logo-transparent.png"
		  className="w-full h-full object-cover"

                alt="Modern Remodel Background"
                className="w-full h-full object-cover blur-[2px] brightness-[0.85]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                {/* <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-brand bg-brand-light rounded-full border border-brand/10">
                  Not Another Marketing Agency
                </span> */}
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
                  More Estimates. Fewer Tire-Kickers. <br className="hidden md:block" />
                  A JobFlow That Actually Moves.
                </h1>
                <p className="text-lg md:text-xl text-zinc-600 mb-10 leading-relaxed">
                  JobFlowCrew helps remodelers and contractors consistently get qualified estimates booked into their calendar - without chasing leads, wasting time on low-budget shoppers, or dealing with generic marketing fluff.
                </p>
                <div className="flex flex-col items-center space-y-4">
                  <a
                    href="#final-cta"
                    className="group relative bg-brand text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-dark transition-all shadow-lg hover:shadow-brand/30 flex items-center"
                  >
                    See If You Qualify
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </a>
                <p className="text-sm md:text-l text-zinc-600 mb-10 leading-relaxed font-medium">
                    Built for owner-operators who want steady jobs — not more marketing headaches.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Background Accents */}
            <div className="absolute inset-0 -z-0 pointer-events-none opacity-40 overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-light/50 rounded-full blur-3xl" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-50/50 rounded-full blur-3xl" />
            </div>
          </section>

          {/* The Problem Section */}
          <section id="problem" className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                    You’re Good At The Work. <br />
                    The Pipeline Isn’t Always.
                  </h2>
                  <div className="space-y-4 text-zinc-600 text-lg leading-relaxed">
                    <p>Most contractors don’t struggle because of skill. They struggle because lead flow is unpredictable.</p>
                    <p>One month is packed. The next month is quiet. You get flooded with messages - but half are price shoppers, DIY planners, or people “just exploring.”</p>
                    <p className="font-medium text-zinc-900">Meanwhile, agencies talk about clicks, SEO reports, and impressions while you’re still wondering:</p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-center text-zinc-900">
                        <X className="text-red-500 mr-3" size={20} /> Who’s actually serious?
                      </li>
                      <li className="flex items-center text-zinc-900">
                        <X className="text-red-500 mr-3" size={20} /> Who has a real budget?
                      </li>
                      <li className="flex items-center text-zinc-900">
                        <X className="text-red-500 mr-3" size={20} /> Who is ready to schedule an estimate now?
                      </li>
                    </ul>
                    <p className="mt-6">You don’t need more noise. You need the right conversations.</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 relative"
                >
                  <div className="absolute -top-4 -right-4 bg-brand text-white p-3 rounded-2xl shadow-lg">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-zinc-100 p-2 rounded-lg"><Clock className="text-zinc-400" size={20} /></div>
                      <div>
                        <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">The Old Way</p>
                        <p className="text-zinc-900 font-semibold">Chasing leads at 8 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-zinc-100 p-2 rounded-lg"><MessageSquare className="text-zinc-400" size={20} /></div>
                      <div>
                        <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">The Old Way</p>
                        <p className="text-zinc-900 font-semibold">"Just wondering about price..."</p>
                      </div>
                    </div>
                    <div className="h-px bg-zinc-100 my-4" />
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-light p-2 rounded-lg"><Calendar className="text-brand" size={20} /></div>
                      <div>
                        <p className="text-brand text-sm font-medium uppercase tracking-wider">The JobFlow Way</p>
                        <p className="text-zinc-900 font-semibold">Confirmed estimate on your calendar</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>



          {/* Others vs You Section */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                  Most Marketing Is Built For The Agency. <br className="hidden md:block" />
                  Not The Contractor.
                </h2>
                <p className="text-lg text-zinc-600">
                  Look around the industry and you’ll see the same promises repeated: rankings, branding, omnipresence, content strategies.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
                  <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-4">The Standard Agency</p>
                  <p className="text-zinc-600 mb-6">Those things sound impressive — but they don’t fix the real problem: Unqualified leads and a calendar that depends on luck.</p>
                  <ul className="space-y-3">
                    {['Vanity metrics (clicks/impressions)', 'Generic SEO reports', 'Massive long-term contracts', 'No accountability for jobs'].map((item, i) => (
                      <li key={i} className="flex items-center text-zinc-500 text-sm">
                        <X className="mr-2 text-zinc-300" size={16} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 rounded-3xl bg-brand-light border border-brand/10 ring-2 ring-brand/5">
                  <p className="text-brand text-sm font-bold uppercase tracking-widest mb-4">JobFlowCrew</p>
                  <p className="text-zinc-900 font-medium mb-6">JobFlowCrew focuses on one outcome: Consistent estimates booked with people who are serious about hiring.</p>
                  <ul className="space-y-3">
                    {['Qualified estimate bookings', 'Serious intent filtering', 'Steady pipeline rhythm', 'Selective area exclusivity'].map((item, i) => (
                      <li key={i} className="flex items-center text-zinc-900 text-sm font-medium">
                        <CheckCircle2 className="mr-2 text-brand" size={16} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-12 text-center">
                <p className="text-xl font-medium text-zinc-900 italic">
                  "We don’t sell features. We build a steady flow of conversations that can turn into jobs."
                </p>
              </div>
            </div>
          </section>






          {/* Word from the Founder */}
          <section className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-zinc-100">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="rounded-2xl bg-zinc-100 flex-shrink-0 overflow-hidden self-stretch md:w-1/2">
                    <img
                      src="src/public/filip-founder.jpeg"
                      alt="Founder"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-zinc-900 mb-6">A Straightforward Approach</h2>
                    <div className="space-y-4 text-zinc-600 text-lg leading-relaxed">
                      <p>Most contractors don’t need more complicated marketing. They need a system that respects how real remodeling and construction businesses operate.</p>
                      <p className="font-bold text-zinc-900">JobFlowCrew was built around one idea:</p>
                      <p className="italic bg-brand-light p-4 rounded-xl border-l-4 border-brand text-zinc-900">
                        If you can keep a steady flow of serious estimate conversations coming in, growth stops feeling unpredictable.
                      </p>
                      <p>No inflated promises. No bloated strategies. Just a structured way to connect you with homeowners ready to move forward.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>






          {/* The JobFlow Approach */}
          <section id="approach" className="py-24 bg-zinc-900 text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8">The JobFlow Engine</h2>
                  <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                    Instead of throwing traffic at your phone and hoping for the best, JobFlowCrew builds a system designed to:
                  </p>
                  <div className="space-y-6">
                    {[
                      { title: "Targeted Attraction", desc: "Bring in homeowners actively planning projects" },
                      { title: "Intent Filtering", desc: "Filter out low-intent inquiries before they waste your time" },
                      { title: "Schedule Management", desc: "Handle the back-and-forth and get estimates scheduled" },
                      { title: "Pipeline Momentum", desc: "Keep your pipeline moving without you babysitting leads" }
                    ].map((item, i) => (
                      <div key={i} className="flex space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center text-brand font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-zinc-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-12 text-xl font-medium text-brand">
                    You don’t need another dashboard. <br />
                    You need a steady rhythm of real opportunities.
                  </p>
                </div>
                <div className="relative">
                  <div className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">System_Active</div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-700/50 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="text-brand" size={20} />
                          <span className="text-sm font-medium">Qualified Homeowner Identified</span>
                        </div>
                        <span className="text-[10px] text-zinc-500">2m ago</span>
                      </div>
                      <div className="p-4 bg-brand/10 rounded-xl border border-brand/20 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <ShieldCheck className="text-brand" size={20} />
                          <span className="text-sm font-medium">Budget & Timeline Verified</span>
                        </div>
                        <CheckCircle2 className="text-brand" size={16} />
                      </div>
                      <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-700/50 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Calendar className="text-brand" size={20} />
                          <span className="text-sm font-medium">Estimate Booked: Thursday 2 PM</span>
                        </div>
                        <span className="text-xs text-brand font-bold">NEW</span>
                      </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-zinc-700/50 flex justify-between items-end">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase mb-1">Weekly Momentum</p>
                        <p className="text-2xl font-bold">+12 Estimates</p>
                      </div>
                      <TrendingUp className="text-brand" size={32} />
                    </div>
                  </div>
                  {/* Decorative Glow */}
                  <div className="absolute -inset-10 bg-brand/10 blur-3xl rounded-full -z-10" />
                </div>
              </div>
            </div>
          </section>

          {/* What Changes Section */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">From Random Leads To A Controlled JobFlow</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-zinc-200 shadow-sm">
                <div className="p-10 bg-zinc-50">
                  <h3 className="text-xl font-bold text-zinc-400 mb-8 uppercase tracking-widest">The Before</h3>
                  <ul className="space-y-6">
                    {[
                      "Referrals are unpredictable",
                      "Leads ghost after asking for price",
                      "Evenings spent texting back prospects",
                      "Weeks with no new estimates booked"
                    ].map((text, i) => (
                      <li key={i} className="flex items-start">
                        <X className="mr-4 text-zinc-300 mt-1" size={20} />
                        <span className="text-zinc-500 text-lg">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-10 bg-white border-l border-zinc-200 relative">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-brand text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter">Optimized</div>
                  </div>
                  <h3 className="text-xl font-bold text-brand mb-8 uppercase tracking-widest">The After</h3>
                  <ul className="space-y-6">
                    {[
                      "A steady stream of booked estimate calls",
                      "Fewer “just curious” inquiries",
                      "Clear pipeline visibility",
                      "More time focused on projects instead of chasing work"
                    ].map((text, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="mr-4 text-brand mt-1" size={20} />
                        <span className="text-zinc-900 font-medium text-lg">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>




<section id="why-us" className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

	    <div className="grid md:grid-cols-3 gap-8">
  {[
    {
      quote: "Before JobFlowCrew, most leads felt like a waste of time. Now I’m talking to people who already know what they want. My calendar finally feels consistent.",
      name: "Mark Rogers",
      role: "MarkRemodels",
      image: "src/public/mark.jpg" // put file in /public
    },
    {
      quote: "I used to spend hours chasing messages. Now the estimates are already lined up. I just show up and do what I do best.",
      name: "Daniel Brooks",
      role: "GreatConstruction Group",
      image: "src/public/daniel.jpg"
    },
    {
      quote: "It feels less like marketing and more like having someone keeping the pipeline moving behind the scenes.",
      name: "Anthony Miller",
      role: "General Contractor",
      image: "src/public/anthony.jpg" // leave empty to fallback to grey circle
    }
  ].map((testimonial, i) => (
    <div key={i} className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 relative">
      <Quote className="text-brand/20 absolute top-6 right-6" size={40} />

      <p className="text-zinc-700 text-lg leading-relaxed mb-6 italic">
        “{testimonial.quote}”
      </p>

      <div className="flex items-center">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-zinc-200 mr-3" />
        )}

        <div>
          <p className="text-sm font-bold text-zinc-900">
            {testimonial.name}
          </p>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

            </div>
</section>




          {/* Why Remodelers Work With Us */}
          <section id="why-us" className="py-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                  Built For Contractors Who Want Real Growth - Not Marketing Theory
                </h2>
                <p className="text-lg text-zinc-600 leading-relaxed">
                  Projects can take time. Homeowners research for months before reaching out. Most agencies still treat contractors like high-volume service companies. That’s where they miss the mark.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Serious Homeowners", desc: "We target people with real budgets and verified intent." },
                  { title: "Qualified Conversations", desc: "Focus on quality over raw, noisy lead volume." },
                  { title: "Hands-on Strategy", desc: "Tailored specifically to your service area and project types." },
                  { title: "Selective Partnerships", desc: "We don't mass-onboard. We focus on deep, local success." }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-zinc-900 mb-2">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 bg-zinc-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                <div className="md:mr-8">
                  <h3 className="text-2xl font-bold mb-2">Area Exclusivity Guaranteed</h3>
                  <p className="text-zinc-400">We don’t try to work with everyone. You won’t compete with another contractor using the same system down the street.</p>
                </div>
              </div>
            </div>
          </section>





          {/* FAQ Section */}
          <section id="faq" className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-2">
                <FAQItem
                  question="Do you work with all contractors?"
                  answer="We focus primarily on remodeling companies that want consistent growth and can handle incoming estimates, however we do take on different contractors if we see a fit."
                />
                <FAQItem
                  question="Is this lead generation?"
                  answer="It’s more than that. The goal is to bring in qualified prospects and help move them toward scheduled estimates - not just fill your inbox. So all you have to do is show up for the estimate and close."
                />
                <FAQItem
                  question="How long before I start seeing movement?"
                  answer="Most contractors begin seeing results within the first 30 days, but where traction really picks up is within 2-3 months as the system gains momentum."
                />
                <FAQItem
                  question="Do you lock me into long contracts?"
                  answer="We focus on long-term partnerships, but every situation is discussed individually during the call."
                />
                <FAQItem
                  question="What makes JobFlowCrew different from agencies?"
                  answer="We don’t build our service around selling marketing features. The focus stays on one outcome: steady booked estimates."
                />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section id="final-cta" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900 rounded-3xl md:rounded-[3rem] px-6 py-12 md:p-24 text-center text-white relative overflow-hidden"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-bold mb-8">See If Your Business Fits The JobFlow Model</h2>
                  <p className="text-xl text-zinc-400 leading-relaxed">
                    We work with a limited number of remodelers per area. If your goal is a consistent pipeline of serious estimate conversations, book your qualification call below.
                  </p>
                </div>
              </motion.div>

              <div className="mt-16 max-w-4xl mx-auto px-4 sm:px-0">
                <div className="w-full bg-white rounded-2xl border border-zinc-100 shadow-xl overflow-hidden h-[600px] md:h-[700px]">
                  <Cal
                    namespace="30min"
                    calLink="filip-komsic-qmb5af/30min"
                    style={{width:"100%",height:"100%",overflow:"scroll"}}
                    config={{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}}
                  />
                </div>

                <div className="mt-8 flex items-center justify-center space-x-2 text-zinc-500">
                  <Calendar size={18} />
                  <span className="text-sm">Direct calendar booking. No back-and-forth emails.</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-100 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <img
                src="src/img/jobflow-logo-transparent.png"
                alt="JobFlowCrew Logo"
                className="h-8 w-auto mb-4"
                referrerPolicy="no-referrer"
              />
              <p className="mt-2 text-sm text-zinc-500">The Modern JobFlow System for Remodelers.</p>
            </div>
            <div className="flex space-x-8 text-sm font-medium text-zinc-500">
              <button onClick={() => { setView('privacy'); window.scrollTo(0, 0); }} className="hover:text-zinc-900 transition-colors">Privacy Policy</button>
              <button onClick={() => { setView('terms'); window.scrollTo(0, 0); }} className="hover:text-zinc-900 transition-colors">Terms of Service</button>
              <a href="mailto:hello@jobflowcrew.com" className="hover:text-zinc-900 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-200/50 text-center text-xs text-zinc-400">
            © 2024 JobFlowCrew. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
