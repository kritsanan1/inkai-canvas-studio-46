import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap, Palette, Users, Crown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/studio', label: 'Studio', icon: Zap },
    { href: '/gallery', label: 'Gallery', icon: Palette },
    { href: '/artists', label: 'Artists', icon: Users },
    { href: '/pricing', label: 'Pricing', icon: Crown },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/20 backdrop-blur-lg bg-background/80">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
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

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            asChild
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <Link to="/create-design" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Design</span>
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 space-y-2">
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;