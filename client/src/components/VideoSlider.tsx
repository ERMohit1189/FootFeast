import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function VideoSlider({ videos, className, title, subtitle, ctas, scrollTarget }: { videos: { src: string; poster?: string; alt?: string }[]; className?: string; title?: string; subtitle?: string; ctas?: { label: string; href?: string; primary?: boolean }[]; scrollTarget?: string }) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [muted, setMuted] = useState(true);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (hover) return;
    timerRef.current = window.setInterval(() => {
      setIndex(i => (i + 1) % videos.length);
    }, 6000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [hover, videos.length]);

  const prev = () => setIndex(i => (i - 1 + videos.length) % videos.length);
  const next = () => setIndex(i => (i + 1) % videos.length);

  return (
    <div className={`w-full ${className ?? ''} overflow-hidden`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-full overflow-hidden bg-black">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="w-full h-[clamp(360px,90vh,820px)] relative"
          >
            <video
              ref={videoRef}
              src={videos[index].src}
              poster={videos[index].poster}
              playsInline
              autoPlay
              muted={muted}
              loop
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              className="w-full h-full object-cover"
              aria-label={videos[index].alt ?? `video-${index}`}
            />

            {/* Overlay gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" aria-hidden="true" />

            {/* Headline overlay */}
            {(title || subtitle || (ctas && ctas.length)) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center max-w-3xl px-4 pointer-events-auto">
                  {title && <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">{title}</h1>}
                  {subtitle && <p className="mt-3 text-lg md:text-xl text-white/90">{subtitle}</p>}

                  {ctas && ctas.length > 0 && (
                    <>
                      <div className="mt-6 flex items-center gap-3 justify-center flex-wrap">
                        {ctas.map((c, i) => (
                          <a key={i} href={c.href ?? '#'} target="_blank" rel="noopener noreferrer" className={`px-4 py-3 rounded-full text-sm font-medium ${c.primary ? 'bg-white text-slate-900' : 'bg-white/10 text-white'} shadow transition hover:scale-[1.02]`}>
                            {c.label}
                          </a>
                        ))}

                        {/* Play / Pause button */}
                        <button
                          onClick={() => {
                            const el = videoRef.current;
                            if (!el) return;
                            if (el.paused) {
                              el.play();
                            } else {
                              el.pause();
                            }
                          }}
                          aria-label={playing ? 'Pause video' : 'Play video'}
                          title={playing ? 'Pause video' : 'Play video'}
                          className="ml-2 inline-flex items-center justify-center p-3 rounded-full bg-white text-slate-900 shadow hover:scale-[1.04] transition group"
                        >
                          {playing ? (
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h4v12H6zM14 6h4v12h-4z"/></svg>
                          ) : (
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3v18l15-9z"/></svg>
                          )}
                        </button>
                      </div>

                      {/* Scroll chevron */}
                      <div className="mt-6 flex items-center justify-center">
                        <button
                          onClick={() => {
                            try {
                              const header = document.querySelector('header') as HTMLElement | null;
                              const headerHeight = header ? Math.round(header.getBoundingClientRect().height) : 0;
                              const extra = 24; // small extra offset so section sits higher
                              if (scrollTarget) {
                                const el = document.querySelector(scrollTarget) as HTMLElement | null;
                                if (el) {
                                  const top = el.getBoundingClientRect().top + window.scrollY - (headerHeight + extra);
                                  window.scrollTo({ top, behavior: 'smooth' });
                                  return;
                                }
                              }
                            } catch (e) {}
                            // fallback: scroll a slightly larger fraction so next section sits higher
                            window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
                          }}
                          aria-label="Scroll to content"
                          title="Scroll to content"
                          className="text-white opacity-90 hover:opacity-100 animate-bounce"
                        >
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
          <button onClick={prev} aria-label="Previous video" className="pointer-events-auto p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <div className="flex items-center gap-2 pointer-events-auto">
            <button onClick={() => setMuted(m => !m)} aria-label={muted ? 'Unmute' : 'Mute'} className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition">{muted ? '🔇' : '🔊'}</button>
            <button onClick={next} aria-label="Next video" className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
        </div>
      </div>
    </div>
  );
}
