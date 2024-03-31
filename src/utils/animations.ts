import * as THREE from "three";

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
