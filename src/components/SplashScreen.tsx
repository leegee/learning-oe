import { ReactNode } from "react";

import config from "./../config";
import packageJson from '../../package.json';
import AboutComponent from "./About";

import './SplashScreen.css';

interface SplashScreenProps {
    children: ReactNode;
}

const SplashScreen = ({ children }: SplashScreenProps) => {
    return (
        <main id='splash'>
            <section className='card'>
                <div>
                    <img src="icons/dog.webp" />
                    <div className="titles">
                        <h1 lang={config.targetLanguage}>{config.target.apptitle}</h1>
                        <h2 lang={config.defaultLanguage}>{config.default.apptitle}</h2>
                        <p>
                            <small>{packageJson.version}</small>
                        </p>
                    </div>
                </div>

                <AboutComponent />

                {children}

            </section>
        </main>
    );
}

export default SplashScreen;