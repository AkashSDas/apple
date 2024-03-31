import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import Model from "./components/Model";
import Navbar from "./components/Navbar";
import * as Sentry from "@sentry/react";

function App(): JSX.Element {
    return (
        <div>
            <Navbar />
            <Hero />
            <Highlight />
            <Model />
        </div>
    );
}

export default Sentry.withProfiler(App);
