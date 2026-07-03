import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About({ reduced }) {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const ruleRef = useRef(null);
  const quoteRef = useRef(null);
  const bodyRef = useRef(null);

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
      [quoteRef.current, bodyRef.current].forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34, skewX: reduced ? 0 : -4, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            skewX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-[6vw] py-[130px] bg-gradient-to-b from-transparent via-panel/50 to-transparent"
    >
      <div ref={headRef} className="flex items-baseline gap-4 mb-14">
        <span className="font-mono text-xs text-crimson tracking-[0.18em] uppercase">
          Dossier
        </span>
        <div ref={ruleRef} className="flex-1 h-px bg-line" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-20 items-start">
        <div
          ref={quoteRef}
          className="font-display text-2xl sm:text-3xl md:text-[38px] leading-[1.25] text-bone"
        >
          Talent is a myth sorcerers tell themselves.{" "}
          <span className="text-emerald">
            Discipline is the only cursed tool that never runs out of energy.
          </span>
        </div>

        <div ref={bodyRef} className="text-ash leading-[1.85] text-[15.5px]">
          <p className="mb-[18px]">
            I am <b className="text-bone font-semibold"> Sakshi.</b> I am
            interested in full-stack web development, especially using the MERN
            Stack. I have knowledge of MongoDB, Express.js, React.js, and
            Node.js. I can build frontend interfaces using React, create REST
            APIs using Express and Node js, and store data in MongoDB.
          </p>

          <p className="mb-[18px]">
            I have also worked with concepts like authentication, CRUD
            operations, routing, API integration and deployment. I am
            continuously improving my problem-solving and development skills.
          </p>

          <div className="mt-6">
            <a
              href="/fullstackMERN_Sakshi_Resume.pdf"
              download="fullstackMERN_Sakshi_Resume.pdf"
              className="inline-flex items-center justify-center bg-emerald text-black font-semibold py-2 px-4 rounded-md border hover:border-crimson hover:bg-panel hover:text-bone transition-colors duration-300"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
