"use client"

import { useEffect, useRef, useState } from "react"

/* Placeholder for swapping the skull once there is more than one dinosaur.
   For now it says so, rather than pretending to do something. */
export default function ChangeDinosaur() {
  const [shout, setShout] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  function pop() {
    /* Bumping the key restarts the animation on a repeat click, which a plain
       boolean would not do while the message is still on screen. */
    setShout((n) => n + 1)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setShout(0), 1900)
  }

  return (
    <div className="relative flex justify-center">
      {shout > 0 && (
        <span key={shout} className="dino-pop font-krona" aria-hidden="true">
          more dinos coming soon!
        </span>
      )}

      <button type="button" onClick={pop} className="dino-button font-krona">
        Change dinosaur
      </button>

      {/* Announced politely so a screen reader hears the reply too. */}
      <span className="sr-only" role="status" aria-live="polite">
        {shout > 0 ? "More dinos coming soon" : ""}
      </span>
    </div>
  )
}
