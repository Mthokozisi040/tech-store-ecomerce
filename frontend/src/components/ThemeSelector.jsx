import { PaletteIcon } from 'lucide-react';
import React from 'react';
import { THEMES } from '../constants/index.js';
import { useThemeStore } from '../store/useThemeStore.js';

const ThemeSelector = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className='dropdown dropdown-end'>
            <button tabIndex={0} className='btn btn-ghost btn-circle'>
                <PaletteIcon className='size-6 text-primary' />
            </button>
            <div
                tabIndex={0}
                className='dropdown-content menu mt-2 p-1 shadow-2xl bg-base-200 rounded-2xl w-56 border border-base-content/10'
            >
                {THEMES.map((themeOption) => (
                    <button
                        key={themeOption.name}
                        className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors hover:bg-base-300 ${
                            themeOption.name === theme
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-base-content/5'
                        }`}
                        onClick={() => setTheme(themeOption.name)}
                    >
                        <PaletteIcon className='size-5 text-primary' />
                        <span className='text-base-content'>{themeOption.name}</span>
                        <div className='ml-auto font-medium flex gap-1'>
                            {themeOption.colours.map((colour, i) => (
                                <span
                                    key={i}
                                    className='inline-block w-4 h-4 rounded-full ml-1'
                                    style={{ backgroundColor: colour }}
                                ></span>
                            ))}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector;