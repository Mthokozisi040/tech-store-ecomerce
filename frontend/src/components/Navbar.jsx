import { ShoppingCartIcon, ShoppingBagIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { useThemeStore } from '../store/useThemeStore.js';

const Navbar = () => {
    const { pathname } = useLocation(); // ✅ call useLocation()
    const isHomePage = pathname === '/';

    const { theme } = useThemeStore();
    console.log("Current theme:", theme);

    return (
        <div className='bg-base-100/80 backdrop-blur border-b border-base-content/10 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto'>
                <div className="navbar px-4 min-h-[4rem] justify-between">
                    {/* Logo */}
                    <div className="flex-1 lg:flex-none">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="flex items-center gap-2">
                                <ShoppingCartIcon className='size-6 text-primary' />
                                <span className="text-2xl font-semibold font-mono tracking-widest bg-clip-text 
                                    text-transparent bg-gradient-to-r from-primary to-secondary">
                                    TechStore
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-4">
                        <ThemeSelector />
                        {isHomePage && (
                            <div className='indicator indicator-primary'>
                                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                                    <ShoppingBagIcon className='size-6 text-primary' />
                                    <span className="badge badge-sm indicator-item bg-primary text-primary-content">
                                        9
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
