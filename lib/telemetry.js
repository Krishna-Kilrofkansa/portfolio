'use client';

const WEB3FORMS_ACCESS_KEY = '24c16f0d-5093-4659-8a2a-31ee8ede23c9';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

let cachedVisitorInfo = null;
let visitorInfoPromise = null;

function getDeviceType() {
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
}

function getDeviceInfo() {
    return {
        userAgent: navigator.userAgent,
        screenWidth: screen.width,
        screenHeight: screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        deviceType: getDeviceType(),
    };
}

async function fetchVisitorInfo() {
    if (cachedVisitorInfo) return cachedVisitorInfo;

    if (visitorInfoPromise) return visitorInfoPromise;

    visitorInfoPromise = (async () => {
        let ip = 'unknown';
        let location = 'unknown';

        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            ip = ipData.ip || 'unknown';
        } catch {
            ip = 'fetch_failed';
        }

        if (ip !== 'unknown' && ip !== 'fetch_failed') {
            try {
                const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
                const geo = await geoRes.json();
                const parts = [geo.city, geo.region, geo.country_name].filter(Boolean);
                location = parts.length > 0 ? parts.join(', ') : 'unknown';
            } catch {
                location = 'geo_fetch_failed';
            }
        }

        cachedVisitorInfo = { ip, location };
        return cachedVisitorInfo;
    })();

    return visitorInfoPromise;
}

function isOwner() {
    try {
        return typeof window !== 'undefined' && localStorage.getItem('isOwner') === 'true';
    } catch {
        return false;
    }
}

export async function trackEvent(eventType, extraData = {}) {
    if (typeof window === 'undefined') return;
    if (isOwner()) return;

    try {
        const [visitorInfo, deviceInfo] = await Promise.all([
            fetchVisitorInfo(),
            Promise.resolve(getDeviceInfo()),
        ]);

        const payload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `[Telemetry] ${eventType}`,
            from_name: 'Portfolio Telemetry',
            event_type: eventType,
            page_url: window.location.href,
            timestamp: new Date().toISOString(),
            ip_address: visitorInfo.ip,
            location: visitorInfo.location,
            device_type: deviceInfo.deviceType,
            screen_resolution: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
            viewport: `${deviceInfo.viewportWidth}x${deviceInfo.viewportHeight}`,
            user_agent: deviceInfo.userAgent,
            ...extraData,
        };

        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });

        await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            body: formData,
        });
    } catch {
        // Silently fail — telemetry should never break the app
    }
}

export function trackEventFire(eventType, extraData = {}) {
    trackEvent(eventType, extraData);
}
