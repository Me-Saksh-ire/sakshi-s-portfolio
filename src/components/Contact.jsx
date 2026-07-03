import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { spawnShockwave } from "../utils/shockwave";

export default function Contact({ reduced }) {
  const sealRef = useRef(null);
  const labelRef = useRef(null);
  const runesRef = useRef(null);
  const outerRef = useRef(null);
  const crackRef = useRef(null);
  const sparksRef = useRef([]);
  const revealRef = useRef(null);

  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // continuous idle rotation
  useEffect(() => {
    if (reduced) return;
    const t1 = gsap.to(outerRef.current, {
      rotate: 360,
      duration: 40,
      ease: "none",
      repeat: -1,
      transformOrigin: "100px 100px",
    });
    const t2 = gsap.to(runesRef.current, {
      rotate: -360,
      duration: 55,
      ease: "none",
      repeat: -1,
      transformOrigin: "100px 100px",
    });
    return () => {
      t1.kill();
      t2.kill();
    };
  }, [reduced]);

  const unlockSeal = () => {
    if (unlocked) return;
    setUnlocked(true);

    const rect = sealRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const tl = gsap.timeline();
    tl.to(
      [outerRef.current, runesRef.current],
      { rotate: "+=140", duration: 0.9, ease: "power3.inOut" },
      0,
    )
      .to(
        runesRef.current,
        {
          scale: 0.6,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          transformOrigin: "100px 100px",
        },
        0.5,
      )
      .to(
        crackRef.current,
        {
          opacity: 1,
          scale: 1.12,
          duration: 0.35,
          ease: "power2.out",
          transformOrigin: "100px 100px",
        },
        "-=0.25",
      )
      .add(() => {
        sparksRef.current.forEach((s, i) => {
          if (!s) return;
          const angle = (i / sparksRef.current.length) * Math.PI * 2;
          gsap.fromTo(
            s,
            { opacity: 1, attr: { cx: 100, cy: 100 } },
            {
              opacity: 0,
              attr: {
                cx: 100 + Math.cos(angle) * 90,
                cy: 100 + Math.sin(angle) * 90,
              },
              duration: 0.6,
              ease: "power2.out",
            },
          );
        });
        if (!reduced) {
          spawnShockwave(cx, cy, "#1be996");
          setTimeout(() => spawnShockwave(cx, cy, "#ff3b52"), 120);
        }
      }, "-=0.2")
      .to(labelRef.current, { opacity: 0, duration: 0.25 }, "-=0.3")
      .add(() => revealRef.current.classList.add("open"), "-=0.1")
      .to(
        sealRef.current,
        { scale: 0.94, duration: 0.15, yoyo: true, repeat: 1 },
        "-=0.1",
      );
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      // Replace this endpoint with your own — e.g. a Formspree form ID,
      // an EmailJS call, or a POST to your own /api/contact route.
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative px-[6vw] py-[130px] pb-[160px] text-center"
    >
      <div className="flex items-baseline justify-center gap-4 mb-6">
        <span className="font-mono text-xs text-crimson tracking-[0.18em] uppercase">
          Break The Seal
        </span>
      </div>

      <div
        ref={sealRef}
        onClick={unlockSeal}
        data-cursor-target
        className="w-[230px] h-[230px] mx-auto mt-12 mb-10 relative cursor-pointer"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="#22302a"
            strokeWidth="1"
          />
          <g ref={outerRef} style={{ transformOrigin: "100px 100px" }}>
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="#1be996"
              strokeWidth="1"
              strokeDasharray="2 8"
              opacity="0.55"
            />
          </g>
          <g
            ref={runesRef}
            filter="url(#glow)"
            style={{ transformOrigin: "100px 100px" }}
          >
            <circle
              cx="100"
              cy="100"
              r="68"
              fill="none"
              stroke="#3a423e"
              strokeWidth="1"
            />
            <g stroke="#8b948d" strokeWidth="1.4">
              <line x1="100" y1="32" x2="100" y2="42" />
              <line x1="100" y1="158" x2="100" y2="168" />
              <line x1="32" y1="100" x2="42" y2="100" />
              <line x1="158" y1="100" x2="168" y2="100" />
              <line x1="52" y1="52" x2="59" y2="59" />
              <line x1="141" y1="141" x2="148" y2="148" />
              <line x1="52" y1="148" x2="59" y2="141" />
              <line x1="141" y1="59" x2="148" y2="52" />
            </g>
          </g>
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="#3a423e"
            strokeWidth="1"
          />
          <path
            ref={crackRef}
            filter="url(#glow)"
            d="M100 16 L110 92 L184 100 L110 108 L100 184 L90 108 L16 100 L90 92 Z"
            fill="none"
            stroke="#ff3b52"
            strokeWidth="1.5"
            style={{ opacity: 0, transformOrigin: "100px 100px" }}
          />
          <g>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle
                key={i}
                ref={(el) => (sparksRef.current[i] = el)}
                cx="100"
                cy="100"
                r="2"
                fill={i % 2 === 0 ? "#1be996" : "#ff3b52"}
                style={{ opacity: 0 }}
              />
            ))}
          </g>
        </svg>
        <div
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.14em] text-ash uppercase text-center px-8 transition-opacity"
        >
          Click to
          <br />
          unlock contact
        </div>
      </div>

      <div
        ref={revealRef}
        className="contact-reveal max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-500 [&.open]:max-h-[900px] [&.open]:opacity-100 [&.open]:mt-2.5"
      >
        <form
          onSubmit={onSubmit}
          className="max-w-md mx-auto text-left flex flex-col gap-4 mb-10"
        >
          <div>
            <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ash mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              data-cursor-target
              className="w-full bg-panel border border-line focus:border-emerald outline-none px-4 py-3 text-bone placeholder:text-steel transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ash mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              data-cursor-target
              className="w-full bg-panel border border-line focus:border-emerald outline-none px-4 py-3 text-bone placeholder:text-steel transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-ash mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              data-cursor-target
              rows={5}
              className="w-full bg-panel border border-line focus:border-emerald outline-none px-4 py-3 text-bone placeholder:text-steel transition-colors resize-none"
              placeholder="What are we building?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            data-cursor-target
            className="font-mono text-[13px] tracking-[0.08em] uppercase px-6 py-3.5 border border-line bg-panel text-bone hover:border-crimson transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Connect with me"}
          </button>

          {status === "sent" && (
            <p className="font-mono text-[12px] text-emerald">
              Message received. I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-[12px] text-crimson">
              Fill out every field — or the endpoint isn't wired up yet.
            </p>
          )}
        </form>

        <div className="flex gap-7 justify-center flex-wrap">
          <a
            href="https://github.com/Me-Saksh-ire"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-target
            className="clink font-mono text-[13px] tracking-[0.08em] px-6 py-3.5 border border-line text-bone uppercase relative overflow-hidden bg-panel hover:border-crimson transition-colors active:scale-95"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sakshi-ire/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-target
            className="clink font-mono text-[13px] tracking-[0.08em] px-6 py-3.5 border border-line text-bone uppercase relative overflow-hidden bg-panel hover:border-crimson transition-colors active:scale-95"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
