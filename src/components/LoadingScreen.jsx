import { useState, useEffect } from 'react';
import Silk from '@/components/Silk';
import { useTheme } from '@/contexts/ThemeContext';

const loadingMessages = [
  'Curating your perfect route',
  'Finding hidden gems',
  'Personalizing your adventure',
  'Gathering expert tips',
  'Optimizing travel times',
  'Matching your travel style',
  'Almost there',
  'Ready to explore?'
];

export default function LoadingScreen() {
  const { theme } = useTheme();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      // Fade out
      setFade(false);
      
      // After fade out, change message and fade in
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => 
          (prevIndex + 1) % loadingMessages.length
        );
        setFade(true);
      }, 300); // Match fade-out duration
      
    }, 2000); // Show each message for 2 seconds

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* White background in light mode, transparent in dark mode */}
      <div className="absolute inset-0 -z-20 bg-white dark:bg-transparent"></div>
      
      {/* Animated Silk Background */}
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={5}
          scale={1}
          color={theme === 'dark' ? '#56A87E' : '#56A87E'}
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Loading Content */}
      <div className="backdrop-blur-md bg-gray-100/80 dark:bg-gray-900/80 border-2 border-primary/30 shadow-2xl shadow-primary/20 rounded-2xl p-12 max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          {/* ScapeT Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#56A87E" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h2 className="text-4xl font-bold text-primary">ScapeT</h2>
          </div>

          {/* Loading Animation */}
          <div className="relative w-24 h-24 mx-auto">
            {/* Outer rotating circle */}
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            {/* Spinning arc */}
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-3 bg-primary/10 rounded-full animate-pulse"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Creating Your Perfect Trip
            </h3>
            <p className={`text-gray-600 dark:text-gray-300 text-sm min-h-[40px] flex items-center justify-center transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {loadingMessages[currentMessageIndex]}
            </p>
          </div>

          {/* Loading Dots Animation */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
