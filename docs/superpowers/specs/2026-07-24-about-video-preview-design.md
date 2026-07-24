# About Video Preview Design

## Problem

The About section rotates between `ballvid1.mp4` and `ballvid2.mp4`, but their
poster attributes point to `ballpic1.jpeg` and `ballpic3.jpeg`. Those unrelated
photos appear before video playback and make it look as though still images are
part of the reel.

## Design

Keep the existing two-video rotation and all playback interactions unchanged.
Generate one static poster from the first frame of each video and store both
posters in `public`. Update the clip configuration so each video points only to
the poster derived from that same video.

This approach gives desktop and mobile browsers an immediate, reliable preview
without adding JavaScript-driven seeking or depending on each browser to render
a frame from metadata alone.

## Testing

Add a focused regression test for the reel's media configuration. It will verify
that the rotation contains exactly the two existing videos, that neither
basketball photo is used as a video poster, and that each video maps to its own
first-frame poster. Run the focused test, lint, and production build.

## Scope

No changes to the About section layout, photos, labels, clip order, click/hover
behavior, autoplay behavior, or video files.
