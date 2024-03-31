import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import HowItWorks from "./components/HowItWorks";
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
            <Features />
            <HowItWorks />
            <Footer />
        </div>
    );
}

export default Sentry.withProfiler(App);
