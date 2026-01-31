import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Silk from '@/components/Silk';
import ThemeToggle from '@/components/ThemeToggle';
import ProfileButton from '@/components/ProfileButton';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ResultsPage() {
  const { theme } = useTheme();
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [itinerary, setItinerary] = useState(null);
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load guide data from localStorage
    const guideData = localStorage.getItem('scapet_guide');
    const city = localStorage.getItem('scapet_guide_city');
    
    if (!guideData) {
      // No guide data, redirect to questionnaire
      navigate('/questionnaire');
      return;
    }
    
    try {
      const parsedGuide = JSON.parse(guideData);
      setItinerary({ guide: parsedGuide });
      setCityName(city || 'Your Destination');
      
      // Refresh user profile to get updated credits
      refreshProfile();
    } catch (error) {
      console.error('Error parsing guide data:', error);
      navigate('/questionnaire');
      return;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, refreshProfile]);

  if (isLoading || !itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando tu itinerario...</p>
        </div>
      </div>
    );
  }

  const currentDay = itinerary.guide.find(d => d.day === selectedDay);

  // Activity type icons
  const activityIcons = {
    food: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
    history: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    culture: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    nature: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    sightseeing: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
    shopping: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    nightlife: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
    adventure: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    relaxation: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0z"/>
        <path d="M12 2v20"/>
      </svg>
    ),
    rest: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12h20"/>
        <path d="M2 6h20"/>
        <path d="M2 18h20"/>
      </svg>
    )
  };

  // Effort level badge
  const EffortBadge = ({ level }) => {
    const colors = {
      low: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 hover:bg-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30',
      high: 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 hover:bg-red-500/30'
    };
    
    return (
      <span className={`font-tech text-xs tracking-widest uppercase px-2 py-1 rounded-full border transition-all duration-300 hover:scale-110 ${colors[level]}`}>
        {level}
      </span>
    );
  };

  // Pace badge
  const PaceBadge = ({ pace }) => {
    const paceLabels = {
      balanced: 'Balanced',
      relaxed: 'Relaxed',
      intense: 'Intense'
    };
    
    return (
      <span className="font-tech text-xs tracking-widest uppercase px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 hover:scale-110 transition-all duration-300">
        {paceLabels[pace]}
      </span>
    );
  };

  const handleExportPDF = () => {
    // Trigger browser print dialog which allows saving as PDF
    window.print();
  };

  // Render a single day's content
  const renderDayContent = (day) => (
    <div key={day.day} className="bg-gray-100 dark:bg-gray-900 border-2 border-primary/20 shadow-xl rounded-xl overflow-hidden mb-6 print:mb-8 print:page-break-after-auto">
      {/* Day Header */}
      <div className="p-6 border-b border-gray-300/30 dark:border-gray-600/30">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-sm text-primary font-medium mb-1">Day {day.day}</div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-2 print:text-black">
              {day.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 print:text-gray-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{day.zone}</span>
            </div>
          </div>
          <PaceBadge pace={day.pace} />
        </div>

        {/* Daily Tips */}
        {day.daily_tips.length > 0 && (
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20 shadow-md print:break-inside-avoid">
            <div className="text-xs font-semibold text-primary mb-2">Important Tips for Today</div>
            <ul className="space-y-1.5">
              {day.daily_tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200 print:text-gray-800">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="space-y-6 pb-4">
          {day.schedule.map((activity, idx) => (
            <div key={idx} className="relative print:break-inside-avoid">
              {/* Timeline Line */}
              {idx < day.schedule.length - 1 && (
                <div className="absolute left-[52px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent print:hidden"></div>
              )}
              
              <div className="flex gap-4">
                {/* Time Column */}
                <div className="flex-shrink-0 w-24 pt-1">
                  <div className="text-right transition-all duration-300 hover:scale-110 print:hover:scale-100">
                    <div className="text-lg font-bold text-primary">{activity.time}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 print:text-gray-600">
                      {activity.estimated_duration_minutes} min
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="flex-shrink-0 relative">
                  <div className="w-3 h-3 rounded-full bg-primary border-4 border-gray-100 dark:border-gray-900 mt-2 transition-transform duration-300 hover:scale-150 print:hover:scale-100"></div>
                </div>

                {/* Activity Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-300/30 dark:border-gray-600/30 shadow-md hover:border-primary/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 print:bg-white print:hover:scale-100 print:break-inside-avoid">
                    {/* Activity Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap group">
                        <div className="text-primary group-hover:scale-110 transition-transform duration-300 print:group-hover:scale-100">
                          {activityIcons[activity.activity_type] || activityIcons.sightseeing}
                        </div>
                        <span className="text-xs uppercase text-gray-500 dark:text-gray-400 print:text-gray-600">
                          {activity.activity_type}
                        </span>
                        <EffortBadge level={activity.physical_effort} />
                      </div>
                    </div>

                    {/* Place Name */}
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 print:text-black">
                      {activity.place}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 print:text-gray-800">
                      {activity.reason}
                    </p>

                    {/* Traveler Tips */}
                    {activity.traveler_tips.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-300/30 dark:border-gray-600/30">
                        <div className="text-xs font-semibold text-primary mb-2">Tips:</div>
                        <ul className="space-y-1">
                          {activity.traveler_tips.map((tip, tipIdx) => (
                            <li key={tipIdx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 print:text-gray-700">
                              <span className="text-primary mt-0.5">→</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Avoid If */}
                    {activity.avoid_if.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-300/30 dark:border-gray-600/30">
                        <div className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                          </svg>
                          Avoid:
                        </div>
                        <ul className="space-y-0.5">
                          {activity.avoid_if.map((avoid, avoidIdx) => (
                            <li key={avoidIdx} className="text-xs text-red-600 dark:text-red-400">
                              • {avoid}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Best Time */}
                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 print:text-gray-600">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                      </svg>
                      Best time: <span className="text-primary font-medium">{activity.best_time_window}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Theme Toggle Button - Left */}
      <ThemeToggle />
      
      {/* Profile Button - Right */}
      <ProfileButton />

      {/* Main Content Container - Normal scroll */}
      <div className="pt-16 pb-8 px-4 lg:px-8">
        <div className="max-w-full mx-auto w-full space-y-4">
          {/* Header */}
          <div className="bg-gray-100 dark:bg-gray-900 border-2 border-primary/20 shadow-xl rounded-xl p-6 print:hidden">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#56A87E" 
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
                    Your {cityName} Itinerary
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Personalized by ScapeT
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleExportPDF}
                className="text-xs px-6 py-2 bg-primary text-white dark:text-gray-800 rounded-lg shadow-md hover:bg-primary/90 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Export PDF
              </button>
            </div>
          </div>

          {/* Day Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 print:hidden">
            {itinerary.guide.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`flex-shrink-0 px-6 py-3 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  selectedDay === day.day
                    ? 'bg-primary text-white dark:text-gray-800 border-primary shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 shadow-md hover:border-primary/50 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-semibold">Day {day.day}</div>
                <div className="text-xs opacity-80">{day.pace}</div>
              </button>
            ))}
          </div>

          {/* Day Content - Show selected day on screen */}
          <div className="print:hidden">
            {currentDay && renderDayContent(currentDay)}
          </div>

          {/* Print Only - Show all days */}
          <div className="hidden print:block">
            {itinerary.guide.map((day) => renderDayContent(day))}
          </div>
        </div>
      </div>
    </div>
  );
}
