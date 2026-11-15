'use client';

import { motion } from 'framer-motion';

export const LANGUAGES = {
    EN: {
        code: 'EN',
        label: 'English',
        heroLine: "I learn by building things I'm curious about.",
        subline: "From reverse-engineering game memory and simulating tournaments to building an offline translator so my mom could talk to local shopkeepers.",
        gitaVerse: "संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ । तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ॥ ५.२ ॥",
        gitaTranslation: "Both passive contemplation and active engagement lead to understanding. But between armchair theorizing and rolling up your sleeves to build, the path of action is far superior.",
        region: "Roots: Bihar ➔ VIT Chennai ➔ Bengaluru",
        tagline: "Action > Armchair Theorizing",
    },
    HI: {
        code: 'हिं',
        label: 'हिंदी',
        heroLine: "जिन चीज़ों को लेकर मेरे मन में जिज्ञासा होती है, मैं उन्हें खुद बनाकर सीखता हूँ।",
        subline: "गेम मेमोरी को रिवर्स-इंजीनियर करने और टूर्नामेंट सिमुलेशन से लेकर मां के लिए ऑफलाइन ट्रांसलेटर बनाने तक का सफर।",
        gitaVerse: "संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ । तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ॥ ५.२ ॥",
        gitaTranslation: "सिद्धांतों पर केवल विचार करने और कर्म करने, दोनों से समझ मिलती है; परंतु केवल सोच-विचार के मुकाबले हाथ आगे बढ़ाकर निर्माण करना कहीं अधिक श्रेष्ठ है।",
        region: "Roots: Bihar & Jharkhand (Bokaro / Ranchi)",
        tagline: "कर्म ही सर्वोच्च साधना है",
    },
    KN: {
        code: 'ಕನ್ನಡ',
        label: 'ಕನ್ನಡ',
        heroLine: "ನನ್ನಲ್ಲಿ ಕುತೂಹಲ ಮೂಡಿಸುವ ವಿಷಯಗಳನ್ನು ನಾನೇ ಸ್ವತಃ ನಿರ್ಮಿಸಿ ಕಲಿಯುತ್ತೇನೆ.",
        subline: "ಗೇಮ್ ಮೆಮೊರಿ ರಿವರ್ಸ್ ಎಂಜಿನಿಯರಿಂಗ್ ನಿಂದ ಹಿಡಿದು, ಅಮ್ಮನಿಗಾಗಿ ಆಫ್‌ಲೈನ್ ಧ್ವನಿ ಅನುವಾದಕ ನಿರ್ಮಿಸುವವರೆಗೆ.",
        gitaVerse: "संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ । तयोस्तु कर्मसंನ್ಯಾಸಾತ್ಕರ್ಮಯೋಗೋ ವಿಶೀಷ್ಯತೇ ॥ ೫.೨ ॥",
        gitaTranslation: "ಚಿಂತನೆ ಮತ್ತು ಕ್ರಿಯೆ ಎರಡೂ ಜ್ಞಾನಕ್ಕೆ ದಾರಿ ಮಾಡಿಕೊಡುತ್ತವೆ, ಆದರೆ ಕೇವಲ ಸಿದ್ಧಾಂತಕ್ಕಿಂತ ಕೆಲಸಕ್ಕೆ ಕೈಹಾಕಿ ಹೊಸದನ್ನು ನಿರ್ಮಿಸುವುದೇ ಶ್ರೇಷ್ಠ.",
        region: "Transitioning To: Bengaluru Tech Ecosystem",
        tagline: "ಕರ್ಮವೇ ನಮ್ಮ ಗುರು",
    },
    TA: {
        code: 'தமிழ்',
        label: 'தமிழ்',
        heroLine: "எனக்குள் ஆர்வத்தைத் தூண்டும் விஷயங்களை, நானே உருவாக்குவதன் மூலம் கற்றுக்கொள்கிறேன்.",
        subline: "விளையாட்டு நினைவகத்தை மறு-பொறியியல் செய்வதிலிருந்து, அம்மாவுக்காக ஆஃப்லைன் குரல் மொழிபெயர்ப்பாளர் உருவாக்கிய வரை.",
        gitaVerse: "संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ । तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ॥ 5.2 ॥",
        gitaTranslation: "வெறும் கோட்பாட்டு சிந்தனையை விட களத்தில் இறங்கி ஒன்றை உருவாக்குவதே மேலான புரிதலையும் அனுபவத்தையும் தரும்.",
        region: "Campus Life: VIT Chennai (B.Tech CSE-AIML)",
        tagline: "செயலே சிறந்த கல்வி",
    },
};

export default function LanguageSwitcher({ activeLang, onSelectLang }) {
    const keys = Object.keys(LANGUAGES);

    return (
        <div className="retro-lang-switcher" aria-label="Regional Journey Language Switcher">
            <div className="retro-film-indicator">
                <span className="film-label font-mono">LANG_ROUTER</span>
            </div>
            <div className="lang-pill-group">
                {keys.map((key) => {
                    const lang = LANGUAGES[key];
                    const isActive = activeLang === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onSelectLang(key)}
                            className={`lang-btn ${isActive ? 'active' : ''}`}
                            title={lang.region}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="langPillHighlight"
                                    className="lang-btn-highlight"
                                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                                />
                            )}
                            <span className="lang-code font-mono">{lang.code}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

