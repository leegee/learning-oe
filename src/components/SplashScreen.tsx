import packageJson from '../../package.json';
import config from "./../config";
import { useTranslation } from "react-i18next";

import AboutComponent from "./About";

import './SplashScreen.css';

interface SplashScreenProps {
    onContinue: () => void;
}

const SplashScreen = ({ onContinue }: SplashScreenProps) => {
    const { t } = useTranslation();

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

                <footer>
                    <button className="next-button" onClick={onContinue} >
                        {t('continue')}
                    </button>
                </footer>
            </section>
        </main>
    );
}

export default SplashScreen;