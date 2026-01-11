---
title: "Xtream Codes API Setup Guide 2026: Every Device Covered"
description: "Complete guide to setting up IPTV using Xtream Codes API on Fire TV, Android TV, iOS, and more. Includes troubleshooting for login errors."
publishedDate: 2026-01-11
author: "Streaming Guide Lab"
image: "/images/og-default.png"
tags: ["xtream-codes", "setup", "api", "login", "iptv"]
keywords: ["xtream codes api", "xtream codes setup", "xtream codes not working", "xtream login failed", "iptv xtream codes"]
howTo:
  name: "Set up IPTV with Xtream Codes API"
  steps:
    - name: "Get your Xtream Codes credentials"
      text: "Your provider will give you: Server URL, Username, and Password. Keep these secure."
    - name: "Open your IPTV player app"
      text: "Launch TiviMate, IPTV Smarters Pro, or another Xtream-compatible player."
    - name: "Select Xtream Codes login"
      text: "Choose 'Login with Xtream Codes API' instead of M3U playlist."
    - name: "Enter your credentials"
      text: "Input Server URL exactly as provided (including http:// and port), then username and password."
    - name: "Wait for sync"
      text: "The app will connect to the server and download your channel list, VOD, and series. This may take 1-5 minutes."
faq:
  - question: "What is Xtream Codes API?"
    answer: "Xtream Codes is an IPTV management system that provides a structured API for user authentication. Instead of a raw M3U playlist URL, you log in with Server URL, Username, and Password. This enables better organization of Live TV, VOD, and Series content."
  - question: "Why does my Xtream Codes login fail?"
    answer: "Common causes: incorrect server URL format (missing http:// or port number), wrong username/password (case-sensitive), expired subscription, or your IP isn't authorized. Double-check all credentials and contact your provider if issues persist."
  - question: "What's the difference between Xtream Codes and M3U?"
    answer: "Xtream Codes is an API login system that organizes content into Live TV, VOD, and Series automatically. M3U is a raw playlist file. Xtream Codes offers better structure, easier updates, and typically includes EPG automatically."
  - question: "How do I find my Xtream Codes portal URL?"
    answer: "Your IPTV provider sends the server URL in your welcome email or activation message. It typically looks like: http://provider-domain.com:8080 or similar with a port number."
  - question: "Can I use Xtream Codes on Apple TV?"
    answer: "Yes, with apps that support Xtream Codes like IPTV Smarters Pro, iPlayTV, or GSE Smart IPTV. TiviMate is not available on Apple TV."
draft: false
---

Xtream Codes API is the most common way to authenticate with IPTV providers. This guide covers setup on every major device and troubleshooting for login issues.

## What Is Xtream Codes?

Xtream Codes is an IPTV management platform that providers use to deliver content. When you subscribe to an IPTV service, they typically give you:

- **Server URL**: The provider's server address (e.g., `http://iptv.example.com:8080`)
- **Username**: Your account username
- **Password**: Your account password

These three pieces allow IPTV apps to authenticate with the provider and download your channel list.

## Xtream Codes vs M3U Playlists

| Feature | Xtream Codes | M3U Playlist |
|---------|--------------|--------------|
| Login method | Server + Username + Password | Single URL |
| Content organization | Automatic categories (Live/VOD/Series) | Flat or group-tagged |
| EPG integration | Usually automatic | May require separate URL |
| Updates | Server-side, always current | URL-based, may need refresh |
| Security | Credentials not exposed in URL | Credentials visible in URL |

**Recommendation**: Use Xtream Codes when available. Fall back to M3U if your provider only offers that.

## Setup by Device

### Fire TV Stick / Fire TV

#### Using IPTV Smarters Pro:
1. Install IPTV Smarters Pro from Amazon App Store
2. Open app and select "Add New User"
3. Choose "Login with Xtream Codes API"
4. Enter:
   - **Any name**: Label for this connection
   - **Username**: From your provider
   - **Password**: From your provider  
   - **Server URL**: Include `http://` and port (e.g., `http://example.com:8080`)
5. Tap "Add User"
6. Wait for channels to load

#### Using TiviMate:
1. Install TiviMate from Amazon App Store
2. Go to Settings → Playlists → Add playlist
3. Select "Xtream Codes"
4. Enter Server URL, Username, Password
5. Name your playlist
6. Tap "Add"

### Android TV / Google TV

Same process as Fire TV. Both IPTV Smarters Pro and TiviMate are available on Google Play Store.

### Apple TV

TiviMate is not available on Apple TV. Use these alternatives:

#### IPTV Smarters Pro:
1. Install from App Store
2. Open and select "Add User"
3. Choose Xtream Codes login
4. Enter credentials and tap Add

#### iPlayTV:
1. Install iPlayTV from App Store
2. Go to Settings → Add Playlist
3. Select "Xstream Codes"
4. Enter Server, Username, Password

### iOS (iPhone/iPad)

#### IPTV Smarters Pro:
1. Download from App Store
2. Add New User → Xtream Codes API
3. Enter your credentials
4. Tap Add User

#### GSE Smart IPTV:
1. Open app → Remote Playlists
2. Tap + icon → Xtream Codes API
3. Enter Server URL, Username, Password
4. Save and load

### Windows PC

#### IPTV Smarters Pro:
1. Download from official website or Microsoft Store
2. Run the installer
3. Add User → Login with Xtream Codes API
4. Enter credentials

#### VLC (with M3U export):
VLC doesn't support Xtream Codes natively, but you can:
1. Convert Xtream to M3U URL:
   ```
   http://server:port/get.php?username=XXX&password=YYY&type=m3u_plus&output=ts
   ```
2. Open in VLC via Media → Open Network Stream

### macOS

Same options as Windows:
- IPTV Smarters Pro (native app available)
- VLC with converted M3U URL

## Xtream Codes URL Format

Understanding URL structure helps with troubleshooting:

### Server URL Format
```
http://[provider-domain]:[port]
```
Examples:
- `http://iptv.example.com:8080`
- `http://123.456.789.10:25461`

### Port Numbers
Common ports:
- 8080 (most common)
- 80
- 25461
- 826

**Always include the port number** unless your provider specifies otherwise.

### API Endpoints

Xtream Codes uses these endpoints internally:
- `/player_api.php` - Authentication and content lists
- `/panel_api.php` - Provider panel
- `/get.php` - M3U playlist generation

You don't need to type these—your IPTV app handles them automatically.

## Troubleshooting Login Errors

### "Login Failed" or "Authentication Failed"

**Check these first:**
1. **Server URL format**: Must include `http://` and port
   - ❌ `example.com:8080`
   - ✅ `http://example.com:8080`
2. **No trailing slash**: Remove `/` at end of URL
   - ❌ `http://example.com:8080/`
   - ✅ `http://example.com:8080`
3. **Case sensitivity**: Username and password are often case-sensitive
4. **Spaces**: Check for accidental spaces before/after credentials
5. **Subscription status**: Verify with provider that account is active

### "Server Not Found" or Connection Timeout

**Possible causes:**
1. Server URL is incorrect
2. Provider server is down
3. Your ISP is blocking the port
4. VPN required to access

**Solutions:**
- Test the server URL in a browser (you should see a login page or API response)
- Try with a VPN connected
- Contact provider to verify server status

### "Max Connections Reached"

Your provider limits simultaneous streams. Solutions:
- Wait for other devices to disconnect
- Log out of other devices watching IPTV
- Upgrade to a plan with more connections

### VOD or Series Not Loading

If Live TV works but VOD doesn't:
1. Wait longer—VOD libraries are large
2. Check if your subscription includes VOD
3. Restart the app and try again
4. Clear app cache

## Security Considerations

### Protect Your Credentials
- Never share your login details
- Don't post credentials in forums
- Change password if you suspect compromise

### Use HTTPS When Available
If your provider offers `https://` server URL, use it for encrypted connections.

### VPN Usage
Consider a VPN to:
- Prevent ISP from seeing your IPTV traffic
- Bypass potential ISP blocking
- Add privacy layer

See our [VPN for IPTV guide](/guides/best-vpn-for-iptv-2026/) for setup instructions.

## Converting Between Xtream Codes and M3U

If you need an M3U URL from Xtream Codes credentials:

```
http://[server]:[port]/get.php?username=[USER]&password=[PASS]&type=m3u_plus&output=ts
```

Replace:
- `[server]` with your server domain
- `[port]` with the port number
- `[USER]` with your username
- `[PASS]` with your password

### Output Formats
- `output=ts` - MPEG-TS streams
- `output=m3u8` - HLS streams (better for iOS/Apple devices)

## Device-Specific Guides

For detailed device setup:
- [Fire TV Stick IPTV Setup](/guides/fire-tv-stick-iptv-setup/)
- [Apple TV 4K IPTV Setup](/guides/iptv-apple-tv-4k-setup/)
- [Android TV Troubleshooting](/troubleshooting/platforms/android-tv/)

## Related Resources
- [M3U Playlist Guide](/guides/m3u-playlist-guide/) - Alternative playlist method
- [IPTV Login/Xtream Fix](/troubleshooting/iptv-login-xtream-codes-fix/) - Detailed troubleshooting
