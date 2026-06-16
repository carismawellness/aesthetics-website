"use client";

import { useEffect, useRef } from "react";

/*
  Editorial-Light motion layer for /snatch-your-jawline.
  - GSAP (dynamically imported) drives scroll reveals, parallax, the kinetic
    hero headline, magnetic CTAs and animated counters.
  - Lenis adds gentle smooth-scroll on fine-pointer / wide viewports only.
  - A custom cursor is mounted on fine-pointer devices.
  Everything is progressive enhancement: the page is fully visible and usable
  with no JS, on touch, and when prefers-reduced-motion is set (we bail early,
  leaving content in its natural visible state). All work happens client-side so
  the server HTML stays crawlable and LCP-light.
*/

export default function MotionProvider() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave everything visible & static

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    let cleanup: Array<() => void> = [];
    let killed = false;

    (async () => {
      const [{ gsap }, stMod, lenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        finePointer && wide ? import("lenis") : Promise.resolve(null as never),
      ]);
      if (killed) return;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // ---- Lenis smooth scroll (desktop / fine-pointer only) ----
      let lenis: import("lenis").default | null = null;
      if (lenisMod) {
        const Lenis = lenisMod.default;
        lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis!.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanup.push(() => { gsap.ticker.remove(tick); lenis!.destroy(); });

        // route in-page anchors through Lenis
        const anchorHandler = (e: Event) => {
          const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
          if (!a) return;
          const id = a.getAttribute("href");
          if (!id || id === "#") return;
          if (!document.querySelector(id)) return;
          e.preventDefault();
          lenis!.scrollTo(id, { offset: -80 });
        };
        document.addEventListener("click", anchorHandler);
        cleanup.push(() => document.removeEventListener("click", anchorHandler));
      }

      const ctx = gsap.context(() => {
        // ---- Hero kinetic headline (split into words, clip-reveal) ----
        const title = document.querySelector<HTMLElement>("[data-hero-title]");
        if (title && !title.dataset.split) {
          title.dataset.split = "1";
          const words = (title.textContent || "").trim().split(/\s+/);
          title.textContent = "";
          const spans: HTMLElement[] = words.map((w) => {
            const outer = document.createElement("span");
            outer.style.display = "inline-block";
            outer.style.overflow = "hidden";
            outer.style.verticalAlign = "top";
            outer.style.paddingBottom = "0.06em";
            const inner = document.createElement("span");
            inner.style.display = "inline-block";
            inner.textContent = w;
            outer.appendChild(inner);
            title.appendChild(outer);
            title.appendChild(document.createTextNode(" "));
            return inner;
          });
          gsap.from(spans, { yPercent: 115, duration: 1, ease: "power4.out", stagger: 0.08, delay: 0.1 });
        }

        // ---- Hero supporting elements timeline ----
        const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
        if (heroItems.length) {
          gsap.from(heroItems, { y: 26, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.45 });
        }

        // ---- Scroll reveals ----
        gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((el) => {
          const type = el.dataset.animate || "up";
          const base = { scrollTrigger: { trigger: el, start: "top 86%" }, duration: 0.95, ease: "power3.out" } as const;
          if (type === "fade") gsap.from(el, { opacity: 0, ...base });
          else if (type === "left") gsap.from(el, { opacity: 0, x: -42, ...base });
          else if (type === "right") gsap.from(el, { opacity: 0, x: 42, ...base });
          else if (type === "scale") gsap.from(el, { opacity: 0, scale: 0.94, ...base });
          else gsap.from(el, { opacity: 0, y: 46, ...base });
        });

        // ---- Staggered groups ----
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const kids = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
          if (!kids.length) return;
          gsap.from(kids, { opacity: 0, y: 40, duration: 0.8, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: group, start: "top 82%" } });
        });

        // ---- Parallax ----
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || "8");
          gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // ---- Animated counters ----
        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const end = parseFloat(el.dataset.counter || "0");
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => { el.textContent = prefix + Math.round(obj.v) + suffix; },
          });
        });
      });
      cleanup.push(() => ctx.revert());

      // ---- Magnetic CTAs (fine pointer only) ----
      if (finePointer) {
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
          };
          const leave = () => { xTo(0); yTo(0); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanup.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });
      }

      // ---- Custom cursor (fine pointer only) ----
      if (finePointer && cursorRef.current) {
        const cur = cursorRef.current;
        cur.style.opacity = "1";
        const xTo = gsap.quickTo(cur, "x", { duration: 0.18, ease: "power3.out" });
        const yTo = gsap.quickTo(cur, "y", { duration: 0.18, ease: "power3.out" });
        const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
        const over = (e: PointerEvent) => {
          const t = (e.target as HTMLElement)?.closest("a,button,[data-magnetic],input,summary");
          cur.classList.toggle("cursor-grow", !!t);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerover", over);
        cleanup.push(() => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); });
      }

      ScrollTrigger.refresh();
    })();

    return () => { killed = true; cleanup.forEach((fn) => fn()); cleanup = []; };
  }, []);

  return <div ref={cursorRef} className="jaw-cursor" aria-hidden style={{ opacity: 0 }} />;
}
