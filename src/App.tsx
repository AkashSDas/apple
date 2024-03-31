import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import Navbar from "./components/Navbar";

export default function App(): JSX.Element {
    return (
        <div>
            <Navbar />
            <Hero />
            <Highlight />
        </div>
    );
}
