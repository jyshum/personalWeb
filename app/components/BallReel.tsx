"use client"

import { useRef, useState } from "react"

const clips = ["/ballvid1.mp4", "/ballvid2.mp4"]

export default function BallReel() {
  const [clip, setClip] = useState(0)
  const [hovering, setHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      className="group flex h-full cursor-pointer select-none flex-col"
      onMouseEnter={() => {
        setHovering(true)
        videoRef.current?.play()
      }}
      onMouseLeave={() => {
        setHovering(false)
        videoRef.current?.pause()
      }}
      onClick={() => setClip((c) => (c + 1) % clips.length)}
    >
      <div className="relative aspect-square overflow-hidden border border-rule sm:aspect-auto sm:flex-1">
        <video
          key={clip}
          ref={videoRef}
          src={clips[clip]}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={hovering}
          className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-500 [filter:grayscale(1)_brightness(0.85)] group-hover:[filter:sepia(0.2)_brightness(0.85)_saturate(0.85)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#d8cfbc] mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-4 pt-10 transition-opacity duration-300 group-hover:opacity-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper">
            Hover to play
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="font-mono text-[11px] tracking-[0.15em] text-faint">
          Court tape — 0{clip + 1} / 02
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors group-hover:text-accent">
          Click for next ↻
        </p>
      </div>
    </div>
  )
}
