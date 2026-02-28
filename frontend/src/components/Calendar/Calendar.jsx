import { motion } from 'motion/react';
import { useEffect, useState } from "react";

const GCalendarSrc = "https://calendar.app.google/rzaX9hegiiJ6j1tZ7"
// const GCalendarSrc = "https://calendar.google.com/calendar/embed?src=c_2492d85ba7a0b6af8c41aa75b11324c462c70b1295d0fa76763cf2ce072f8205@group.calendar.google.com&showTitle=0&mode=MONTH&bgcolor=%23FF6161&color=%2329527A"

const Calendar = () => {
    return (
        <>
            <CalendarWrapper>
                <BookingEmbed />
            </CalendarWrapper>
        </>
    )
}

export default Calendar;

// Modular Calendar Wrapper with Loading State
const CalendarWrapper = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Listen for when the calendar iframe loads
        const checkCalendarLoad = setInterval(() => {
            const iframe = document.querySelector('.zcal-inline-widget iframe');
            if (iframe) {
                // Wait for iframe to actually load content
                iframe.addEventListener('load', () => {
                    setTimeout(() => setIsLoaded(true), 300); // Small delay for smoother transition
                });
                clearInterval(checkCalendarLoad);
            }
        }, 100);

        // Fallback timeout in case iframe never detected
        const fallbackTimeout = setTimeout(() => {
            setIsLoaded(true);
        }, 3000);

        return () => {
            clearInterval(checkCalendarLoad);
            clearTimeout(fallbackTimeout);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative w-full"
        >
            {/* Skeleton Loader */}
            {!isLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
                >
                    <div className="w-full h-full bg-gray-200" />
                </motion.div>
            )}

            {/* Actual Calendar Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 rounded-2xl shadow-[0_22px_22px_-12px_rgba(0,0,0,0.12)]"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};


const BookingEmbed = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.shell}>
        <iframe
            src={GCalendarSrc}
            width="100%"
            height="700"
            frameBorder="0"
              style={{
                ...styles.iframe,
                // Warmer purple/indigo (current)
                // filter: 'hue-rotate(200deg) saturate(1.3) brightness(1.02)'

                // Keep Google's original blue, just punchier
                // filter: 'saturate(1.4) brightness(1.02)'

                // Teal/green tones
                // filter: 'hue-rotate(160deg) saturate(1.2)'

                // Deep violet
                // filter: 'hue-rotate(260deg) saturate(1.3)'

                // Dark mode (rough but functional)
                // filter: 'invert(1) hue-rotate(180deg) brightness(0.9)'

                // High contrast clean look
                // filter: 'contrast(1.1) saturate(1.2) brightness(1.03)'
            }}
            title="Booking"
            
        />
        <div style={styles.innerGlow} />
      </div>
    </div>
  );
};

const styles = {
    header: {
        marginBottom: "16px"
    },

    title: {
        fontSize: "1.25rem",
        fontWeight: 600,
        margin: 0,
        color: "#111827"
    },

    subtitle: {
        fontSize: "0.9rem",
        color: "#6b7280",
        marginTop: "4px"
    },

    shell: {
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #ffffff,rgb(255, 255, 255))",
        boxShadow: `
        0 10px 30px rgba(130, 130, 130, 0.08),
        0 2px 6px rgba(0,0,0,0.04)
        `,
        border: "1px solid rgba(0,0,0,0.06)",
        backdropFilter: "blur(12px)"
    },

    iframe: {
        border: "0",
        display: "block",
        borderRadius: "inherit",
    },

    innerGlow: {
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        boxShadow: `
            inset 0 0 0 1px rgba(255,255,255,0.6),
            inset 0 1px 2px rgba(0,0,0,0.03)
        `,
        pointerEvents: "none"
    }
};
