# Building Android APK

## Purpose

This guide explains how to generate APK files for the Scroll One SuperApp, including both local builds and cloud-based EAS Build.

**Audience**: Mobile developers, DevOps engineers

## Prerequisites

1. **Java Development Kit (JDK)**: Version 17 or higher
   - Download from: https://adoptium.net/
   - Set `JAVA_HOME` environment variable

2. **Android SDK** (Optional but recommended for local builds)
   - Install Android Studio: https://developer.android.com/studio
   - Set `ANDROID_HOME` environment variable

## Method 1: Local Build

The Android native project has been generated. To build the APK:

### Step 1: Navigate to Android directory

```powershell
cd android
```

### Step 2: Build the APK

```powershell
.\gradlew.bat assembleRelease
```

**Note**: The first build may take 10-20 minutes as it downloads dependencies and sets up the build environment.

### Step 3: Find your APK

After the build completes, your APK will be located at:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Alternative: Build Debug APK (faster, for testing)

```powershell
.\gradlew.bat assembleDebug
```

Debug APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

## Method 2: EAS Build (Cloud - Recommended for Production)

EAS Build is Expo's cloud-based build service. It's easier and doesn't require local Android SDK setup.

### Step 1: Configure EAS Project (if not already done)

```powershell
npx eas-cli build:configure
```

### Step 2: Build APK

```powershell
# For preview/testing
npx eas-cli build --platform android --profile preview

# For production
npx eas-cli build --platform android --profile production
```

### Step 3: Download APK

After the build completes (usually 10-15 minutes), you'll receive a download link. Check builds at: https://expo.dev/accounts/[your-account]/projects/scroll-one-sui-superapp/builds

### Step 4: Link APK on the landing page

1. Open the finished build on [Expo](https://expo.dev/accounts/kevinisom9000/projects/scroll-one-sui-superapp/builds)
2. Copy the build page URL (e.g. `https://expo.dev/accounts/.../builds/<build-id>`)
3. Set `APK_DOWNLOAD_URL` at the top of `landing-page/app/page.tsx`
4. Redeploy the landing page

Users download the APK from the Expo build page (no need to commit large APK files to git).

## Troubleshooting

### Build Fails with "SDK not found"

- Install Android Studio and Android SDK
- Set `ANDROID_HOME` environment variable to your SDK path (usually `C:\Users\YourName\AppData\Local\Android\Sdk`)

### Build Fails with Java Version Error

- Ensure JDK 17+ is installed
- Set `JAVA_HOME` environment variable
- Verify: `java -version`

### Gradle Build is Slow

- First build always takes longer (downloading dependencies)
- Subsequent builds will be faster
- Consider using EAS Build for faster cloud builds

### APK Not Found

- Check `android/app/build/outputs/apk/` directory
- Ensure build completed successfully (no errors)

## Signing the APK (For Production)

For production releases, you need to sign your APK. See the Android documentation:
https://developer.android.com/studio/publish/app-signing

## Current Configuration

- **Package Name**: `app.rork.scroll_one_sui_superapp`
- **EAS Project**: `scroll-one-sui-superapp`
- **Version**: `1.0.0`
- **Build Type**: APK (configured in `eas.json`)

## Next Steps

1. Test the APK on an Android device
2. Update `APK_DOWNLOAD_URL` in `landing-page/app/page.tsx` after each new EAS build
3. For production, set up app signing
4. Consider using EAS Build for automated builds
5. Set up CI/CD for automated releases

---

**Related Documentation:**
- [Production Checklist](./production-checklist.md)
- [CI/CD](./ci-cd.md)
- [Environments](./environments.md)
