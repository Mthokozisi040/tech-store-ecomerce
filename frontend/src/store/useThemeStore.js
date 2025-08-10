import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("preferred-theme") || "pastel",
    setTheme: (theme) => {
        localStorage.setItem("preferred-theme", theme);
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
    },
}));

// Apply theme on initial load
document.documentElement.setAttribute(
    'data-theme',
    localStorage.getItem("preferred-theme") || "pastel"
);
