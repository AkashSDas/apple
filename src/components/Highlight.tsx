import { useGSAP } from "@gsap/react";
import { rightImg, watchImg } from "../utils/assets";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";

export default function Highlight(): JSX.Element {
    useGSAP(function () {
        gsap.to("#highlight-title", { opacity: 1, y: 0 });
        gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
    }, []);

    return (
        <section
            id="highlights"
            className="w-screen overflow-hidden h-full common-padding bg-zinc"
        >
            <div className="screen-max-width">
                <div className="mb-12 w-full md:flex items-end justify-between">
                    <h1 id="highlight-title" className="section-heading">
                        Get the highlights.
                    </h1>

                    <div className="flex flex-wrap items-end gap-5">
                        <p className="link">
                            Watch the flim{" "}
                            <img src={watchImg} alt="Watch" className="ml-2" />
                        </p>

                        <p className="link">
                            Watch the event{" "}
                            <img src={rightImg} alt="Right" className="ml-2" />
                        </p>
                    </div>
                </div>
            </div>

            <VideoCarousel />
        </section>
    );
}
