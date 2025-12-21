import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Enhanced 3D Truck Component with vibrant colors and depth
const Truck3D = ({ size = 'md', delay = 0, duration = 12, direction = 'ltr', layer = 1, yPosition = 50, colorScheme = 'orange' }) => {
  const sizes = {
    sm: { width: 80, height: 45, scale: 0.6 },
    md: { width: 120, height: 68, scale: 0.85 },
    lg: { width: 180, height: 100, scale: 1.1 },
    xl: { width: 240, height: 135, scale: 1.4 }
  };
  
  // Vibrant color schemes for trucks
  const colorSchemes = {
    orange: { primary: '#FF6B35', secondary: '#F7931E', accent: '#FFD23F' },
    blue: { primary: '#0EA5E9', secondary: '#3B82F6', accent: '#60A5FA' },
    green: { primary: '#10B981', secondary: '#059669', accent: '#34D399' },
    red: { primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' },
    purple: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
    gold: { primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24' }
  };
  
  const colors = colorSchemes[colorScheme] || colorSchemes.orange;
  const { width, height, scale } = sizes[size];
  const isRTL = direction === 'rtl';
  
  // Layer-based opacity and blur for depth effect
  const layerStyles = {
    1: { opacity: 0.2, blur: 3, zIndex: 1 },
    2: { opacity: 0.35, blur: 1.5, zIndex: 5 },
    3: { opacity: 0.6, blur: 0, zIndex: 10 },
    4: { opacity: 0.9, blur: 0, zIndex: 15 }
  };
  
  const { opacity, blur, zIndex } = layerStyles[layer];

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: `${yPosition}%`,
        left: isRTL ? '100%' : '-15%',
        animation: `${isRTL ? 'truck3d-rtl' : 'truck3d-ltr'} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        zIndex,
        transform: `scale(${scale}) ${isRTL ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'center center'
      }}
    >
      {/* 3D Truck SVG with gradients and shadows */}
      <svg width={width} height={height} viewBox="0 0 240 135" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Vibrant metallic gradient for truck body */}
          <linearGradient id={`truckBody-${layer}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.accent} />
            <stop offset="50%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
          
          {/* Neon glow gradient */}
          <linearGradient id={`neonGlow-${layer}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`${colors.accent}00`} />
            <stop offset="50%" stopColor={`${colors.accent}80`} />
            <stop offset="100%" stopColor={`${colors.accent}00`} />
          </linearGradient>
          
          {/* Glass gradient */}
          <linearGradient id={`glass-${layer}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(135,206,250,0.9)" />
            <stop offset="50%" stopColor="rgba(100,180,255,0.7)" />
            <stop offset="100%" stopColor="rgba(70,130,200,0.8)" />
          </linearGradient>
          
          {/* Wheel gradient */}
          <radialGradient id={`wheel-${layer}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(80,80,80,0.9)" />
            <stop offset="60%" stopColor="rgba(40,40,40,0.95)" />
            <stop offset="100%" stopColor="rgba(20,20,20,1)" />
          </radialGradient>
          
          {/* Chrome rim gradient */}
          <radialGradient id={`rim-${layer}`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="50%" stopColor="rgba(200,200,200,0.8)" />
            <stop offset="100%" stopColor="rgba(150,150,150,0.7)" />
          </radialGradient>
          
          {/* Shadow filter */}
          <filter id={`shadow-${layer}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="rgba(0,0,0,0.3)" />
          </filter>
          
          {/* Glow effect */}
          <filter id={`glow-${layer}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Ground shadow */}
        <ellipse cx="120" cy="125" rx="90" ry="8" fill="rgba(0,0,0,0.2)" />
        
        {/* Trailer Container - 3D effect */}
        <g filter={`url(#shadow-${layer})`}>
          {/* Trailer side (3D depth) */}
          <path d="M15 45 L15 95 L145 95 L145 45 L15 45" fill={`url(#truckBody-${layer})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          
          {/* Trailer top edge (3D) */}
          <path d="M15 45 L25 35 L155 35 L145 45" fill="rgba(230,240,255,0.9)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          
          {/* Trailer right edge (3D depth) */}
          <path d="M145 45 L155 35 L155 85 L145 95" fill="rgba(180,200,230,0.8)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          
          {/* Container ridges for realism */}
          <line x1="40" y1="48" x2="40" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <line x1="65" y1="48" x2="65" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <line x1="90" y1="48" x2="90" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <line x1="115" y1="48" x2="115" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          
          {/* Logo area on trailer */}
          <rect x="55" y="58" width="50" height="24" rx="4" fill="rgba(255,200,50,0.8)" stroke="rgba(255,220,100,0.9)" strokeWidth="1"/>
          <text x="80" y="74" textAnchor="middle" fontSize="10" fill="rgba(100,70,0,0.9)" fontWeight="bold">TS</text>
        </g>
        
        {/* Cab Section - 3D effect */}
        <g filter={`url(#shadow-${layer})`}>
          {/* Cab body */}
          <path d="M145 50 C145 40 155 30 175 30 L210 30 C220 30 225 40 225 50 L225 95 L145 95 Z" fill={`url(#truckBody-${layer})`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
          
          {/* Cab top (3D) */}
          <path d="M155 30 L165 22 L215 22 L220 30" fill="rgba(220,235,255,0.9)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
          
          {/* Windshield with reflection */}
          <path d="M175 35 L200 35 C208 35 212 40 212 48 L212 55 L175 55 Z" fill={`url(#glass-${layer})`} stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
          
          {/* Windshield reflection streak */}
          <path d="M180 38 L190 52" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Side window */}
          <rect x="175" y="58" width="35" height="20" rx="3" fill={`url(#glass-${layer})`} stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          
          {/* Door line */}
          <line x1="170" y1="55" x2="170" y2="92" stroke="rgba(150,170,200,0.5)" strokeWidth="1.5"/>
          
          {/* Door handle */}
          <rect x="162" y="70" width="6" height="3" rx="1" fill="rgba(200,200,200,0.9)"/>
          
          {/* Headlight */}
          <ellipse cx="222" cy="75" rx="6" ry="8" fill="rgba(255,255,200,0.9)" filter={`url(#glow-${layer})`}/>
          <ellipse cx="222" cy="75" rx="3" ry="5" fill="rgba(255,255,255,0.95)"/>
          
          {/* Grill */}
          <rect x="218" y="82" width="6" height="12" rx="2" fill="rgba(60,60,60,0.8)"/>
          <line x1="221" y1="84" x2="221" y2="92" stroke="rgba(200,200,200,0.6)" strokeWidth="1"/>
          
          {/* Side mirror */}
          <ellipse cx="148" cy="55" rx="5" ry="7" fill="rgba(100,120,150,0.8)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        </g>
        
        {/* Wheels with 3D effect */}
        <g>
          {/* Back wheel */}
          <circle cx="55" cy="105" r="18" fill={`url(#wheel-${layer})`} stroke="rgba(30,30,30,0.9)" strokeWidth="2"/>
          <circle cx="55" cy="105" r="10" fill={`url(#rim-${layer})`}/>
          <circle cx="55" cy="105" r="4" fill="rgba(80,80,80,0.9)"/>
          {/* Wheel spokes */}
          <line x1="55" y1="95" x2="55" y2="115" stroke="rgba(150,150,150,0.6)" strokeWidth="1.5"/>
          <line x1="45" y1="105" x2="65" y2="105" stroke="rgba(150,150,150,0.6)" strokeWidth="1.5"/>
          
          {/* Middle wheel */}
          <circle cx="105" cy="105" r="18" fill={`url(#wheel-${layer})`} stroke="rgba(30,30,30,0.9)" strokeWidth="2"/>
          <circle cx="105" cy="105" r="10" fill={`url(#rim-${layer})`}/>
          <circle cx="105" cy="105" r="4" fill="rgba(80,80,80,0.9)"/>
          <line x1="105" y1="95" x2="105" y2="115" stroke="rgba(150,150,150,0.6)" strokeWidth="1.5"/>
          <line x1="95" y1="105" x2="115" y2="105" stroke="rgba(150,150,150,0.6)" strokeWidth="1.5"/>
          
          {/* Front wheel */}
          <circle cx="195" cy="105" r="18" fill={`url(#wheel-${layer})`} stroke="rgba(30,30,30,0.9)" strokeWidth="2"/>
          <circle cx="195" cy="105" r="10" fill={`url(#rim-${layer})`}/>
          <circle cx="195" cy="105" r="4" fill="rgba(80,80,80,0.9)"/>
          <line x1="195" y1="95" x2="195" y2="115" stroke="rgba(150,150,150,0.6)" strokeWidth="1.5"/>
          <line x1="185" y1="105" x2="205" y2="105" stroke="rgba(150,150,150,0.6)" strokeWidth="1.5"/>
        </g>
        
        {/* Motion lines */}
        <g className="motion-lines" style={{ opacity: 0.6 }}>
          <line x1="-10" y1="60" x2="8" y2="60" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round"/>
          <line x1="-15" y1="75" x2="5" y2="75" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="-8" y1="90" x2="10" y2="90" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        
        {/* Exhaust smoke */}
        <g className="exhaust" style={{ opacity: 0.4 }}>
          <circle cx="5" cy="95" r="6" fill="rgba(200,200,200,0.5)">
            <animate attributeName="r" values="4;8;4" dur="0.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="0.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="-5" cy="92" r="8" fill="rgba(180,180,180,0.4)">
            <animate attributeName="r" values="5;10;5" dur="1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.05;0.4" dur="1s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
    </div>
  );
};

// Floating particles for depth effect
const FloatingParticles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Animated road with perspective
const AnimatedRoad = () => (
  <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none" style={{ perspective: '500px' }}>
    <div 
      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
      style={{ 
        transform: 'rotateX(60deg)',
        transformOrigin: 'bottom center'
      }}
    >
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
        {/* Road surface */}
        <rect x="0" y="80" width="1000" height="120" fill="rgba(40,40,50,0.4)"/>
        
        {/* Center dashed line */}
        <line x1="0" y1="140" x2="1000" y2="140" 
          stroke="rgba(255,200,50,0.7)" 
          strokeWidth="4" 
          strokeDasharray="30 20"
          style={{ animation: 'road-dash 1s linear infinite' }}
        />
        
        {/* Edge lines */}
        <line x1="0" y1="85" x2="1000" y2="85" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
        <line x1="0" y1="195" x2="1000" y2="195" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
      </svg>
    </div>
  </div>
);

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroSceneRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!heroSceneRef.current) return;
    const rect = heroSceneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 20, y: y * 10 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section with 3D Trucks */}
      <div
        ref={heroSceneRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-900 text-white min-h-[500px] sm:min-h-[550px] md:min-h-[600px]"
        style={{ perspective: '1000px' }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30 animate-pulse-slow"></div>
        
        {/* Starfield / particle background */}
        <FloatingParticles />
        
        {/* Neon glow lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-pink-400/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* 3D Grid floor effect with neon */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div 
            className="absolute bottom-0 left-0 right-0 h-72"
            style={{
              background: 'linear-gradient(transparent 0%, rgba(139,92,246,0.15) 100%)',
              transform: `rotateX(70deg) translateZ(-50px) translateY(${mousePosition.y}px)`,
              transformOrigin: 'bottom center',
              backgroundImage: `
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 15s linear infinite'
            }}
          />
        </div>
        
        {/* Animated road with dashed lines */}
        <AnimatedRoad />
        
        {/* Multiple 3D Trucks at different depths - all moving left to right */}
        {/* Background layer trucks (far away, blurry, slow) */}
        <Truck3D size="sm" delay={0} duration={22} direction="ltr" layer={1} yPosition={20} colorScheme="blue" />
        <Truck3D size="sm" delay={12} duration={25} direction="ltr" layer={1} yPosition={30} colorScheme="purple" />
        
        {/* Mid-ground trucks */}
        <Truck3D size="md" delay={4} duration={18} direction="ltr" layer={2} yPosition={35} colorScheme="green" />
        <Truck3D size="md" delay={14} duration={20} direction="ltr" layer={2} yPosition={45} colorScheme="red" />
        
        {/* Foreground trucks (closer, clearer, faster) */}
        <Truck3D size="lg" delay={7} duration={15} direction="ltr" layer={3} yPosition={50} colorScheme="gold" />
        <Truck3D size="lg" delay={18} duration={16} direction="ltr" layer={3} yPosition={58} colorScheme="blue" />
        
        {/* Hero truck (closest, most visible) - vibrant orange - positioned on the road */}
        <Truck3D size="xl" delay={0} duration={14} direction="ltr" layer={4} yPosition={62} colorScheme="orange" />
        
        {/* Glowing orbs for atmosphere */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Floating 3D badge */}
            <div className="inline-block mb-4 sm:mb-6 animate-bounce-slow">
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-orange-500/30">
                🚚 #1 Logistics Platform in India
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight animate-fade-in">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                TruckSuvidha
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-blue-100 to-purple-200 bg-clip-text text-transparent font-semibold">
              India's Leading Truck Booking & Freight Platform
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 text-blue-100/90 max-w-3xl mx-auto px-4">
              Connect with verified transporters, post your loads, and get instant quotes.
              Simplifying logistics with technology, speed, and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-4">
              <Link
                to="/register"
                className="group w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-orange-500/40 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🚀 Get Started - It's Free
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 border-2 border-white/20 hover:border-white/40 text-center shadow-xl"
              >
                ✨ Login
              </Link>
            </div>
            
            {/* 3D Floating stats preview */}
            <div className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-4 sm:gap-6">
              <div className="glass-card px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transform hover:scale-110 transition-transform cursor-default">
                <span className="text-2xl sm:text-3xl font-bold text-yellow-400">56K+</span>
                <span className="text-xs sm:text-sm text-blue-100 ml-2">Transporters</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transform hover:scale-110 transition-transform cursor-default">
                <span className="text-2xl sm:text-3xl font-bold text-green-400">100K+</span>
                <span className="text-xs sm:text-sm text-blue-100 ml-2">Loads Delivered</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transform hover:scale-110 transition-transform cursor-default">
                <span className="text-2xl sm:text-3xl font-bold text-pink-400">500+</span>
                <span className="text-xs sm:text-sm text-blue-100 ml-2">Cities</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements - Hidden on small screens for performance */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          <div className="absolute top-20 left-10 animate-float opacity-30">
            <svg width="80" height="40" viewBox="0 0 80 40" fill="url(#boxGrad1)">
              <defs>
                <linearGradient id="boxGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6"/>
                  <stop offset="100%" stopColor="#c084fc"/>
                </linearGradient>
              </defs>
              <rect x="20" y="10" width="40" height="20" rx="3"/>
              <circle cx="25" cy="32" r="5"/>
              <circle cx="55" cy="32" r="5"/>
            </svg>
          </div>
          <div className="absolute bottom-32 right-16 animate-bounce-slow opacity-25">
            <svg width="70" height="70" viewBox="0 0 60 60">
              <defs>
                <linearGradient id="boxGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa"/>
                  <stop offset="100%" stopColor="#34d399"/>
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="40" height="40" rx="6" fill="url(#boxGrad2)"/>
            </svg>
          </div>
          <div className="absolute top-1/3 right-20 animate-float opacity-20" style={{ animationDelay: '2s' }}>
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="#fbbf24" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-10 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="group p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-default">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 sm:mb-2 drop-shadow-lg">25K+</div>
              <div className="text-xs sm:text-sm md:text-base text-blue-100 font-semibold">Fleet Owners</div>
            </div>
            <div className="group p-4 sm:p-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl shadow-xl shadow-emerald-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-default">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 sm:mb-2 drop-shadow-lg">17K+</div>
              <div className="text-xs sm:text-sm md:text-base text-emerald-100 font-semibold">Transporters</div>
            </div>
            <div className="group p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl shadow-xl shadow-purple-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-default">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 sm:mb-2 drop-shadow-lg">11K+</div>
              <div className="text-xs sm:text-sm md:text-base text-purple-100 font-semibold">Commission Agents</div>
            </div>
            <div className="group p-4 sm:p-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl sm:rounded-3xl shadow-xl shadow-orange-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-default">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 sm:mb-2 drop-shadow-lg">2K+</div>
              <div className="text-xs sm:text-sm md:text-base text-orange-100 font-semibold">Brokers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold mb-4">✨ Our Features</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-3 sm:mb-4 bg-gradient-to-r from-gray-800 via-purple-800 to-pink-800 bg-clip-text text-transparent">
              Why Choose TruckSuvidha?
            </h2>
            <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg px-4 max-w-2xl mx-auto">
              Simplifying logistics with powerful features and cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-6 sm:p-8 text-center transform hover:scale-105 hover:-translate-y-3 transition-all duration-500 border border-white/50">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-500 transform group-hover:rotate-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Verified Network</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                56,000+ verified transporters and fleet owners across India with complete background checks
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-6 sm:p-8 text-center transform hover:scale-105 hover:-translate-y-3 transition-all duration-500 border border-white/50">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-emerald-500/30 group-hover:shadow-xl group-hover:shadow-emerald-500/40 transition-all duration-500 transform group-hover:rotate-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Real-Time Tracking</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Live GPS tracking and instant notifications for all your shipments with 24/7 monitoring
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl p-6 sm:p-8 text-center transform hover:scale-105 hover:-translate-y-3 transition-all duration-500 border border-white/50 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-amber-500/30 group-hover:shadow-xl group-hover:shadow-amber-500/40 transition-all duration-500 transform group-hover:rotate-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Best Rates</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Compare multiple quotes and get the most competitive pricing for every load
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-semibold mb-4">🎯 Simple Process</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              How It Works
            </h2>
          </div>
          
          {/* Steps Container with connecting lines */}
          <div className="relative max-w-4xl mx-auto">
            {/* Neon connector line - desktop only */}
            <div className="hidden sm:block absolute top-10 sm:top-14 left-[16.67%] right-[16.67%] h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-0 rounded-full shadow-lg shadow-purple-500/50"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8 relative z-10">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl shadow-cyan-500/40 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-3xl sm:text-5xl font-extrabold text-white">1</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Post Your Load</h3>
                <p className="text-sm sm:text-base text-gray-300 px-2 sm:px-4">
                  Submit your transport requirements with complete details in just 2 minutes
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl shadow-purple-500/40 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-3xl sm:text-5xl font-extrabold text-white">2</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Receive Quotes</h3>
                <p className="text-sm sm:text-base text-gray-300 px-2 sm:px-4">
                  Get instant competitive quotes from verified transporters
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl shadow-pink-500/40 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-3xl sm:text-5xl font-extrabold text-white">3</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Track Shipment</h3>
                <p className="text-sm sm:text-base text-gray-300 px-2 sm:px-4">
                  Monitor your shipment in real-time until successful delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-20 md:py-28 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white relative overflow-hidden">
        {/* 3D floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-2xl transform rotate-12 animate-bounce-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-xl transform -rotate-12 animate-float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-cyan-400/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">🚀 Start Your Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg">
            Ready to Transform<br/>Your Logistics?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-white/90 max-w-2xl mx-auto">
            Join thousands of businesses already using TruckSuvidha
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center gap-3 bg-white text-purple-600 px-8 sm:px-12 md:px-14 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-white/30"
          >
            <span>Start Free Today</span>
            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold mb-4">📞 Contact Us</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-3 sm:mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Have questions? We're here to help you 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Phone */}
            <div className="group bg-white rounded-3xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-green-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-green-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm mb-3">Mon-Sat 9am-6pm</p>
              <a href="tel:+917489635343" className="text-green-600 font-bold text-lg sm:text-xl hover:text-emerald-600 transition-colors">
                +91-7489635343
              </a>
            </div>

            {/* Email */}
            <div className="group bg-white rounded-3xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-blue-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-blue-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Email Us</h3>
              <p className="text-gray-500 text-sm mb-3">We reply within 24hrs</p>
              <a href="mailto:info@trucksuvidha.com" className="text-blue-600 font-bold text-lg sm:text-xl hover:text-indigo-600 transition-colors break-all">
                info@trucksuvidha.com
              </a>
            </div>

            {/* Location */}
            <div className="group bg-white rounded-3xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-purple-100 md:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-purple-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Visit Us</h3>
              <p className="text-gray-500 text-sm mb-3">Our office location</p>
              <p className="text-purple-600 font-bold text-lg sm:text-xl">
                Indore, MP, India
              </p>
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span>Contact Us</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
