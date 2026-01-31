import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login data:', formData);
      setIsLoading(false);
      // Navigate to questionnaire after successful login
      navigate('/questionnaire');
    }, 1500);
  };

  return (
    <Card className="w-full h-full backdrop-blur-sm bg-gray-100/90 dark:bg-gray-900/50 border-2 border-primary/20 shadow-lg shadow-primary/5 lg:border-r-0 lg:rounded-r-none flex flex-col">
        <CardHeader className="space-y-1 pt-12">
          <div className="flex items-center justify-center gap-2 mb-2">
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
            <CardTitle className="text-5xl font-bold" style={{ color: '#56A87E' }}>ScapeT</CardTitle>
          </div>
          <CardDescription className="text-center text-gray-600 dark:text-white">
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center pb-8">
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm px-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-destructive bg-white/30 dark:bg-black/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400' : 'bg-white/30 dark:bg-black/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400'}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'border-destructive pr-10 bg-white/30 dark:bg-black/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400' : 'pr-10 bg-white/30 dark:bg-black/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <div className="text-center text-sm text-gray-600 dark:text-white">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary/80 hover:underline font-semibold transition-colors">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
  );
}
