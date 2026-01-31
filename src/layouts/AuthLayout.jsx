import { Outlet } from 'react-router-dom';
import Silk from '@/components/Silk';
import PhrasesCarousel from '@/components/PhrasesCarousel';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function AuthLayout() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      
      {/* White background in light mode, transparent in dark mode */}
      <div className="absolute inset-0 -z-20 bg-white dark:bg-transparent"></div>
      
      {/* Animated Silk Background - color changes with theme */}
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={5}
          scale={1}
          color={theme === 'dark' ? '#56A87E' : '#56A87E'}
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      
      <div className="flex flex-col lg:flex-row w-full max-w-6xl">
        {/* Authentication Card */}
        <div className="flex items-center justify-center w-full lg:w-1/2 relative">
          <Outlet />
          {/* Divider Line */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
        </div>
        
        {/* Phrases Carousel Card */}
        <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
          <PhrasesCarousel />
        </div>
      </div>
    </div>
  );
}
