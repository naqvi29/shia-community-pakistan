'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';

const Sidebar = () => {
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Notifications', href: '/notifications', icon: 'bell' },
    { name: 'Bookmarks', href: '/bookmarks', icon: 'bookmark' },
    { name: 'Profile', href: '/profile', icon: 'user' },
    { name: 'Settings', href: '/settings', icon: 'settings' },
  ];

  const communityFeatures = [
    { name: 'Majalis', description: 'Religious gatherings', icon: 'star' },
    { name: 'Quran Study', description: 'Group discussions', icon: 'moon' },
    { name: 'Community Events', description: 'Local events', icon: 'heart' },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16">
      <div className="flex flex-col flex-grow bg-background border-r border-border">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="px-4 space-y-1">
            {/* Main Navigation */}
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? 'primary' : 'ghost'}
                      className={`w-full justify-start h-12 ${
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <Icon name={item.icon} size={20} className="mr-3" />
                      {item.name}
                      {item.name === 'Notifications' && (
                        <span className="ml-auto inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-accent rounded-full">
                          3
                        </span>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Create Post Button */}
            <div className="pt-4">
              <Button variant="primary" className="w-full h-12 text-base font-medium">
                <Icon name="plus" size={20} className="mr-3" />
                Create Post
              </Button>
            </div>

            {/* Community Features */}
            <div className="pt-6">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Community
              </h3>
              <div className="mt-2 space-y-1">
                {communityFeatures.map((feature) => (
                  <button
                    key={feature.name}
                    className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors duration-200 group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon name={feature.icon} size={16} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {feature.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Islamic Quote of the Day */}
            <div className="pt-6">
              <div className="bg-gradient-to-br from-primary/5 to-gold/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="star" size={16} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">
                      Quote of the Day
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      "The best of people is he whose benefit extends to others."
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      - Imam Ali (AS)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-border">
          <Link href="/profile" className="group block">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                alt="User Profile"
                size="medium"
                fallback="U"
                online={true}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  Ali Hassan
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  @alihassan
                </p>
              </div>
              <Icon name="settings" size={16} className="text-muted-foreground group-hover:text-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;