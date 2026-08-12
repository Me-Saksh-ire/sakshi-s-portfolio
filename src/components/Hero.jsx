import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const DEBRIS_COUNT = 14;

export default function Hero({ reduced }) {
  const rootRef = useRef(null);
  const eyebrowRef = useRef(null);
  const bladeRef = useRef(null);
  const rippleRef = useRef(null);
  const debrisRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const statsRef = useRef(null);
  const cueRef = useRef(null);
  const figureRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // build debris particles
      const debrisEls = [];
      for (let i = 0; i < DEBRIS_COUNT; i++) {
        const bit = document.createElement("div");
        bit.className = `absolute top-1/2 left-[8%] w-1 h-1 rounded-sm opacity-0 ${
          i % 2 === 0
            ? "bg-emerald shadow-[0_0_6px_1px_#1be996]"
            : "bg-crimson shadow-[0_0_6px_1px_#ff3b52]"
        }`;
        debrisRef.current.appendChild(bit);
        debrisEls.push(bit);
      }

      if (reduced) {
        gsap.set(titleRef.current, {
          clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
        });
        gsap.set(
          [
            eyebrowRef.current,
            subRef.current,
            statsRef.current,
            cueRef.current,
            figureRef.current,
          ],
          {
            opacity: 1,
          },
        );
      } else {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
          .set(bladeRef.current, { opacity: 1 })
          .fromTo(
            bladeRef.current,
            { x: "-32vw", y: 0, rotate: -14 },
            {
              duration: 0.6,
              ease: "power4.in",
              rotate: -4,
              motionPath: {
                path: [
                  { x: "-32vw", y: 0 },
                  { x: "0vw", y: -30 },
                  { x: "32vw", y: 6 },
                ],
                curviness: 1.2,
              },
            },
            0.35,
          )
          .to(bladeRef.current, { opacity: 0, duration: 0.15 }, ">-0.05")
          .fromTo(
            rippleRef.current,
            { opacity: 0.9, scale: 0 },
            { opacity: 0, scale: 9, duration: 0.6, ease: "power2.out" },
            "<",
          )
          .add(() => {
            debrisEls.forEach((bit) => {
              const angle = Math.random() * Math.PI * 2;
              const dist = 40 + Math.random() * 160;
              gsap.fromTo(
                bit,
                { opacity: 1, x: 0, y: 0, scale: 1 },
                {
                  opacity: 0,
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist * 0.6,
                  scale: 0.3,
                  duration: 0.6 + Math.random() * 0.3,
                  ease: "power2.out",
                },
              );
            });
          }, "<")
          .to(
            titleRef.current,
            {
              clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.5",
          )
          .to(subRef.current, { opacity: 1, duration: 0.6 }, "-=0.15")
          .to(statsRef.current, { opacity: 1, duration: 0.6 }, "-=0.35")
          .to(cueRef.current, { opacity: 1, duration: 0.5 }, "-=0.2");

        gsap.fromTo(
          figureRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.4, delay: 1.4, ease: "power2.out" },
        );
      }

      // parallax on scroll
      gsap.to(glow1Ref.current, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(glow2Ref.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(gridRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(figureRef.current, {
        y: 90,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] flex flex-col items-start justify-center px-[6vw] overflow-hidden"
    >
      {/* cursed-energy grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(#213028 1px, transparent 1px), linear-gradient(90deg, #213028 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        ref={glow1Ref}
        className="absolute z-0 rounded-full pointer-events-none blur-[90px] w-[520px] h-[520px] -top-[140px] -right-[100px] opacity-40"
        style={{
          background: "radial-gradient(circle, #0f6b4d, transparent 70%)",
        }}
      />
      <div
        ref={glow2Ref}
        className="absolute z-0 rounded-full pointer-events-none blur-[90px] w-[420px] h-[420px] -bottom-[160px] -left-[80px] opacity-35"
        style={{
          background: "radial-gradient(circle, #7a1424, transparent 70%)",
        }}
      />

      {/* hero figure — object-cover keeps the crop/mask proportions identical at every viewport width */}
      <div
        ref={figureRef}
        className="absolute inset-y-0 right-0 h-full w-full sm:w-[70%] md:w-[56%] z-[1] pointer-events-none overflow-hidden opacity-0"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 22%, black 45%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 22%, black 45%, black 100%)",
        }}
      >
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,9,10,0.15), rgba(8,9,10,0.55) 80%), linear-gradient(100deg, #08090a 0%, transparent 30%), radial-gradient(ellipse 70% 55% at 65% 30%, rgba(255,59,82,0.16), transparent 60%), radial-gradient(ellipse 60% 50% at 40% 80%, rgba(27,233,150,0.12), transparent 65%)",
          }}
        />
      </div>

      <div
        ref={eyebrowRef}
        className="relative z-[2] font-mono text-xs tracking-[0.22em] text-emerald uppercase mb-[18px] flex items-center gap-2.5 opacity-0"
      >
        <span className="w-[22px] h-px bg-emerald" />
        Full-Stack Sorcerer · MERN
      </div>

      <div className="relative z-[2] overflow-visible">
        <div
          ref={bladeRef}
          className="absolute top-1/2 -left-[10%] w-[120%] h-1.5 z-[5] opacity-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, #eae7dd 15%, #fff 50%, #eae7dd 85%, transparent)",
            boxShadow:
              "0 0 24px 4px #1be996, 0 0 60px 10px rgba(27,233,150,0.4)",
            transform: "translateY(-50%) translateX(-120%) rotate(-8deg)",
          }}
        />
        <div
          ref={rippleRef}
          className="absolute top-1/2 left-[8%] w-10 h-10 rounded-full opacity-0 z-[4] pointer-events-none"
          style={{
            border: "1.5px solid #1be996",
            transform: "translate(-50%,-50%) scale(0)",
          }}
        />
        <div
          ref={debrisRef}
          className="absolute inset-0 z-[5] pointer-events-none"
        />
        <h1
          ref={titleRef}
          className="font-display text-[58px] xs:text-[72px] md:text-[110px] lg:text-[148px] leading-[0.92] tracking-wide text-bone relative clip-hidden"
        >
          SAKSHI
        </h1>
      </div>

      <p
        ref={subRef}
        className="relative z-[2] mt-6 max-w-[560px] text-base leading-[1.7] text-ash opacity-0"
      >
        <b className="text-bone font-semibold">
          Zero cursed energy. Zero shortcuts.
        </b>{" "}
        Every technique here was earned through reps React, Node, Express, and
        MongoDB, sharpened one broken build at a time.
      </p>

      <div
        ref={statsRef}
        className="relative z-[2] flex gap-12 mt-11 opacity-0 font-mono"
      >
        <div>
          <div className="text-2xl text-emerald font-bold">3+</div>
          <div className="text-[11px] text-ash tracking-[0.1em] uppercase mt-1">
            Project Builds
          </div>
        </div>
        <div>
          <div className="text-2xl text-emerald font-bold">MERN</div>
          <div className="text-[11px] text-ash tracking-[0.1em] uppercase mt-1">
            Primary Arsenal
          </div>
        </div>
        <div>
          <div className="text-2xl text-emerald font-bold">5+</div>
          <div className="text-[11px] text-ash tracking-[0.1em] uppercase mt-1">
            Skills
          </div>
        </div>
      </div>

      <div
        ref={cueRef}
        className="absolute bottom-9 left-[6vw] z-[2] flex items-center gap-2.5 font-mono text-[11px] text-ash tracking-[0.15em] uppercase opacity-0"
      >
        <div
          className="w-px h-[34px]"
          style={{ background: "linear-gradient(#1be996, transparent)" }}
        />
        Scroll
      </div>
    </section>
  );
}
