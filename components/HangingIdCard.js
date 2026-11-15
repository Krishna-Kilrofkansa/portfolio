'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HangingIdCard() {
    return (
        <motion.div
            className="id-card-container"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
            {/* Lanyard string */}
            <motion.div
                className="id-card-string"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'top' }}
            />

            {/* Clip ring */}
            <motion.div
                className="id-card-clip"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4, type: 'spring', stiffness: 300 }}
            />

            {/* ID Card with swing */}
            <motion.div
                className="id-card"
                initial={{ rotate: -8, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{
                    rotate: {
                        type: 'spring',
                        damping: 12,
                        stiffness: 80,
                        delay: 0.5,
                    },
                    opacity: { duration: 0.3, delay: 0.5 },
                }}
                whileHover={{
                    rotate: [0, -3, 2, -1, 0],
                    scale: 1.02,
                    transition: {
                        rotate: { duration: 0.8, ease: 'easeInOut' },
                        scale: { duration: 0.3 },
                    },
                }}
                whileTap={{
                    rotate: 5,
                    transition: { type: 'spring', damping: 10, stiffness: 100 },
                }}
                style={{ transformOrigin: 'top center' }}
            >
                {/* Hole punch */}
                <div className="id-card-hole" />

                {/* Photo */}
                <Image
                    src="/aki.jpg"
                    alt="Aakarshak Swaraj"
                    width={120}
                    height={120}
                    className="id-card-photo"
                    priority
                />

                {/* Name */}
                <div className="id-card-name">Aakarshak Swaraj</div>

                {/* Role */}
                <div className="id-card-role font-mono">Systems & AIML Engineer</div>
            </motion.div>
        </motion.div>
    );
}
