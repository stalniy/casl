// HTMLMediaElement.played contains only ranges actually played, including replays
// and excluding seeks. A fresh tracker and media resource define one viewing.
export function videoEngagement(video, track, data) {
  const session = { ...data, session_id: crypto.randomUUID() };
  const sent = new Set();
  const percentage = () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return 0;
    let watched = 0;
    for (let i = 0; i < video.played.length; i++) {
      watched += video.played.end(i) - video.played.start(i);
    }
    return Math.min(100, watched / video.duration * 100);
  };
  const once = (name) => {
    if (sent.has(name)) return;
    sent.add(name);
    track(`casl_video_${name}`, session);
  };
  const progress = () => {
    const watched = percentage();
    [25, 50, 75].forEach(mark => {
      if (watched >= mark) once(String(mark));
    });
    // Allow only a small rounding tolerance at the end of the media timeline.
    if (watched >= 99.9) once('complete');
  };

  once('open');
  return {
    play: () => once('play'),
    progress,
    close() {
      progress();
      track('casl_video_close', {
        ...session,
        watched_percentage: Number(percentage().toFixed(2)),
        position_seconds: Number(video.currentTime.toFixed(2)),
      });
    },
  };
}
