'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.08,
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function SectionWrapper({ id, className = '', children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.section
            id={id}
            className={`${className} ${isInView ? 'section-in-view' : ''}`}
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            {children}
        </motion.section>
    );
}
