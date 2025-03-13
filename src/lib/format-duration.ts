// lib/formatDuration.ts

export const formatDuration = (t: Function, durationInSeconds: number,): string => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours} ${t('hours')}`;
    }

    if (minutes > 0 || hours > 0) {
        if (formattedTime) formattedTime += ' ';
        formattedTime += `${String(minutes).padStart(2, '0')} ${t('minutes')}`;
    }

    if (formattedTime) formattedTime += ', ';
    formattedTime += `${String(seconds).padStart(2, '0')} ${t('seconds')}`;

    return formattedTime;
};
