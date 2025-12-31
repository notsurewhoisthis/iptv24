---
title: "IPTV EPG Setup: Fixing Guide Sync and Time Shifts"
description: "EPG setup steps that fix guide mismatches, blank listings, and time zone offsets."
publishedDate: 2025-03-06
author: "Streaming Guide Lab"
image: "/images/og-image.png"
tags: ["epg", "iptv", "guide"]
keywords: ["iptv epg setup", "epg time shift", "iptv guide sync"]
howTo:
  name: "Set up IPTV EPG"
  steps:
    - name: "Confirm the EPG URL"
      text: "Make sure the link opens as XMLTV, not a login page."
    - name: "Add the EPG to your app"
      text: "Paste the URL in the EPG settings and refresh."
    - name: "Adjust the time shift"
      text: "Use +1 or -1 hour until listings align with the live channel time."
faq:
  - question: "Why is my EPG empty?"
    answer: "Most empty guides are caused by expired URLs or an XMLTV link that requires login."
  - question: "Why is my EPG off by one hour?"
    answer: "Use the EPG time shift setting in your app to correct it."
draft: false
---

A broken EPG makes IPTV feel unusable. The most common issues are a blank guide or a one-hour offset. The fix usually comes down to the right URL and a time shift setting.

## Step 1: Confirm your EPG URL

Your EPG link must be an XMLTV file. If you open the URL in a browser and see a wall of XML, it is valid. If you see a login page or HTML, it will fail in most apps.

## Step 2: Add EPG to the app

- Open the app settings
- Find EPG or Guide
- Paste the EPG URL
- Save and refresh

Some apps need a manual refresh. Give it 1-2 minutes for large schedules.

## Step 3: Fix the time shift

If all listings are off by one hour, use the app's EPG offset setting:

- +1 hour: listings are one hour behind
- -1 hour: listings are one hour ahead

## Step 4: Match EPG to playlists

Some providers offer multiple EPG files (sports, entertainment, or regional). Use the file that matches your playlist. A mismatched EPG will show the wrong channels.

## Common EPG problems

- **Blank listings:** expired URL or IP whitelist on the provider side
- **Wrong channels:** mismatched EPG file for the playlist
- **Slow EPG:** disable images/posters during sync

Once EPG is stable, go back and test playback. If you still see stutters, follow the IPTV buffering fix guide.

