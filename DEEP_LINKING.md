# Deep Linking Testing Guide

This app supports deep linking with the following URL schemes:

## URL Schemes
- `totoai://` (Custom scheme)
- `https://totoai.com` (Universal links)

## Available Deep Links

### Dashboard
- `totoai://dashboard`
- `https://totoai.com/dashboard`

### Settings
- `totoai://settings`
- `https://totoai.com/settings`

### Profile
- `totoai://profile`
- `https://totoai.com/profile`

## Testing Deep Links

### iOS Simulator
1. Open Safari in the iOS Simulator
2. Enter one of the deep link URLs above
3. The app should open and navigate to the specified screen

### Android Emulator
1. Open a terminal and run:
   ```bash
   adb shell am start -W -a android.intent.action.VIEW -d "totoai://dashboard" com.totoai
   ```

### Physical Device
1. Open any browser or messaging app
2. Enter one of the deep link URLs
3. The app should open and navigate to the specified screen

### Testing from Terminal (iOS)
```bash
xcrun simctl openurl booted "totoai://dashboard"
xcrun simctl openurl booted "totoai://settings"
xcrun simctl openurl booted "totoai://profile"
```

### Testing from Terminal (Android)
```bash
adb shell am start -W -a android.intent.action.VIEW -d "totoai://dashboard" com.totoai
adb shell am start -W -a android.intent.action.VIEW -d "totoai://settings" com.totoai
adb shell am start -W -a android.intent.action.VIEW -d "totoai://profile" com.totoai
```

## Navigation Structure
The app uses a bottom tab navigator with three main screens:
- Dashboard (default)
- Settings
- Profile

Each screen has buttons to navigate to other screens, and deep links will automatically navigate to the specified screen when the app is opened.
