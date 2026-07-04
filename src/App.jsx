import { useEffect, useState } from "react";
import { spawnShockwave } from "./utils/shockwave";
import CursedField from "./components/CursedField";
import CursorEmber from "./components/CursorEmber";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [reduced, setReduced] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(hover: none)");

    const updateMotionSettings = () => {
      const touchDevice = touchQuery.matches || window.innerWidth < 900;
      setReduced(motionQuery.matches && !touchDevice);
      setIsTouch(touchDevice);
      document.body.classList.toggle("touch-device", touchDevice);
    };

    updateMotionSettings();

    const handleMotionChange = () => updateMotionSettings();

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", handleMotionChange);
      touchQuery.addEventListener("change", handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
      touchQuery.addListener(handleMotionChange);
    }

    window.addEventListener("resize", handleMotionChange);

    return () => {
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", handleMotionChange);
        touchQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
        touchQuery.removeListener(handleMotionChange);
      }
      window.removeEventListener("resize", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onClick = (e) => {
      const color = Math.random() > 0.5 ? "#1be996" : "#ff3b52";
      spawnShockwave(e.clientX, e.clientY, color);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [reduced]);

  return (
    <>
      <CursedField reduced={reduced} />
      <CursorEmber reduced={reduced} isTouch={isTouch} />
      <div className="grain" />

      <Nav />
      <main>
        <Hero reduced={reduced} />
        <About reduced={reduced} />
        <Skills reduced={reduced} />
        <Projects />
        <Contact reduced={reduced} />
      </main>
      <Footer />
    </>
  );
}
