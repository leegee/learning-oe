import { useEffect, useState } from 'react';

const InstallPWA = () => {
    const [isInstallPromptAvailable, setInstallPromptAvailable] = useState(false);
    let deferredPrompt: any;

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();  // Prevent automatic banner
            deferredPrompt = event;  // Store the event
            setInstallPromptAvailable(true);  // Show the install button
            console.log("Install prompt available", event);  // Log the event for debugging
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
            console.log('Prompting the user to install');
            deferredPrompt.prompt();  // Show the install prompt

            // Handle the user's choice
            deferredPrompt.userChoice.then((choice: any) => {
                console.log("User choice:", choice.outcome);
                if (choice.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                // Reset deferredPrompt after use
                deferredPrompt = null;
                setInstallPromptAvailable(false);  // Optionally hide the button after install
            }).catch((error: any) => {
                console.error("Error during the prompt:", error);
            });
        } else {
            console.warn('No deferredPrompt available!');
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
