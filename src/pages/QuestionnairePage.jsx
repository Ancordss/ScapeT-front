import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import Silk from '@/components/Silk';
import ThemeToggle from '@/components/ThemeToggle';
import ProfileButton from '@/components/ProfileButton';
import LoadingScreen from '@/components/LoadingScreen';
import { useTheme } from '@/contexts/ThemeContext';
import 'react-day-picker/dist/style.css';

const interests = [
  'Photography', 'Art & Museums', 'Beaches', 'Mountains', 'Wildlife',
  'Architecture', 'Local Cuisine', 'Wine Tasting', 'Hiking', 'Water Sports',
  'Music & Concerts', 'Festivals', 'Historical Sites', 'Street Food', 'Yoga & Wellness'
];

const tripTypes = [
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'history', label: 'History', icon: '🏛️' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'culture', label: 'Culture', icon: '🎭' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'adventure', label: 'Adventure', icon: '⛰️' },
  { id: 'relaxation', label: 'Relaxation', icon: '🧘' }
];

export default function QuestionnairePage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    dateRange: { from: undefined, to: undefined },
    selectedInterests: [],
    hasBudget: null,
    budget: 5000,
    budgetLevel: '',
    tripTypes: []
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDestinationChange = (e) => {
    setFormData({ ...formData, destination: e.target.value });
  };

  const handleDateSelect = (range) => {
    // Prevent setting undefined range which causes blank page
    if (range) {
      setFormData({ ...formData, dateRange: range });
    }
  };

  const toggleInterest = (interest) => {
    const updated = formData.selectedInterests.includes(interest)
      ? formData.selectedInterests.filter(i => i !== interest)
      : [...formData.selectedInterests, interest];
    setFormData({ ...formData, selectedInterests: updated });
  };

  const handleBudgetChoice = (choice) => {
    setFormData({ ...formData, hasBudget: choice });
    // No longer skip to step 5, both options show budget selection
  };

  const handleBudgetLevel = (level) => {
    const budgetValues = { low: 1000, medium: 5000, high: 10000 };
    setFormData({ ...formData, budgetLevel: level, budget: budgetValues[level] });
  };

  const toggleTripType = (typeId) => {
    const updated = formData.tripTypes.includes(typeId)
      ? formData.tripTypes.filter(t => t !== typeId)
      : [...formData.tripTypes, typeId];
    setFormData({ ...formData, tripTypes: updated });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Travel preferences:', formData);
    // Show loading screen
    setIsLoading(true);
    
    // Simulate processing time (5 seconds)
    setTimeout(() => {
      // Navigate to results page
      navigate('/results');
    }, 5000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.destination.trim() !== '';
      case 2:
        return formData.dateRange.from && formData.dateRange.to;
      case 3:
        return formData.selectedInterests.length > 0;
      case 4:
        // For Yes (hasBudget=true): must have budget > 0
        // For No (hasBudget=false): must have selected a budget level
        return formData.hasBudget !== null && 
               (formData.hasBudget ? formData.budget > 0 : formData.budgetLevel !== '');
      case 5:
        return formData.tripTypes.length > 0;
      default:
        return false;
    }
  };

  const getDaysCount = () => {
    if (formData.dateRange.from && formData.dateRange.to) {
      const days = Math.ceil((formData.dateRange.to - formData.dateRange.from) / (1000 * 60 * 60 * 24));
      return days;
    }
    return 0;
  };

  return (
    <>
      {/* Loading Screen Overlay */}
      {isLoading && <LoadingScreen />}
      
      <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Theme Toggle Button - Left */}
      <ThemeToggle />
      
      {/* Profile Button - Right */}
      <ProfileButton 
        userName="John Doe" 
        userEmail="john.doe@example.com" 
        triPoints={100} 
      />
      
      {/* White background in light mode, transparent in dark mode */}
      <div className="absolute inset-0 -z-20 bg-white dark:bg-transparent"></div>
      
      {/* Animated Silk Background - same as auth pages */}
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={5}
          scale={1}
          color={theme === 'dark' ? '#56A87E' : '#56A87E'}
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <Card className="w-full max-w-3xl backdrop-blur-sm bg-gray-100/90 dark:bg-gray-900/50 border-2 border-primary/20 shadow-lg shadow-primary/5">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#56A87E" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <CardTitle className="text-4xl font-bold text-primary">ScapeT</CardTitle>
          </div>
          <CardDescription className="text-lg text-gray-600 dark:text-white">
            Let's plan your perfect trip
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === currentStep
                    ? 'w-12 bg-primary'
                    : step < currentStep
                    ? 'w-8 bg-primary/60'
                    : 'w-8 bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Step {currentStep} of 5</p>
        </CardHeader>

        <CardContent className="space-y-8 px-8 pb-8">
          {/* Question 1: Destination */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Where are you traveling to?
                </h2>
                <p className="text-gray-600 dark:text-white">Enter your dream destination</p>
              </div>
              <div className="max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="e.g., Paris, Tokyo, New York..."
                  value={formData.destination}
                  onChange={handleDestinationChange}
                  className="h-14 text-lg text-center bg-white/30 dark:bg-black/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Question 2: Date Range */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  How many days are you traveling?
                </h2>
                <p className="text-gray-600 dark:text-white">Select your travel dates</p>
              </div>
              
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="h-14 px-8 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                >
                  {formData.dateRange.from ? (
                    formData.dateRange.to ? (
                      <>
                        {format(formData.dateRange.from, 'MMM dd, yyyy')} - {format(formData.dateRange.to, 'MMM dd, yyyy')}
                        <span className="ml-2 text-primary font-semibold">
                          ({getDaysCount()} days)
                        </span>
                      </>
                    ) : (
                      format(formData.dateRange.from, 'MMM dd, yyyy')
                    )
                  ) : (
                    'Select dates'
                  )}
                </Button>
              </div>

              {showCalendar && (
                <div className="flex justify-center mt-4">
                  <div className="backdrop-blur-sm bg-gray-100/90 dark:bg-gray-900/50 p-6 rounded-xl border-2 border-primary/20 shadow-xl shadow-primary/10">
                    <DayPicker
                      mode="range"
                      selected={formData.dateRange}
                      onSelect={handleDateSelect}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                      className="text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Question 3: Interests */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  What are your interests?
                </h2>
                <p className="text-gray-600 dark:text-white">Select all that apply</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      formData.selectedInterests.includes(interest)
                        ? 'border-primary bg-primary/10 text-primary font-semibold scale-105 shadow-md shadow-primary/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-primary/50 bg-white/30 dark:bg-gray-800/50 text-gray-700 dark:text-white hover:shadow-primary/10'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 dark:text-white">
                Selected: {formData.selectedInterests.length}
              </p>
            </div>
          )}

          {/* Question 4: Budget */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Do you have a budget?
                </h2>
                <p className="text-gray-600 dark:text-white">Help us tailor your experience</p>
              </div>

              {formData.hasBudget === null && (
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => handleBudgetChoice(true)}
                    size="lg"
                    className="h-16 px-12 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleBudgetChoice(false)}
                    variant="outline"
                    size="lg"
                    className="h-16 px-12 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                  >
                    No
                  </Button>
                </div>
              )}

              {/* YES - Shows slider for specific budget */}
              {formData.hasBudget === true && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="space-y-4">
                    <Label className="text-lg text-gray-700 dark:text-white">
                      Budget Amount: <span className="text-primary font-bold text-2xl">${formData.budget.toLocaleString()}</span>
                    </Label>
                    <Slider
                      min={500}
                      max={20000}
                      step={500}
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value), budgetLevel: '' })}
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-white">
                      <span>$500</span>
                      <span>$20,000</span>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={() => setFormData({ ...formData, hasBudget: null, budget: 5000, budgetLevel: '' })}
                      variant="outline"
                      size="sm"
                      className="text-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-primary/20"
                    >
                      Change Answer
                    </Button>
                  </div>
                </div>
              )}

              {/* NO - Shows three budget levels */}
              {formData.hasBudget === false && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="text-center space-y-2 mb-4">
                    <p className="text-gray-600 dark:text-white">
                      Choose a budget range that works for you
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {['low', 'medium', 'high'].map((level) => (
                      <Button
                        key={level}
                        onClick={() => handleBudgetLevel(level)}
                        variant={formData.budgetLevel === level ? 'default' : 'outline'}
                        className="h-20 text-base capitalize transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 flex flex-col items-center justify-center"
                      >
                        <span className="font-semibold">{level}</span>
                        <span className="text-xs mt-1">
                          {level === 'low' && '$1,000'}
                          {level === 'medium' && '$5,000'}
                          {level === 'high' && '$10,000'}
                        </span>
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={() => setFormData({ ...formData, hasBudget: null, budget: 5000, budgetLevel: '' })}
                      variant="outline"
                      size="sm"
                      className="text-sm transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-primary/20"
                    >
                      Change Answer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Question 5: Trip Type */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                  Type of trip
                </h2>
                <p className="text-gray-600 dark:text-white">What kind of experience are you looking for?</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {tripTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => toggleTripType(type.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 hover:scale-110 hover:shadow-xl ${
                      formData.tripTypes.includes(type.id)
                        ? 'border-primary bg-primary/10 scale-105 shadow-lg shadow-primary/30'
                        : 'border-gray-300 dark:border-gray-700 hover:border-primary/50 bg-white/30 dark:bg-gray-800/50 hover:shadow-primary/20'
                    }`}
                  >
                    <span className="text-4xl transition-transform duration-300 group-hover:scale-110">{type.icon}</span>
                    <span className={`font-semibold ${
                      formData.tripTypes.includes(type.id)
                        ? 'text-primary'
                        : 'text-gray-700 dark:text-white'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 dark:text-white">
                Selected: {formData.tripTypes.length}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="h-12 px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              Back
            </Button>
            
            {currentStep < 5 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="h-12 px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="h-12 px-8 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                Create My Trip
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
