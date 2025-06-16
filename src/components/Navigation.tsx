
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, X, Zap, Palette, Users, Crown, Plus, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import ScrollProgress from './ScrollProgress';
import AuthModal from './auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/studio', label: 'Studio', icon: Zap },
    { href: '/gallery', label: 'Gallery', icon: Palette },
    { href: '/artists', label: 'Artists', icon: Users },
    { href: '/pricing', label: 'Pricing', icon: Crown },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  const openAuthModal = (tab: 'signin' | 'signup') => {
    setAuthModalTab(tab);
    setShowAuthModal(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <ScrollProgress />
      <header className={cn(
        "fixed top-0 w-full z-40 border-b transition-all duration-300",
        scrolled 
          ? "border-border/40 backdrop-blur-xl bg-background/90 shadow-xl shadow-primary/5" 
          : "border-border/20 backdrop-blur-lg bg-background/80"
      )}>
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg rotate-45 group-hover:animate-glow-rotate transition-all duration-300"></div>
            <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg opacity-20 blur-md group-hover:opacity-40 transition-opacity"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            InkAI Studio
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile since we have bottom nav */}
        {!isMobile && (
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 relative group",
                    isActive(item.href)
                      ? "text-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive(item.href) && (
                    <div className="absolute inset-0 rounded-lg border border-primary/30 animate-neon-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Search & User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar className="w-64" />
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {!isMobile && (
                <Button 
                  asChild
                  className="hidden md:flex bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <Link to="/create-design" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Design</span>
                  </Link>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage 
                        src={user.user_metadata?.avatar_url} 
                        alt={user.user_metadata?.full_name || user.email} 
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                        {user.user_metadata?.full_name 
                          ? getInitials(user.user_metadata.full_name)
                          : user.email?.charAt(0).toUpperCase()
                        }
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost"
                onClick={() => openAuthModal('signin')}
              >
                Sign In
              </Button>
              <Button 
                onClick={() => openAuthModal('signup')}
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile menu button - Only show for desktop menu access */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation - Only for desktop overflow menu */}
      {isOpen && !isMobile && (
        <div className="lg:hidden border-t border-border/20 bg-background/95 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <SearchBar className="w-full mb-4" />
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300",
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {user ? (
              <>
                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-secondary mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/create-design" className="flex items-center justify-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Design</span>
                  </Link>
                </Button>
                <div className="pt-4 border-t border-border/20">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-border/20 space-y-2">
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    openAuthModal('signin');
                    setIsOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                  onClick={() => {
                    openAuthModal('signup');
                    setIsOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>

    <AuthModal 
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      defaultTab={authModalTab}
    />
    </>
  );
};

export default Navigation;
