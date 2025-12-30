import fs from 'node:fs/promises';
import path from 'node:path';

const guides = [
  {
    slug: 'iptv-playback-errors-fix',
    title: 'IPTV Playback Errors: Fix Common Error Messages',
    description: 'Resolve playback errors like failed to load, playback error, or stream unavailable with targeted fixes.',
    tags: ['playback', 'errors', 'iptv'],
    keywords: ['iptv playback error', 'iptv stream unavailable', 'iptv error fix'],
    sections: [
      'Playback errors usually point to a stream URL issue, a blocked connection, or an unsupported format. Start by testing a second channel and confirming the playlist is active.',
      'If the error appears on every channel, verify the playlist URL and credentials. If it appears only on one channel, the stream source may be down.',
      'Clear app cache, reload the playlist, and try switching between HLS and MPEG-TS if the app allows it.',
    ],
    checklist: [
      'Test two or three channels to isolate the stream source.',
      'Re-import the playlist to rebuild the channel list.',
      'Switch stream protocol and try again.',
    ],
    pitfalls: [
      'Assuming the app is broken when the provider is down.',
      'Using expired playlists that still appear to load.',
    ],
  },
  {
    slug: 'iptv-connection-timeout-fix',
    title: 'IPTV Connection Timeout Fix: When Streams Won\'t Start',
    description: 'Fix IPTV connection timeouts caused by DNS issues, VPN routing, or server congestion.',
    tags: ['timeout', 'network', 'iptv'],
    keywords: ['iptv timeout', 'iptv connection timeout', 'iptv stream timeout'],
    sections: [
      'Timeouts usually mean the player cannot reach the stream server in time. The cause can be DNS, VPN routing, or provider congestion.',
      'Test the same playlist on a second device and on a different network. If both fail, the provider server may be overloaded.',
      'Try a different DNS provider or disable VPN temporarily to isolate routing issues.',
    ],
    checklist: [
      'Restart the router and streaming device.',
      'Disable VPN and test again.',
      'Switch DNS to a public resolver like 1.1.1.1 or 8.8.8.8.',
    ],
    pitfalls: [
      'Ignoring DNS issues that only appear on one ISP.',
      'Testing only one device before contacting support.',
    ],
  },
  {
    slug: 'iptv-playlist-expired-fix',
    title: 'IPTV Playlist Expired: How to Restore Channels',
    description: 'Expired playlists lead to blank channels or login errors. Refresh the URL and restore access fast.',
    tags: ['playlist', 'expired', 'iptv'],
    keywords: ['iptv playlist expired', 'm3u expired', 'xtream codes expired'],
    sections: [
      'Playlists can expire when tokens are rotated or subscriptions end. Channels may disappear even if the app still shows the playlist name.',
      'Ask your provider for a refreshed URL or new login credentials, then re-import the playlist.',
      'After updating, clear cache to prevent the old channel list from persisting.',
    ],
    checklist: [
      'Request a new playlist URL from your provider.',
      'Remove the old playlist and add the new one.',
      'Refresh the EPG after re-importing.',
    ],
    pitfalls: [
      'Reloading the same expired playlist URL repeatedly.',
      'Forgetting to refresh the EPG after updating.',
    ],
  },
  {
    slug: 'iptv-internal-server-error-fix',
    title: 'IPTV Internal Server Error: What to Do Next',
    description: 'Internal server errors indicate provider-side issues. Learn how to confirm and work around them.',
    tags: ['server error', 'iptv', 'provider'],
    keywords: ['iptv internal server error', 'iptv 500 error', 'iptv server down'],
    sections: [
      'Internal server errors usually point to provider outages or overloaded servers, not your device.',
      'Confirm by testing the playlist on another device or network. If the error persists, it is likely server-side.',
      'Request a backup server URL or wait for the provider to resolve the outage.',
    ],
    checklist: [
      'Test the playlist on a second device.',
      'Ask for a backup server endpoint.',
      'Retry after 15-30 minutes if the provider is overloaded.',
    ],
    pitfalls: [
      'Reinstalling the app when the server is down.',
      'Changing settings repeatedly without confirming server status.',
    ],
  },
  {
    slug: 'iptv-codec-issues-fix',
    title: 'IPTV Codec Issues: Fix Unsupported Video Formats',
    description: 'Unsupported codecs cause black screens or audio-only playback. Fix it with player settings.',
    tags: ['codec', 'video', 'iptv'],
    keywords: ['iptv codec issues', 'iptv unsupported codec', 'iptv video format'],
    sections: [
      'Codec issues appear when the device cannot decode the video stream. You may hear audio but see a black screen.',
      'Switching between hardware and software decoding in the app can restore playback.',
      'If possible, request an alternate stream from your provider with a different codec.',
    ],
    checklist: [
      'Toggle hardware decoding in the app settings.',
      'Switch to a different channel to compare results.',
      'Update the app to the latest version.',
    ],
    pitfalls: [
      'Assuming the TV is broken when it is a codec mismatch.',
      'Using outdated apps that lack newer codec support.',
    ],
  },
  {
    slug: 'iptv-stream-quality-fix',
    title: 'Low IPTV Stream Quality: Fix Pixelation and Blurry Video',
    description: 'Improve IPTV image quality by testing alternate streams and reducing network congestion.',
    tags: ['quality', 'iptv', 'video'],
    keywords: ['iptv low quality', 'iptv pixelation', 'iptv blurry'],
    sections: [
      'Low quality usually comes from low bitrate streams or network congestion.',
      'Test the same channel on another device to confirm whether the issue is the stream source.',
      'Switch to a higher bitrate channel if available, and use Ethernet to stabilize throughput.',
    ],
    checklist: [
      'Check if the provider offers multiple stream qualities.',
      'Use Ethernet or stronger Wi-Fi for high-bitrate channels.',
      'Disable VPN if it reduces bandwidth.',
    ],
    pitfalls: [
      'Assuming 4K automatically equals high quality.',
      'Overloading Wi-Fi with multiple devices during live viewing.',
    ],
  },
  {
    slug: 'iptv-subtitle-missing-fix',
    title: 'IPTV Subtitles Missing: Restore Captions and Language Tracks',
    description: 'Fix missing subtitles or wrong languages by switching tracks and updating the app.',
    tags: ['subtitles', 'iptv'],
    keywords: ['iptv subtitles missing', 'iptv captions', 'iptv subtitle fix'],
    sections: [
      'Subtitles may be missing because the stream does not include them or the app is set to the wrong language.',
      'Switch subtitle tracks inside the player and refresh the stream to confirm.',
      'If subtitles are missing across many channels, test a different player app.',
    ],
    checklist: [
      'Switch subtitle tracks in the player settings.',
      'Restart the stream after changing subtitle options.',
      'Update the app to the latest version.',
    ],
    pitfalls: [
      'Assuming subtitles are available on every channel.',
      'Ignoring language settings in the app.',
    ],
  },
  {
    slug: 'iptv-no-audio-fix',
    title: 'IPTV No Audio Fix: Restore Sound Fast',
    description: 'Solve IPTV audio issues by switching tracks, adjusting output, and testing codecs.',
    tags: ['audio', 'iptv'],
    keywords: ['iptv no audio', 'iptv sound not working', 'iptv audio fix'],
    sections: [
      'No-audio issues often come from unsupported audio codecs or wrong output settings.',
      'Switch audio tracks inside the app and test stereo output to isolate the issue.',
      'If the issue appears only on a few channels, the stream audio may be broken.',
    ],
    checklist: [
      'Switch audio tracks in the player.',
      'Disable surround output temporarily.',
      'Test another channel to confirm the source.',
    ],
    pitfalls: [
      'Assuming the device is broken when it is a stream issue.',
      'Leaving Bluetooth audio on when latency is high.',
    ],
  },
  {
    slug: 'iptv-catch-up-not-working',
    title: 'IPTV Catch-Up Not Working: Fix Replay Features',
    description: 'Catch-up issues often come from missing metadata or unsupported players. Fix it with these steps.',
    tags: ['catch-up', 'iptv'],
    keywords: ['iptv catch up not working', 'iptv replay', 'iptv time shift'],
    sections: [
      'Catch-up relies on provider support and correct EPG metadata. If it is missing, your app may not show replay options.',
      'Confirm the channel supports catch-up and the EPG is properly synced.',
      'Some apps require a specific playlist flag to enable catch-up links.',
    ],
    checklist: [
      'Confirm catch-up support with your provider.',
      'Refresh the EPG and verify time shifts.',
      'Try a different player app if catch-up stays blank.',
    ],
    pitfalls: [
      'Expecting catch-up on every channel.',
      'Using players that do not support catch-up tags.',
    ],
  },
  {
    slug: 'iptv-vpn-not-working',
    title: 'IPTV VPN Not Working: Fix Streams That Fail on VPN',
    description: 'Some IPTV providers block VPN IPs. Use the right server and split tunneling to fix it.',
    tags: ['vpn', 'iptv'],
    keywords: ['iptv vpn not working', 'iptv vpn blocked', 'iptv vpn fix'],
    sections: [
      'VPNs can add latency or trigger provider blocks. If streams fail only on VPN, you need to adjust the setup.',
      'Switch VPN servers, test different protocols, and consider split tunneling to reduce latency.',
      'If all VPN servers fail, contact your provider about VPN support.',
    ],
    checklist: [
      'Switch to a nearby VPN server.',
      'Test HLS instead of MPEG-TS.',
      'Enable split tunneling if available.',
    ],
    pitfalls: [
      'Using faraway VPN servers that add latency.',
      'Assuming VPN is required when it is not.',
    ],
  },
  {
    slug: 'iptv-m3u-url-not-working',
    title: 'M3U URL Not Working: Fix Invalid Playlist Links',
    description: 'Fix invalid M3U links by checking URL syntax, expiration, and provider changes.',
    tags: ['m3u', 'playlist', 'iptv'],
    keywords: ['m3u url not working', 'iptv m3u invalid', 'iptv playlist url'],
    sections: [
      'Invalid M3U URLs usually point to expired tokens or incorrect server links.',
      'Open the URL in a browser to verify it loads text data instead of an error page.',
      'If the provider rotated URLs, request the new playlist link and re-import it.',
    ],
    checklist: [
      'Remove extra spaces from the URL.',
      'Open the link in a browser to confirm it loads.',
      'Request a refreshed URL if it returns 404.',
    ],
    pitfalls: [
      'Saving old URLs after a provider migration.',
      'Copying incomplete links from emails or chats.',
    ],
  },
  {
    slug: 'iptv-xtream-auth-failed',
    title: 'Xtream Codes Authentication Failed: Fix Login Quickly',
    description: 'Authentication failures can come from wrong server URLs, expired accounts, or IP blocks.',
    tags: ['xtream codes', 'login', 'iptv'],
    keywords: ['xtream codes auth failed', 'iptv login failed', 'xtream iptv error'],
    sections: [
      'Authentication errors usually mean the server URL, username, or password is incorrect.',
      'Confirm details with your provider and test the login on a second device.',
      'If the login works elsewhere, check for VPN or IP blocks.',
    ],
    checklist: [
      'Re-enter username, password, and server URL.',
      'Disable VPN to test without routing changes.',
      'Ask for a password reset if the account expired.',
    ],
    pitfalls: [
      'Using the wrong protocol (HTTP vs HTTPS).',
      'Leaving trailing spaces in login fields.',
    ],
  },
  {
    slug: 'iptv-channel-freezing-fix',
    title: 'IPTV Channel Freezing on Specific Channels',
    description: 'When only some channels freeze, the issue is usually stream-specific rather than device-wide.',
    tags: ['channels', 'iptv'],
    keywords: ['iptv channel freezing', 'iptv channel stuck', 'iptv stream freeze'],
    sections: [
      'If a single channel freezes while others work, the stream source is likely unstable.',
      'Test a different channel group or alternate server if your provider offers one.',
      'Switch stream protocol to see if it improves stability.',
    ],
    checklist: [
      'Test the channel on another device.',
      'Try HLS vs MPEG-TS on the same channel.',
      'Ask for an alternate stream source.',
    ],
    pitfalls: [
      'Reinstalling the app when only one channel fails.',
      'Ignoring server-side issues during live events.',
    ],
  },
  {
    slug: 'iptv-epg-timezone-fix',
    title: 'EPG Time Zone Fix: Align Guide Listings',
    description: 'Use time shift settings to fix EPG listings that show the wrong schedule.',
    tags: ['epg', 'timezone', 'iptv'],
    keywords: ['iptv epg timezone fix', 'iptv guide wrong time', 'epg offset'],
    sections: [
      'EPG offsets are common when your device time zone does not match the provider data.',
      'Most apps include a +/- hour offset setting. Adjust and refresh the guide to confirm.',
      'Daylight saving changes often require a temporary time shift update.',
    ],
    checklist: [
      'Check device time zone settings.',
      'Apply a +1 or -1 hour offset in the app.',
      'Refresh the EPG after changing the offset.',
    ],
    pitfalls: [
      'Changing the device time without refreshing the EPG.',
      'Using multiple EPG sources with different time zones.',
    ],
  },
  {
    slug: 'iptv-app-update-broke-playback',
    title: 'IPTV App Update Broke Playback: What to Do',
    description: 'App updates can change decoding or playlist parsing. Roll back settings and restore playback.',
    tags: ['app update', 'iptv'],
    keywords: ['iptv app update issues', 'iptv update broke playback', 'iptv app bug'],
    sections: [
      'Sometimes app updates introduce bugs or reset settings. Start by checking buffer and decoder settings.',
      'Clear cache, re-import the playlist, and restart the device to rebuild the app state.',
      'If the issue persists, contact the app developer or use a backup app until the next update.',
    ],
    checklist: [
      'Restart the app and device after updates.',
      'Re-enter playlist and EPG URLs.',
      'Report the bug to the app developer.',
    ],
    pitfalls: [
      'Ignoring release notes that mention playback changes.',
      'Assuming the provider is at fault without testing older app versions.',
    ],
  },
  {
    slug: 'iptv-device-storage-full',
    title: 'IPTV Device Storage Full: Prevent Crashes and Free Space',
    description: 'Low storage causes IPTV apps to crash during EPG sync and playlist updates.',
    tags: ['storage', 'iptv'],
    keywords: ['iptv storage full', 'iptv cache full', 'iptv app crashing'],
    sections: [
      'Streaming devices with limited storage can crash when large EPG files sync.',
      'Clear app cache, delete unused apps, and reduce playlist size to recover space.',
      'Consider a device upgrade if storage limits keep recurring.',
    ],
    checklist: [
      'Clear IPTV app cache and data.',
      'Remove unused apps and old downloads.',
      'Trim playlists and EPG files.',
    ],
    pitfalls: [
      'Syncing huge playlists on 8GB devices.',
      'Ignoring storage warnings until the app fails.',
    ],
  },
  {
    slug: 'iptv-subscription-limit-reached',
    title: 'IPTV Subscription Limit Reached: Fix Connection Caps',
    description: 'Many providers limit simultaneous streams. Learn how to avoid connection caps.',
    tags: ['subscription', 'limits', 'iptv'],
    keywords: ['iptv connection limit', 'iptv simultaneous streams', 'iptv limit reached'],
    sections: [
      'If a provider limits concurrent streams, new logins may be blocked when too many devices are active.',
      'Log out of unused devices and confirm your subscription tier.',
      'Some providers offer multi-connection upgrades for larger households.',
    ],
    checklist: [
      'Log out of unused devices.',
      'Confirm your plan connection limits.',
      'Upgrade to a multi-connection plan if needed.',
    ],
    pitfalls: [
      'Leaving old devices logged in permanently.',
      'Attempting multiple 4K streams on a single-connection plan.',
    ],
  },
  {
    slug: 'iptv-hdmi-handshake-issues',
    title: 'IPTV HDMI Handshake Issues: Fix Blank Screens',
    description: 'HDMI handshake problems can cause blank screens or HDR failures on IPTV devices.',
    tags: ['hdmi', 'video', 'iptv'],
    keywords: ['iptv hdmi handshake', 'iptv blank screen', 'iptv hdr issues'],
    sections: [
      'HDMI handshake issues often appear after OS updates or when switching HDR modes.',
      'Use a high-quality HDMI cable, and test a different TV input to confirm the issue.',
      'Disable HDR temporarily to see if the stream appears.',
    ],
    checklist: [
      'Swap the HDMI cable and port.',
      'Disable HDR output to test compatibility.',
      'Reboot the TV and streaming box.',
    ],
    pitfalls: [
      'Assuming the IPTV app is broken when it is an HDMI issue.',
      'Using older HDMI cables for HDR streams.',
    ],
  },
  {
    slug: 'iptv-audio-format-unsupported',
    title: 'IPTV Audio Format Unsupported: Fix Silent Channels',
    description: 'Unsupported audio formats can silence specific channels. Adjust output settings to restore sound.',
    tags: ['audio', 'codec', 'iptv'],
    keywords: ['iptv audio format unsupported', 'iptv silent channel', 'iptv audio codec'],
    sections: [
      'Some channels use AC3 or E-AC3 audio that older devices cannot decode.',
      'Switch to a different audio track or force stereo output to restore sound.',
      'Updating the app or device firmware can add codec support.',
    ],
    checklist: [
      'Switch audio tracks within the player.',
      'Disable surround output temporarily.',
      'Update the app and device firmware.',
    ],
    pitfalls: [
      'Assuming a channel is broken instead of checking audio format.',
      'Using Bluetooth audio where codecs are limited.',
    ],
  },
  {
    slug: 'iptv-isp-blocking',
    title: 'IPTV Not Working on One Network: ISP or DNS Blocking',
    description: 'If IPTV works on mobile data but not home Wi-Fi, ISP or DNS blocking may be the cause.',
    tags: ['network', 'isp', 'iptv'],
    keywords: ['iptv isp blocking', 'iptv dns block', 'iptv not working wifi'],
    sections: [
      'When IPTV only fails on one network, the ISP or DNS settings are likely interfering with the stream.',
      'Switch DNS providers or test with a VPN to confirm the issue.',
      'If the stream works elsewhere, report the block to your ISP or provider.',
    ],
    checklist: [
      'Test IPTV on mobile data as a baseline.',
      'Switch DNS to a public resolver.',
      'Try a VPN to confirm blocking.'
    ],
    pitfalls: [
      'Resetting the app without testing network differences.',
      'Assuming the provider is down when the ISP is blocking.',
    ],
  },
];

const outputDir = path.join(process.cwd(), 'src', 'content', 'troubleshooting');
await fs.mkdir(outputDir, { recursive: true });

for (const guide of guides) {
  const filePath = path.join(outputDir, `${guide.slug}.md`);
  const content = `---\n` +
    `title: "${guide.title}"\n` +
    `description: "${guide.description}"\n` +
    `publishedDate: 2025-04-29\n` +
    `author: "StreamWise Lab"\n` +
    `image: "/images/og-image.png"\n` +
    `tags: [${guide.tags.map((tag) => `"${tag}"`).join(', ')}]\n` +
    `keywords: [${guide.keywords.map((keyword) => `"${keyword}"`).join(', ')}]\n` +
    `draft: false\n` +
    `---\n\n` +
    `${guide.sections.join('\n\n')}\n\n` +
    `## Quick checklist\n\n` +
    guide.checklist.map((item) => `- ${item}`).join('\n') +
    `\n\n## Common pitfalls\n\n` +
    guide.pitfalls.map((item) => `- ${item}`).join('\n') +
    `\n`;

  await fs.writeFile(filePath, content, 'utf-8');
}

console.log(`Generated ${guides.length} troubleshooting guides in ${outputDir}`);
