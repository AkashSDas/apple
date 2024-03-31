import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../utils/constants";
import { pauseImg, playImg, replayImg } from "../utils/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function VideoCarousel(): JSX.Element {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
    const videoSnapRef = useRef<(HTMLSpanElement | null)[]>([]);
    const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;
    const [loadedData, setLoadedData] = useState<
        SyntheticEvent<HTMLVideoElement>[]
    >([]);

    useGSAP(
        function () {
            gsap.to("#video", {
                scrollTrigger: {
                    trigger: "#video",
                    toggleActions: "restart none none none",
                },
                onComplete() {
                    setVideo((prev) => ({
                        ...prev,
                        startPlay: true,
                        isPlaying: true,
                    }));
                },
            });

            gsap.to("#slider", {
                transform: `translateX(${-100 * videoId}%)`,
                duration: 2,
                ease: "power2.inOut",
            });
        },
        [isEnd, videoId]
    );

    useEffect(
        function handlePlayingVideo() {
            console.log({ loadedData, videoRef: videoRef.current, startPlay });
            if (loadedData.length > 3) {
                if (!isPlaying) {
                    videoRef.current[videoId]?.pause();
                } else if (startPlay) {
                    videoRef.current[videoId]?.play();
                }
            }
        },
        [startPlay, videoId, isPlaying, loadedData]
    );

    useEffect(
        function handleProgressBar() {
            let currentProgress = 0;
            const span = videoSnapRef.current;

            if (span[videoId]) {
                // animate the progress of video
                const anim = gsap.to(span[videoId], {
                    onUpdate() {
                        const progress = Math.ceil(anim.progress() * 100);
                        if (progress !== currentProgress) {
                            currentProgress = progress;
                            gsap.to(videoDivRef.current[videoId], {
                                width:
                                    window.innerWidth < 760
                                        ? "10vw"
                                        : window.innerWidth < 1024
                                        ? "10vw"
                                        : "4vw",
                            });

                            gsap.to(videoSnapRef.current[videoId], {
                                width: `${currentProgress}%`,
                                backgroundColor: "white",
                            });
                        }
                    },
                    onComplete() {
                        if (isPlaying) {
                            gsap.to(videoDivRef.current[videoId], {
                                width: "12px",
                            });
                            gsap.to(span[videoId], {
                                backgroundColor: "#afafaf",
                            });
                        }
                    },
                });

                if (videoId === 0) {
                    anim.restart();
                }

                // eslint-disable-next-line no-inner-declarations
                function animUpdate() {
                    anim.progress(
                        Number(videoRef.current[videoId]?.currentTime) /
                            hightlightsSlides[videoId].videoDuration
                    );
                }

                if (isPlaying) {
                    gsap.ticker.add(animUpdate);
                } else {
                    gsap.ticker.remove(animUpdate);
                }
            }
        },
        [videoId, startPlay]
    );

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((slide, idx) => (
                    <div key={slide.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline
                                    preload="auto"
                                    muted
                                    className={`${
                                        slide.id === 2 && "translate-x-44"
                                    } pointer-events-none`}
                                    ref={(el) => (videoRef.current[idx] = el)}
                                    onPlay={function () {
                                        setVideo((prevVideo) => ({
                                            ...prevVideo,
                                            isPlaying: true,
                                        }));
                                    }}
                                    onLoadedMetadata={(evt) => {
                                        handleLoadedMetadata(idx, evt);
                                    }}
                                    onEnded={function () {
                                        if (idx !== 3) {
                                            handleProcess("end");
                                        } else {
                                            handleProcess("last");
                                        }
                                    }}
                                >
                                    <source
                                        src={slide.video}
                                        type="video/mp4"
                                    />
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10">
                                {slide.textLists.map((text) => (
                                    <p
                                        key={text}
                                        className="md:text-2xl text-xl font-medium"
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop:blur rounded-full">
                    {videoRef.current.map((_, idx) => (
                        <span
                            key={idx}
                            ref={(el) => (videoDivRef.current[idx] = el)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >
                            <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSnapRef.current[idx] = el)}
                            ></span>
                        </span>
                    ))}
                </div>

                <button className="control-btn">
                    <img
                        src={
                            isLastVideo
                                ? replayImg
                                : !isPlaying
                                ? playImg
                                : pauseImg
                        }
                        alt={
                            isLastVideo
                                ? "Replay"
                                : !isPlaying
                                ? "Play"
                                : "Pause"
                        }
                        onClick={function () {
                            if (isLastVideo) {
                                handleProcess("reset");
                            } else if (!isPlaying) {
                                handleProcess("play");
                            } else {
                                handleProcess("pause");
                            }
                        }}
                    />
                </button>
            </div>
        </>
    );

    function handleProcess(type: "play" | "pause" | "reset" | "end" | "last") {
        switch (type) {
            case "end":
                setVideo((prev) => ({
                    ...prev,
                    isEnd: true,
                    videoId: prev.videoId + 1,
                }));
                break;
            case "last":
                setVideo((prev) => ({ ...prev, isLastVideo: true }));
                break;
            case "reset":
                setVideo((prev) => ({
                    ...prev,
                    isLastVideo: false,
                    videoId: 0,
                }));
                break;
            case "pause":
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;
            case "play":
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;
            default:
                break;
        }
    }

    function handleLoadedMetadata(
        _idx: number,
        evt: SyntheticEvent<HTMLVideoElement>
    ) {
        setLoadedData((prev) => [...prev, evt]);
    }
}
