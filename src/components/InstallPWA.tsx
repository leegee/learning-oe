import { useEffect, useState } from 'react';

const InstallPWA = () => {
    const [isInstallPromptAvailable, setInstallPromptAvailable] = useState(false);
    let deferredPrompt: any;

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            deferredPrompt = event;
            setInstallPromptAvailable(true);
            console.log("Install prompt available");
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choice: any) => {
                console.log(choice.outcome);
                deferredPrompt = null;
                setInstallPromptAvailable(false);
            });
        }
    };

    return (
        <div>
            {isInstallPromptAvailable && (
                <a href='#' id="install-btn" onClick={handleInstallClick}>
                    Install
                </a>
            )}
        </div>
    );
};

export default InstallPWA;
