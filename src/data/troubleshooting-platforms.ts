export type PlatformGuide = {
  slug: string;
  name: string;
  os: string;
  store: string;
  settingsPath: string;
  notes: string[];
  networkTips: string[];
  appTips: string[];
};

export type TroubleshootTopic = {
  slug: string;
  title: string;
  symptoms: string[];
  quickFixes: string[];
  deepChecks: string[];
  providerChecks: string[];
  faq: { question: string; answer: string }[];
};

export const platforms: PlatformGuide[] = [
  {
    slug: 'apple-tv',
    name: 'Apple TV 4K',
    os: 'tvOS',
    store: 'Apple TV App Store',
    settingsPath: 'Settings -> Video and Audio',
    notes: [
      'Enable Match Frame Rate to reduce judder on live streams.',
      'Use Ethernet when possible for stable bitrate spikes.',
    ],
    networkTips: ['Restart your router and Apple TV after major updates.', 'Prefer 5 GHz Wi-Fi if Ethernet is not possible.'],
    appTips: ['Check buffer length settings if your player supports them.', 'Confirm the app supports HLS and MPEG-TS.'],
  },
  {
    slug: 'ios',
    name: 'iPhone and iPad',
    os: 'iOS',
    store: 'App Store',
    settingsPath: 'Settings -> Wi-Fi / Cellular',
    notes: [
      'Low Power Mode can impact long IPTV sessions.',
      'Background App Refresh may interfere with playback stability.',
    ],
    networkTips: ['Prefer Wi-Fi for live sports to avoid cell handoffs.', 'Disable VPN temporarily to isolate routing issues.'],
    appTips: ['Keep the app updated for codec fixes.', 'Restart the app after playlist updates.'],
  },
  {
    slug: 'macos',
    name: 'Mac (macOS)',
    os: 'macOS',
    store: 'Mac App Store',
    settingsPath: 'System Settings -> Network',
    notes: ['Disable heavy background downloads during live streaming.', 'Use wired Ethernet adapters for consistent throughput.'],
    networkTips: ['Test with a secondary DNS provider for route stability.', 'Avoid Bluetooth audio if you notice audio delay.'],
    appTips: ['Reduce poster art to speed playlist loads.', 'Refresh EPG after time zone changes.'],
  },
  {
    slug: 'android-tv',
    name: 'Android TV',
    os: 'Android TV',
    store: 'Google Play',
    settingsPath: 'Settings -> Device Preferences',
    notes: ['Clear app cache if the playlist fails to refresh.', 'Check storage space if the app fails to install updates.'],
    networkTips: ['Reboot after firmware updates to reinitialize Wi-Fi.', 'Prefer Ethernet on set-top boxes.'],
    appTips: ['Confirm your player supports Xtream Codes if needed.', 'Disable auto-refresh if EPG loops continuously.'],
  },
  {
    slug: 'google-tv',
    name: 'Google TV',
    os: 'Google TV',
    store: 'Google Play',
    settingsPath: 'Settings -> Network & Internet',
    notes: ['Keep the OS updated to avoid HDMI handshake issues.', 'Check HDMI cable if you lose HDR streams.'],
    networkTips: ['Use a high-quality Wi-Fi 6 router for 4K streams.', 'Restart the device after changing DNS.'],
    appTips: ['Re-import playlists after app updates.', 'Toggle HLS vs MPEG-TS for stability.'],
  },
  {
    slug: 'fire-tv',
    name: 'Amazon Fire TV / Firestick',
    os: 'Fire OS',
    store: 'Amazon Appstore',
    settingsPath: 'Settings -> My Fire TV',
    notes: ['Force stop the app if it stutters after long sessions.', 'Check storage; low storage often causes crashes.'],
    networkTips: ['Prefer 5 GHz Wi-Fi; Fire TV sticks can struggle on 2.4 GHz.', 'Disable VPN temporarily to isolate buffering.'],
    appTips: ['Clear cache after playlist changes.', 'Restart the stick if the EPG hangs.'],
  },
  {
    slug: 'roku',
    name: 'Roku',
    os: 'Roku OS',
    store: 'Roku Channel Store',
    settingsPath: 'Settings -> Network',
    notes: ['Roku apps are more sensitive to slow channel lists.', 'Restart the Roku after channel app updates.'],
    networkTips: ['Use Ethernet on Roku Ultra models.', 'Re-run network check after router changes.'],
    appTips: ['Keep channel apps updated for codec compatibility.', 'Remove unused channels to free memory.'],
  },
  {
    slug: 'samsung-tizen',
    name: 'Samsung Smart TV',
    os: 'Tizen',
    store: 'Samsung Apps',
    settingsPath: 'Settings -> Support -> Software Update',
    notes: ['Update the Smart Hub before troubleshooting app issues.', 'Power cycle the TV to clear memory.'],
    networkTips: ['Use wired Ethernet for large playlists.', 'Disable SmartThings background tasks during testing.'],
    appTips: ['Reinstall the IPTV app if playback stops after updates.', 'Check region settings for app availability.'],
  },
  {
    slug: 'lg-webos',
    name: 'LG Smart TV',
    os: 'webOS',
    store: 'LG Content Store',
    settingsPath: 'Settings -> All Settings -> General',
    notes: ['Turn off Quick Start+ to avoid app cache issues.', 'Update webOS before reinstalling apps.'],
    networkTips: ['Restart the router to refresh DHCP leases.', 'Use Ethernet for stable 4K streaming.'],
    appTips: ['Clear recent apps from memory.', 'Re-link playlist after app updates.'],
  },
  {
    slug: 'xiaomi',
    name: 'Xiaomi Mi Box / TV',
    os: 'Android TV',
    store: 'Google Play',
    settingsPath: 'Settings -> Device Preferences -> Storage',
    notes: ['Storage fills quickly on older Mi Box units.', 'Disable background apps to improve playback.'],
    networkTips: ['Use Ethernet adapters if Wi-Fi is unstable.', 'Restart after firmware updates.'],
    appTips: ['Reduce playlist images to speed loading.', 'Verify EPG URL on initial setup.'],
  },
  {
    slug: 'nvidia-shield',
    name: 'NVIDIA Shield',
    os: 'Android TV',
    store: 'Google Play',
    settingsPath: 'Settings -> Device Preferences -> Display & Sound',
    notes: ['Enable AI upscaling only if streams are stable.', 'Shield handles large EPG files well if storage is clear.'],
    networkTips: ['Gigabit Ethernet recommended for 4K IPTV.', 'Check HDMI cable for HDR issues.'],
    appTips: ['Adjust buffer length for live sports.', 'Update the app after Shield Experience upgrades.'],
  },
  {
    slug: 'chromecast',
    name: 'Chromecast with Google TV',
    os: 'Google TV',
    store: 'Google Play',
    settingsPath: 'Settings -> System -> About',
    notes: ['Reboot after installing large app updates.', 'HDR settings can impact playback on older TVs.'],
    networkTips: ['Prefer 5 GHz Wi-Fi for stable video.', 'Test DNS changes if streams stall.'],
    appTips: ['Clear app cache after playlist updates.', 'Switch stream protocol if audio drifts.'],
  },
  {
    slug: 'android-mobile',
    name: 'Android phones and tablets',
    os: 'Android',
    store: 'Google Play',
    settingsPath: 'Settings -> Network & Internet',
    notes: ['Battery optimization can pause IPTV apps in the background.', 'Disable data saver for stable streaming.'],
    networkTips: ['Use 5 GHz Wi-Fi for live IPTV channels.', 'Turn off adaptive connectivity if streams stall.'],
    appTips: ['Allow background data for playlist refreshes.', 'Clear cache after major updates.'],
  },
  {
    slug: 'windows',
    name: 'Windows 10/11 PC',
    os: 'Windows',
    store: 'Microsoft Store / Desktop apps',
    settingsPath: 'Settings -> Network & Internet',
    notes: ['Close heavy downloads during live IPTV sessions.', 'Disable battery saver on laptops for stable playback.'],
    networkTips: ['Use Ethernet when possible for stable throughput.', 'Flush DNS if streams fail after network changes.'],
    appTips: ['Switch hardware decoding on/off if playback stutters.', 'Reset player settings after major Windows updates.'],
  },
  {
    slug: 'linux',
    name: 'Linux (Ubuntu / Debian)',
    os: 'Linux',
    store: 'Flatpak / Snap / AppImage',
    settingsPath: 'Settings -> Network',
    notes: ['Check GPU drivers if video decoding stutters.', 'Use a wired connection for long live streams.'],
    networkTips: ['Test DNS changes if streams fail intermittently.', 'Restart NetworkManager after switching networks.'],
    appTips: ['Toggle hardware acceleration in the player settings.', 'Clear cache and re-import playlists when EPG fails.'],
  },
];

export const topics: TroubleshootTopic[] = [
  {
    slug: 'buffering',
    title: 'Buffering and stuttering',
    symptoms: [
      'Frequent pauses every few minutes',
      'Channel switches take too long',
      'Playback drops during peak hours',
    ],
    quickFixes: [
      'Increase buffer to 10-15 seconds for live streams.',
      'Switch to HLS if MPEG-TS is unstable.',
      'Use Ethernet or move closer to the router.',
    ],
    deepChecks: [
      'Test the playlist on another device to isolate the stream source.',
      'Disable heavy poster artwork during sync.',
      'Try an alternate DNS provider to avoid routing congestion.',
    ],
    providerChecks: [
      'Ask for an alternate server or playlist if buffering repeats on multiple devices.',
      'Verify the provider is not rate limiting during live events.',
    ],
    faq: [
      { question: 'Why does IPTV buffer every 10 minutes?', answer: 'That pattern often points to the stream source or CDN, not your device.' },
      { question: 'Does a VPN help buffering?', answer: 'Sometimes, but it can also add latency. Test playback with and without the VPN.' },
    ],
  },
  {
    slug: 'epg',
    title: 'EPG sync issues',
    symptoms: ['No guide data', 'Listings off by one hour', 'Guide refresh never finishes'],
    quickFixes: [
      'Confirm the EPG URL is XMLTV, not HTML.',
      'Apply a +1 or -1 hour time shift if listings are offset.',
      'Refresh the EPG manually after playlist updates.',
    ],
    deepChecks: [
      'Try a smaller regional EPG file to reduce load time.',
      'Disable images while the guide syncs for faster completion.',
    ],
    providerChecks: [
      'Request a new EPG URL from your provider if the link expires.',
      'Confirm the EPG matches your playlist region.',
    ],
    faq: [
      { question: 'Why is my EPG empty?', answer: 'Most empty guides are caused by expired URLs or XMLTV links that require login.' },
      { question: 'Why is my EPG off by one hour?', answer: 'Use the time shift setting in your IPTV app to align listings.' },
    ],
  },
  {
    slug: 'login-errors',
    title: 'Login and authentication errors',
    symptoms: ['Xtream Codes login fails', 'Playlist rejected', 'Invalid URL errors'],
    quickFixes: [
      'Double-check for extra spaces in the server URL or credentials.',
      'Verify the playlist is still active with your provider.',
      'Re-enter credentials after app updates.',
    ],
    deepChecks: [
      'Test login on a second device to confirm server status.',
      'Switch from HTTPS to HTTP only if your provider requires it.',
    ],
    providerChecks: [
      'Ask your provider to reset credentials or whitelist your IP.',
      'Request a new playlist URL if the existing one is expired.',
    ],
    faq: [
      { question: 'Why does Xtream Codes say invalid account?', answer: 'Most failures come from expired subscriptions or incorrect server URLs.' },
      { question: 'Should I use HTTP or HTTPS?', answer: 'Use whatever protocol your provider specifies; mismatches can fail login.' },
    ],
  },
  {
    slug: 'audio-sync',
    title: 'Audio or subtitle sync issues',
    symptoms: ['Audio lags behind video', 'Subtitles drift over time', 'Dialogue echoes'],
    quickFixes: [
      'Switch stream protocol (HLS vs MPEG-TS).',
      'Restart the stream after changing audio output.',
      'Try a different audio track if available.',
    ],
    deepChecks: [
      'Disable Bluetooth audio to test wired output.',
      'Lower video resolution to reduce decoding stress.',
    ],
    providerChecks: [
      'Request a different stream source for the channel.',
      'Ask if alternate audio tracks are available.',
    ],
    faq: [
      { question: 'Why is audio delayed only on some channels?', answer: 'Those channels may be encoded differently or have sync issues at the source.' },
      { question: 'Does HLS fix audio drift?', answer: 'HLS often keeps audio/video aligned better during long sessions.' },
    ],
  },
  {
    slug: 'app-crash',
    title: 'App crashes or freezes',
    symptoms: ['App closes during playback', 'Playlist hangs on load', 'App freezes after updates'],
    quickFixes: [
      'Force close and reopen the app.',
      'Clear the app cache and reload the playlist.',
      'Reboot the device after app updates.',
    ],
    deepChecks: [
      'Check available storage; low storage causes frequent crashes.',
      'Reinstall the app if the cache rebuild fails.',
    ],
    providerChecks: [
      'Test a smaller playlist file to isolate large EPG issues.',
      'Request a trimmed channel list from your provider.',
    ],
    faq: [
      { question: 'Why does the app crash after playlist sync?', answer: 'Large EPG files or low storage can overwhelm the app.' },
      { question: 'Is reinstalling safe?', answer: 'Yes, but keep your playlist URL handy before removing the app.' },
    ],
  },
  {
    slug: 'no-channels',
    title: 'No channels or blank lists',
    symptoms: ['Channel list is empty', 'Only a few channels appear', 'Favorites vanish'],
    quickFixes: [
      'Refresh the playlist and wait for sync to complete.',
      'Check for expired playlist URLs.',
      'Disable filtering or category locks in the app.',
    ],
    deepChecks: [
      'Try the playlist on another device.',
      'Reduce poster images if the list takes too long to render.',
    ],
    providerChecks: [
      'Ask for a refreshed or updated playlist.',
      'Confirm your subscription includes the missing channel groups.',
    ],
    faq: [
      { question: 'Why are only some channels visible?', answer: 'Category filters or expired playlists can hide channel groups.' },
      { question: 'Why are favorites gone?', answer: 'Playlist reimports can reset favorites unless the app supports backups.' },
    ],
  },
  {
    slug: 'vpn',
    title: 'VPN and geo restrictions',
    symptoms: ['Streams fail only with VPN', 'Login works but channels fail', 'Geo-blocked channels unavailable'],
    quickFixes: [
      'Switch VPN servers to reduce latency.',
      'Test playback with VPN off to isolate routing issues.',
      'Use a VPN protocol optimized for streaming.',
    ],
    deepChecks: [
      'Whitelist the IPTV app if your VPN supports split tunneling.',
      'Check if your provider blocks known VPN IP ranges.',
    ],
    providerChecks: [
      'Ask your provider if VPN use is supported.',
      'Request alternate server endpoints for your region.',
    ],
    faq: [
      { question: 'Should I always use a VPN?', answer: 'Only if required for privacy or access; it can add latency.' },
      { question: 'Why does VPN break some channels?', answer: 'Some providers block VPN IPs to reduce abuse.' },
    ],
  },
  {
    slug: 'playlist-refresh',
    title: 'Playlist refresh and updates',
    symptoms: ['New channels not appearing', 'EPG updates do not show', 'Old channels persist'],
    quickFixes: [
      'Force a manual playlist refresh.',
      'Clear cached data after major updates.',
      'Disable artwork to speed reloads.',
    ],
    deepChecks: [
      'Re-import the playlist under a new name.',
      'Check for provider URL changes.',
    ],
    providerChecks: [
      'Ask for the latest playlist URL.',
      'Confirm your subscription includes new channel packs.',
    ],
    faq: [
      { question: 'How often should I refresh?', answer: 'Weekly refreshes are usually enough unless your provider changes URLs.' },
      { question: 'Why do old channels remain?', answer: 'Some apps cache playlist data until you clear it.' },
    ],
  },
  {
    slug: 'stuck-loading',
    title: 'Playback stuck on loading',
    symptoms: ['Endless spinner after selecting a channel', 'Stream never starts', 'VOD freezes on load'],
    quickFixes: [
      'Switch stream protocol (HLS vs MPEG-TS).',
      'Force close the player and reopen the channel.',
      'Try a different channel to confirm the source.',
    ],
    deepChecks: [
      'Disable VPN or proxy routing to test server reachability.',
      'Check if the app is blocked by firewall or DNS filtering.',
    ],
    providerChecks: [
      'Ask your provider for a backup server URL.',
      'Confirm the channel is not under maintenance.',
    ],
    faq: [
      { question: 'Why does the spinner never stop?', answer: 'Usually the stream URL is unreachable or the format is unsupported.' },
      { question: 'Is this a device issue?', answer: 'If multiple apps stall on the same channel, it is likely the source.' },
    ],
  },
  {
    slug: 'black-screen',
    title: 'Black screen or no video',
    symptoms: ['Audio plays but video is black', 'Only subtitles show', 'Screen stays blank'],
    quickFixes: [
      'Toggle hardware decoding in the IPTV app.',
      'Switch to another stream format if available.',
      'Restart the app and re-open the channel.',
    ],
    deepChecks: [
      'Check HDR settings on the device or TV input.',
      'Lower the stream resolution to test compatibility.',
    ],
    providerChecks: [
      'Ask for an alternate stream source for the channel.',
      'Confirm the stream is not DRM-protected in your player.',
    ],
    faq: [
      { question: 'Why do I hear audio but see no video?', answer: 'That often means the codec is unsupported or HDR is misconfigured.' },
      { question: 'Does switching to HLS help?', answer: 'HLS can be more compatible with some devices.' },
    ],
  },
  {
    slug: 'slow-channel-switching',
    title: 'Slow channel switching',
    symptoms: ['Channel changes take 8-10 seconds', 'App freezes between channels', 'Guide navigation lag'],
    quickFixes: [
      'Reduce playlist artwork and channel logos.',
      'Clear cache and restart the app.',
      'Use favorites to limit the active channel list.',
    ],
    deepChecks: [
      'Test the playlist on a faster device to compare.',
      'Check storage space for local EPG cache.',
    ],
    providerChecks: [
      'Request a smaller playlist file from your provider.',
      'Ask if the server supports faster channel zapping.',
    ],
    faq: [
      { question: 'Why are channel switches slow on one device?', answer: 'Older chips and heavy playlists slow down channel loads.' },
      { question: 'Does Ethernet help zapping speed?', answer: 'It can reduce latency and make channel changes faster.' },
    ],
  },
  {
    slug: 'subtitle-issues',
    title: 'Subtitle and closed caption issues',
    symptoms: ['Subtitles missing', 'Wrong language', 'Text out of sync'],
    quickFixes: [
      'Switch subtitle tracks inside the player.',
      'Toggle subtitles off and on again.',
      'Try a different channel to confirm the issue.',
    ],
    deepChecks: [
      'Update the app to the latest version for subtitle fixes.',
      'Test an external subtitle file if supported.',
    ],
    providerChecks: [
      'Ask if alternate subtitle tracks are available.',
      'Report channels with broken caption data.',
    ],
    faq: [
      { question: 'Why are subtitles missing on some channels?', answer: 'Some sources do not include embedded subtitles.' },
      { question: 'Can I fix subtitle delay?', answer: 'Many players offer subtitle delay controls in settings.' },
    ],
  },
  {
    slug: 'video-quality',
    title: 'Low video quality or pixelation',
    symptoms: ['Blurry picture', 'Blocky compression artifacts', 'Resolution drops during playback'],
    quickFixes: [
      'Switch to a higher bitrate stream if available.',
      'Disable VPN to reduce latency.',
      'Lower device video output if it is mismatched with the stream.',
    ],
    deepChecks: [
      'Check network speed during peak hours.',
      'Use Ethernet to stabilize throughput.',
    ],
    providerChecks: [
      'Ask for alternate streams or a higher bitrate server.',
      'Confirm your plan includes HD or 4K channel groups.',
    ],
    faq: [
      { question: 'Why does IPTV look worse than cable?', answer: 'It depends on the source bitrate and compression used by the provider.' },
      { question: 'Will a better device improve quality?', answer: 'It helps with decoding, but source bitrate is still the main factor.' },
    ],
  },
  {
    slug: 'vod-issues',
    title: 'VOD not loading',
    symptoms: ['Movies do not start', 'VOD catalog empty', 'Stuck loading on VOD titles'],
    quickFixes: [
      'Refresh the VOD section or re-login.',
      'Switch to a different stream server if available.',
      'Clear app cache and try again.',
    ],
    deepChecks: [
      'Check if the app supports the provider VOD format.',
      'Test VOD on a second device to isolate the issue.',
    ],
    providerChecks: [
      'Ask if VOD access is included in your plan.',
      'Request a different VOD endpoint if the catalog is down.',
    ],
    faq: [
      { question: 'Why is live TV working but VOD is not?', answer: 'VOD often uses a separate server or CDN that may be offline.' },
      { question: 'Is VOD format different from live?', answer: 'Yes, some providers use different protocols for VOD.' },
    ],
  },
  {
    slug: 'catch-up',
    title: 'Catch-up or time-shift not working',
    symptoms: ['Catch-up menu empty', 'Time-shift buttons disabled', 'Replays fail to load'],
    quickFixes: [
      'Confirm the channel supports catch-up.',
      'Adjust the time shift offset if the guide is misaligned.',
      'Restart the app and reload the EPG.',
    ],
    deepChecks: [
      'Check if the provider requires a different playlist URL for catch-up.',
      'Try a different player that supports catch-up events.',
    ],
    providerChecks: [
      'Ask if catch-up is enabled for your account.',
      'Request a playlist URL with catch-up enabled.',
    ],
    faq: [
      { question: 'Why is catch-up missing on my device?', answer: 'Not all IPTV players support catch-up metadata.' },
      { question: 'Do I need a special playlist for catch-up?', answer: 'Many providers use a separate URL for catch-up support.' },
    ],
  },
  {
    slug: 'no-audio',
    title: 'No audio or wrong audio track',
    symptoms: ['Video plays without sound', 'Audio track is in the wrong language', 'Surround sound missing'],
    quickFixes: [
      'Switch audio tracks in the player.',
      'Restart the stream and choose a different channel.',
      'Disable surround output to test stereo playback.',
    ],
    deepChecks: [
      'Update the app if codec support was added recently.',
      'Try another device to confirm if the issue is channel-specific.',
    ],
    providerChecks: [
      'Ask for alternate audio tracks or sources.',
      'Report channels with missing audio tracks.',
    ],
    faq: [
      { question: 'Why does one channel have no audio?', answer: 'The source stream may have broken audio encoding.' },
      { question: 'Is this a device issue?', answer: 'If other channels work, it is likely the stream itself.' },
    ],
  },
  {
    slug: 'server-errors',
    title: 'Server errors or 404 responses',
    symptoms: ['Channels show 404 errors', 'Playlist URL fails to load', 'Server error messages appear'],
    quickFixes: [
      'Recheck the playlist URL for typos.',
      'Remove trailing spaces in Xtream Codes fields.',
      'Retry with HTTP/HTTPS based on provider instructions.',
    ],
    deepChecks: [
      'Test the URL in a browser to confirm the server response.',
      'Check if the provider changed the base server address.',
    ],
    providerChecks: [
      'Request a refreshed playlist or new login credentials.',
      'Ask if the server is undergoing maintenance.',
    ],
    faq: [
      { question: 'Why does my playlist return 404?', answer: 'The URL is often expired or mistyped.' },
      { question: 'Does changing servers help?', answer: 'Yes, some providers offer backup servers for outages.' },
    ],
  },
];
