"use client";

import dynamic from "next/dynamic";

/**
 * Client-only mount for the WebGL gift-card scene.
 *
 * `dynamic(..., { ssr: false })` is only allowed inside a Client Component in
 * Next.js 16 (it throws in Server Components), so this thin wrapper owns the
 * dynamic import while the parent `GiftCardsSummary` stays a server component.
 * The Three.js bundle therefore lands in its own client chunk and never runs
 * during SSR — a WebGL canvas can't be server-rendered.
 */
const GiftCardScene = dynamic(() => import("@/components/home/GiftCardScene"), {
  ssr: false,
});

export default function GiftCardSceneMount() {
  return <GiftCardScene />;
}
