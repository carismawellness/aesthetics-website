'use client';

import VideoPlayer from '@/components/VideoPlayer';

/**
 * Body-package hero video. Thin wrapper over the shared VideoPlayer so every
 * video on the site behaves identically: no autoplay, click-to-play at full
 * volume, with a sound on/off toggle.
 */
export default function HeroVideoPlayer({
  src,
  poster,
  ratio = '398 / 682',
  alt,
}: {
  src: string;
  poster?: string;
  ratio?: string;
  alt: string;
}) {
  return <VideoPlayer ratio={ratio} radius={18} src={src} poster={poster} label={alt} />;
}
