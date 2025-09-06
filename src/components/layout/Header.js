'use client';

import { useState } from 'react';
import Link from 'next/link';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="mr-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <Icon name="moon" size={20} />
            </div>
            <span className="hidden font-bold text-xl bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent sm:inline-block">
              Shia Community Pakistan
            </span>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent sm:hidden">
              SCP
            </span>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="flex-1 mx-4 max-w-md hidden md:flex">
          <div className="relative w-full">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts, people..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Icon name="home" size={20} />
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="bell" size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-accent text-white rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>
        </nav>

        {/* User Menu - Desktop */}
        <div className="hidden md:flex items-center space-x-4 ml-4">
          <Button variant="primary" size="small">
            <Icon name="plus" size={16} className="mr-2" />
            Post
          </Button>
          
          <div className="flex items-center space-x-2">
            <Link href="/profile">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="User"
                size="medium"
                fallback="U"
                online={true}
              />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Icon name="search" size={20} />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "close" : "menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Icon name="search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search posts, people..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-around border-t border-border pt-4">
              <Link href="/" className="flex flex-col items-center space-y-1">
                <Icon name="home" size={24} />
                <span className="text-xs">Home</span>
              </Link>
              <Link href="/notifications" className="flex flex-col items-center space-y-1">
                <div className="relative">
                  <Icon name="bell" size={24} />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
                </div>
                <span className="text-xs">Notifications</span>
              </Link>
              <Button variant="primary" size="small" className="flex flex-col items-center space-y-1">
                <Icon name="plus" size={20} />
                <span className="text-xs">Post</span>
              </Button>
              <Link href="/profile" className="flex flex-col items-center space-y-1">
                <Avatar
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face"
                  alt="User"
                  size="small"
                  fallback="U"
                />
                <span className="text-xs">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;