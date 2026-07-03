import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    tag: "Grade — Full Stack",
    title: "EGuru",
    desc: "An e-learning platform with a real teacher dashboard course publishing, live revenue pulled from actual enrollment records, Razorpay checkout, and Cloudinary-backed media.",
    stack: ["React", "Express", "MongoDB", "Razorpay", "Cloudinary"],
    link: "https://eguru-learn.vercel.app/",
  },
  {
    tag: "Grade — Full Stack",
    title: "CarRento",
    desc: "A car rental application built on the MERN stack listings, bookings, and a clean auth flow, built as a deliberate exercise in owning a codebase end to end.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT Auth"],
    link: "https://car-rento-client.vercel.app/",
  },
  {
    tag: "Grade — Front End",
    title: "IQ Master",
    desc: "A quiz application with a custom timer, score tracking, custom quiz creation, answer review, & a clean responsive UI designed to be a fun & engaging experience for users of all ages.",
    stack: ["React", "TailwindCSS", "Vite"],
    link: "https://iq-master-tan.vercel.app/",
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.94, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: { trigger: cardRef.current, start: "top 88%" },
        },
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <a
      href={project.link}
      ref={cardRef}
      data-cursor-target
      className="group relative border border-line bg-panel p-8 overflow-hidden transition-[border-color,transform] duration-400 hover:border-emerald-dim hover:-translate-y-1 active:translate-y-0 active:scale-[0.985] block"
    >
      {/* sheath reveal */}
      <div
        className="absolute inset-0 pointer-events-none clip-hidden group-hover:clip-shown transition-[clip-path] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]"
        style={{
          background:
            "linear-gradient(120deg, rgba(27,233,150,0.10), rgba(255,59,82,0.08))",
        }}
      />

      {/* metallic sweep */}
      <div
        className="absolute top-0 left-[-40%] w-[30%] h-full z-[3] pointer-events-none transition-[left] duration-700 ease-[cubic-bezier(0.6,0,0.2,1)] group-hover:left-[120%]"
        style={{
          background:
            "linear-gradient(100deg, transparent, rgba(255,255,255,0.16), transparent)",
          transform: "skewX(-18deg)",
        }}
      />

      <span className="relative z-[2] font-mono text-[11px] text-emerald tracking-[0.14em] uppercase">
        {project.tag}
      </span>
      <div className="relative z-[2] font-display text-3xl mt-3 mb-3.5">
        {project.title}
      </div>
      <p className="relative z-[2] text-ash text-[14.5px] leading-[1.75] mb-5">
        {project.desc}
      </p>
      <div className="relative z-[2] flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[11px] px-2.5 py-1.5 border border-steel text-ash uppercase tracking-[0.06em] group-hover:border-crimson-dim group-hover:text-bone transition-colors"
          >
            {s}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const ruleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 90%" },
        },
      );
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power2.out",
          transformOrigin: "left",
          scrollTrigger: { trigger: headRef.current, start: "top 90%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-[6vw] py-[130px]"
    >
      <div ref={headRef} className="flex items-baseline gap-4 mb-14">
        <span className="font-mono text-xs text-crimson tracking-[0.18em] uppercase">
          Missions Completed
        </span>
        <div ref={ruleRef} className="flex-1 h-px bg-line" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
