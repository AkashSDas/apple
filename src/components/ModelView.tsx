import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import { Suspense } from "react";
import IPhone from "./IPhone";
import Loader from "./Loader";

type Props = {
    index: number;
    groupRef: any;
    gsapType: "view2" | "view1";
    controlRef: any;
    setRotationState: React.Dispatch<React.SetStateAction<number>>;
    item: {
        title: string;
        color: string[];
        img: string;
    };
    size: string;
};

export default function ModeView(props: Props): JSX.Element {
    const { index, groupRef, gsapType, setRotationState } = props;

    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${
                index === 2 ? "right-[-100%]" : "" // swap left and right
            }`}
        >
            <ambientLight intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <Lights />

            <OrbitControls
                makeDefault
                ref={props.controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={() =>
                    setRotationState(
                        props.controlRef.current?.getAzimuthalAngle() ?? 0
                    )
                }
            />

            <group
                ref={groupRef}
                name={`${index === 1 ? "small" : "large"}`}
                position={[0, 0, 0]}
            >
                <Suspense fallback={<Loader />}>
                    <IPhone
                        scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item={props.item}
                        size={props.size}
                    />
                </Suspense>
            </group>
        </View>
    );
}
