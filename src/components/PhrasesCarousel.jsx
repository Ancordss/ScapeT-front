import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const phrases = [
  {
    text: "Your style, your pace. We design a route that actually feels like you",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#56A87E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
        <path d="M12 12h10a10 10 0 0 1-10 10V12z"/>
      </svg>
    )
  },
  {
    text: "Less time planning, more time living the destination",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#56A87E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    )
  },
  {
    text: "Not just a list of places; it's your next great memory",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#56A87E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    text: "Discover local gems without lifting a finger",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#56A87E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  }
];

export default function PhrasesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Half of the transition for fade out
    }, 5000); // Change phrase every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full h-full backdrop-blur-sm bg-gray-100/90 dark:bg-gray-900/50 border-2 border-primary/20 shadow-lg shadow-primary/5 lg:border-l-0 lg:rounded-l-none">
      <CardContent className="p-8 flex flex-col items-center justify-center h-full min-h-[500px]">
        <div
          className={`transition-all duration-500 ease-in-out flex flex-col items-center ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Icon */}
          <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
            {phrases[currentIndex].icon}
          </div>
          
          {/* Text */}
          <p className="text-gray-700 dark:text-white text-center text-lg leading-relaxed font-medium">
            {phrases[currentIndex].text}
          </p>
        </div>

        {/* Dots indicator */}
        <div className="flex gap-2 mt-8">
          {phrases.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                }, 500);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-gray-400/40 dark:bg-white/30 hover:bg-gray-600/50 dark:hover:bg-white/50'
              }`}
              aria-label={`Go to phrase ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
