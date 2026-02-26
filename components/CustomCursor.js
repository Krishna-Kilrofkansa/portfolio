'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const outlineRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;
        if (!dot || !outline) return;

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        };

        const animate = () => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            outline.style.left = outlineX + 'px';
            outline.style.top = outlineY + 'px';
            requestAnimationFrame(animate);
        };

        const onMouseEnterInteractive = () => {
            dot.classList.add('cursor-hover');
            outline.classList.add('cursor-hover');
        };

        const onMouseLeaveInteractive = () => {
            dot.classList.remove('cursor-hover');
            outline.classList.remove('cursor-hover');
        };

        const onMouseDown = () => {
            dot.classList.add('cursor-click');
            outline.classList.add('cursor-click');
        };

        const onMouseUp = () => {
            dot.classList.remove('cursor-click');
            outline.classList.remove('cursor-click');
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        requestAnimationFrame(animate);

        // Observe for interactive elements
        const addListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, .nav-link, .project-card, .tag, .toggle-btn, .scroll-arrow, .terminal-fab, input, textarea'
            );
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', onMouseEnterInteractive);
                el.addEventListener('mouseleave', onMouseLeaveInteractive);
            });
            return interactiveElements;
        };

        // Initial + re-observe on DOM changes  
        let elements = addListeners();
        const observer = new MutationObserver(() => {
            elements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
            });
            elements = addListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            observer.disconnect();
            elements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
            });
        };
    }, []);

    // Only show custom cursor on non-touch devices
    return (
        <>
            <div className="cursor-dot" ref={dotRef}></div>
            <div className="cursor-outline" ref={outlineRef}></div>
        </>
    );
}
