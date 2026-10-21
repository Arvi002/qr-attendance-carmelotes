# Aurora Expo Standalone Edition

This project is based on the provided QR-ATT_FINALS-master Expo app.

Includes redesigned Aurora screens and swipe-up AppDrawer navigation with the original Expo QR and Supabase logic. Additional screens: Insights, Reminders, Rewards and Live Monitor. Teacher/Admin routes remain role gated.

Intentionally excluded: Vercel deployment configuration, browser-specific check-in URL generation, forgot-password and reset-password screens.

Setup: copy .env.example to .env, supply EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY, then npm install and npx expo start.
