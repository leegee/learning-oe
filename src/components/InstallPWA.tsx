import { useEffect, useState } from 'react';

const InstallPWA = () => {
    const [isInstallPromptAvailable, setInstallPromptAvailable] = useState(false);
    let deferredPrompt: any;

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            deferredPrompt = event;
            setInstallPromptAvailable(true);
            console.log("Install prompt available", event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        console.log('Install button clicked');
        if (deferredPrompt) {
            console.log('Showing install prompt');
            deferredPrompt.prompt();  // Trigger the prompt
            deferredPrompt.userChoice.then((choice: any) => {
                console.log("User choice:", choice.outcome);
                if (choice.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                // Reset the deferredPrompt to null after usage
                deferredPrompt = null;
                setInstallPromptAvailable(false);  // Hide install button after usage
            }).catch((error: any) => {
                console.error("Error during prompt:", error);
            });
        }
    };

    return (
        isInstallPromptAvailable && (
            <button id="install-btn" onClick={handleInstallClick}>
                Install
            </button>
        )
    );
};

export default InstallPWA;
