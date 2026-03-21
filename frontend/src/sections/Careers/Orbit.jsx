
import { useState, useRef } from "react";
import { createPortal } from "react-dom";

const W = 800, H = W*0.9, cx = W*0.5, cy = H * 0.72;

const satellites = [
    { a: 185, r: 225, sz: 260 },
    { a: 235, r: 430, sz: 340 },
    { a: 247, r: 245, sz: 265 },
    { a: 275, r: 365, sz: 320 },
    { a: 310, r: 190, sz: 220 },
    { a: 345, r: 260, sz: 325 },
];

function deg2rad(d) { return d * Math.PI / 180; }

function arcD(r) {
    const sx = cx + r * Math.cos(deg2rad(180));
    const sy = cy + r * Math.sin(deg2rad(180));
    const ex = cx + r * Math.cos(deg2rad(0));
    const ey = cy + r * Math.sin(deg2rad(0));
    return `M${sx} ${sy} A${r} ${r} 0 1 1 ${ex} ${ey}`;
}

import { motion } from "motion/react";
import { useEffect } from "react";

function ZoomOverlay({ src, anchorRef, size, borderWidth = 3 }) {
    const [pos, setPos] = useState(null);

    useEffect(() => {
        if (!anchorRef?.current) return;
        const rect = anchorRef.current.getBoundingClientRect();
        const zoomedSize = size * 2;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const padding = 16;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // clamp so the zoomed circle never bleeds outside the viewport
        const left = Math.min(
            Math.max(centerX - zoomedSize / 2, padding),
            vw - zoomedSize - padding
        );
        const top = Math.min(
            Math.max(centerY - zoomedSize / 2, padding),
            vh - zoomedSize - padding
        );

        setPos({ left, top, zoomedSize });
    }, [anchorRef, size]);

    if (!pos) return null;

    return createPortal(
        <motion.div
        className="fixed rounded-xl pointer-events-none"
        style={{
            left: pos.left,
            top: pos.top,
            width: pos.zoomedSize,
            // height: pos.zoomedSize,
            zIndex: 9999,
            padding: 6,                          // brand border thickness
            backgroundColor: "white",          // brand colour ring
            boxShadow: "0 0 0 2px rgb(137, 147, 161)",         // white inner ring via box-shadow
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
        {/* dark overlay */}
        {/* <div className="absolute inset-0 rounded-full bg-black/25" /> */}
        <div className="relative w-full h-auto rounded-xl overflow-hidden">
            <img src={src} alt="culture" className="w-full h-full object-cover" />
        </div>
    </motion.div>,
        document.body
    );
}
import { AnimatePresence } from "motion/react";

function SatelliteImage({ src, size, left, top, borderWidth = 3, centerStyle = {} }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);

    return (
        <>
            <div
                ref={ref}
                className="absolute rounded-full overflow-hidden border-white shadow-md cursor-pointer"
                style={{
                    width: size, height: size, left, top,
                    transform: "translate(-50%, -50%)",
                    borderWidth, borderStyle: "solid", zIndex: 2,
                    transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    ...centerStyle,
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img src={src} alt="culture" className="w-full h-full object-cover" />
            </div>
            <AnimatePresence>
                {hovered && (
                    <ZoomOverlay src={src} anchorRef={ref} size={size} borderWidth={borderWidth} />
                )}
            </AnimatePresence>
        </>
    );
}

function Orbit({ imgs }) {
    return (
        <div className="relative !w-full overflow-hidden h-full" style={{ height: H }}>
            {/* arcs */}
            <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
            >
                <path d={arcD(180)} fill="none" stroke="rgba(180, 190, 204, 1)" strokeWidth="2" strokeDasharray="5 5" />
                <path d={arcD(300)} fill="none" stroke="rgba(180, 190, 204, 0.75)" strokeWidth="2" strokeDasharray="5 5" />
                <path d={arcD(420)} fill="none" stroke="rgba(180, 190, 204, 0.65)" strokeWidth="1" strokeDasharray="5 5" />
                <path d={arcD(540)} fill="none" stroke="rgba(180, 190, 204, 0.4)" strokeWidth="1" strokeDasharray="5 5" />
            </svg>

            {/* satellites */}
            {satellites.map((s, i) => {
                const rad = deg2rad(s.a);
                const px = cx + s.r * Math.cos(rad);
                const py = cy + s.r * Math.sin(rad);
                return (
                    <SatelliteImage
                        key={i}
                        src={imgs[(i + 1) % imgs.length]}
                        size={s.sz}
                        left={`${(px / W) * 100}%`}
                        top={`${(py / H) * 100}%`}
                        borderWidth={4}
                        centerStyle={{ zIndex: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                    />
                );
            })}

            {/* center */}
            <SatelliteImage
                src={imgs[0]}
                size={300}
                left={`${(cx / W) * 100}%`}
                top={`${(cy / H) * 100}%`}
                borderWidth={4}
                centerStyle={{ zIndex: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            />
        </div>
    );
}

export default Orbit;