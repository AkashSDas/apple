import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function animateWithGsap(
    target: gsap.DOMTarget,
    animationOptions: gsap.TweenVars,
    scrollTriggerOptions?: ScrollTrigger.Vars
) {
    gsap.to(target, {
        ...animationOptions,
        scrollTrigger: {
            trigger: target,
            toggleActions: "restart reverse restart reverse",
            start: "top 85%",
            ...scrollTriggerOptions,
        },
    });
}

export function animateWithGsapTimeline(
    timeline: gsap.core.Timeline,
    ref: React.MutableRefObject<THREE.Group>,
    rotation: number,
    from: string,
    to: string,
    options: { transform: string; duration: number }
) {
    timeline.to(ref.current.rotation, {
        y: rotation,
        duration: 1,
        ease: "power2.inOut",
    });

    timeline.to(from, { ...options, ease: "power2.inOut" }, "<");
    timeline.to(to, { ...options, ease: "power2.inOut" }, "<");
}
