import { ReactNode } from "react";

import packageJson from '../../package.json';
import AboutComponent from "./About";
// import InstallPWA from "./InstallPWA";

import './Home.css';

interface HomeScreenProps {
    children: ReactNode;
}

const HomeScreen = ({ children }: HomeScreenProps) => {
    return (
        <article id='home'>

            {children}

            <AboutComponent />

            <footer className="version">
                {/* <InstallPWA /> */}
                Version {packageJson.version}
            </footer>
        </article >
    );
}

export default HomeScreen;