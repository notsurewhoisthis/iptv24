---
title: "IPTV Black Screen Fix: Audio With No Video"
description: "Fix IPTV streams that play audio but show a black screen by adjusting codecs, HDR, and playback settings."
publishedDate: 2025-03-06
author: "Streaming Guide Lab"
image: "/images/og-image.png"
tags: ["black screen", "iptv", "video", "codec"]
keywords: ["iptv black screen", "audio but no video", "iptv codec fix"]
howTo:
  name: "Fix IPTV black screen playback"
  steps:
    - name: "Toggle hardware decoding"
      text: "Switch hardware decoding on or off in the IPTV app and reload the stream."
    - name: "Change stream protocol"
      text: "Try HLS instead of MPEG-TS or vice versa if the player supports it."
    - name: "Disable HDR temporarily"
      text: "Turn off HDR output in the device settings to confirm the stream renders correctly."
    - name: "Lower the stream resolution"
      text: "Test a lower-resolution stream to confirm compatibility with your device codec."
faq:
  - question: "Why do I hear audio but see no video?"
    answer: "The device cannot decode the video codec or HDR mode for that stream."
  - question: "Does turning off HDR help?"
    answer: "Yes. Some devices fail to render HDR streams even when audio plays." 
---

A black screen with audio usually means the video codec is unsupported or the HDR mode is misconfigured. The fix is often a simple toggle in the player or device settings.

## Toggle hardware decoding

Switch hardware decoding on or off in the app settings. Some IPTV apps default to hardware decoding that older chips cannot handle.

## Change stream protocol

If the app supports it, switch between HLS and MPEG-TS. One protocol may be more compatible with your device.

## Test HDR output

Disable HDR or match the TV input settings. Some TVs require a specific HDMI port or HDR mode for 4K HDR streams.

## When to contact the provider

If the black screen only happens on specific channels, ask for a different stream source or report the codec issue.
