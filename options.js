module.exports = options = (headless, start) => {
    // const chromePath = {
    //     win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows 32 bit
    //     win64: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // Windows 64 bit
    //     linuxChrome: '/usr/bin/google-chrome-stable', // Linux - Chrome
    //     linuxChromium: '/usr/bin/chromium-browser', // Linux - Chromium
    //     darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' // MacOS
    // }

    // if (fs.existsSync(chromePath.win32)) {
    //     execPath = chromePath.win32
    // } else if (fs.existsSync(chromePath.win64)) {
    //     execPath = chromePath.win64
    // } else if (fs.existsSync(chromePath.linuxChrome)) {
    //     execPath = chromePath.linuxChrome
    // } else if (fs.existsSync(chromePath.linuxChromium)) {
    //     execPath = chromePath.linuxChromium
    // } else if (process.platform === 'darwin') {
    //     execPath = chromePath.darwin
    // } else {
    //     console.error(new Error('Google Chrome Is Not Installed'))
    //     process.exit(1)
    // }

    const options = {
        headless: headless,
        autoRefresh: true,
        restartOnCrash: start,
        cacheEnabled: false,
        // executablePath: execPath,
        useChrome: true,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: false,
        chromiumArgs: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ]
    }

    return options
}