# Telegram Integration Short Planning

## Overview
We need to implement Telegram Mini App integration in our application, based on the existing implementation in the surf-coffee-app project.

## Implementation Approach

1. **Setup Dependencies** ✅
   - Install necessary packages (@twa-dev/sdk) ✅
   - Setup configuration in next.js files ✅

2. **Telegram Core Functionality** ✅
   - Create useTelegram hook to handle Telegram Web App methods ✅
   - Create layout component for handling safe area and swipe controls ✅
   - Implement fullscreen mode ✅

3. **Authentication with Supabase** ✅
   - Use Telegram user data for authentication ✅
   - Store user info in Supabase users table ✅
   - Create table-based auth flow ✅

4. **UI Components** ✅
   - Create safe area components ✅
   - Implement theme handling based on Telegram theme ✅
   - Build user profile components ✅

## Implementation Order
1. Create base hooks and components ✅
2. Setup Supabase integration ✅
3. Implement user authentication ✅
4. Add UI enhancements and safe areas ✅

## Technical Details
- Use WebApp SDK for Telegram Mini App integration ✅
- Disable vertical swipes where needed ✅
- Handle safe area insets for all devices ✅
- Implement fallbacks for non-Telegram environments ✅

## Next Steps
- Add Supabase client integration to user service
- Implement actual user data storage
- Add more Telegram WebApp features:
  - Haptic feedback
  - Main Button for important actions
  - Theme adaptation for dark/light mode 