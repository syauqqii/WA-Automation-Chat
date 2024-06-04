const wa = require('@open-wa/wa-automate');
const DEBUG = parseInt(process.env.DEBUG) === 1;

exports.initializeWAClient = () => {
    return wa.create({
        sessionId: process.env.SESSION_NAME || 'WA Automation Chat',
        multiDevice: true,
        authTimeout: 0,
        blockCrashLogs: true,
        disableSpins: true,
        headless: true,
        hostNotificationLang: 'PT_BR',
        logConsole: false,
        popup: true,
        qrTimeout: 0,
        // killProcessOnBrowserClose: true,
        useStealth: true,
        chromiumArgs: ['--no-sandbox', '--disable-setuid-sandbox']
    
        // [ EXPERIMENTAL SETTING (syauqi) ]
        // cacheEnabled: false,
        // useChrome: true,
        // throwErrorOnTosBlock: false,
        // chromiumArgs: [
        //     '--no-sandbox',
        //     '--disable-setuid-sandbox',
        //     '--aggressive-cache-discard',
        //     '--disable-cache',
        //     '--disable-application-cache',
        //     '--disable-offline-load-stale-cache',
        //     '--disk-cache-size=0'
        // ]
    }).catch(err => {
        if (DEBUG) {
            console.error('  - [waClientService] Error initializing WA client: ', err);
        }
        process.exit(1);
    });
};
