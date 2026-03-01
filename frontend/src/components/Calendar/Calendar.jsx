import { motion } from 'motion/react';
import { useEffect, useState } from "react";

// const GCALENDAR_SRC = "https://calendar.google.com/calendar/embed?src=c_2492d85ba7a0b6af8c41aa75b11324c462c70b1295d0fa76763cf2ce072f8205%40group.calendar.google.com&ctz=Asia%2FKolkata";
const GCALENDAR_SRC = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ02mA4QqY9ENAPyNYTpTfxc9fvkv7vgCGV5q5-3trcg4vp95aPQBiZOEXhg8unMAdIn0X5g5g4d?gv=true"

// ─── Calendar ─────────────────────────────────────────────────────────────────
const Calendar = () => (
    <CalendarWrapper>
        <BookingEmbed />
    </CalendarWrapper>
);

export default Calendar;

// ─── Wrapper with loading state ───────────────────────────────────────────────
const CalendarWrapper = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const iframe = document.querySelector('.zcal-inline-widget iframe');
            if (iframe) {
                iframe.addEventListener('load', () => {
                    setTimeout(() => setIsLoaded(true), 300);
                });
                clearInterval(interval);
            }
        }, 100);

        const fallback = setTimeout(() => setIsLoaded(true), 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(fallback);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative w-full"
        >
            {/* Skeleton */}
            {!isLoaded && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            )}

            {/* Content */}
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

// ─── Embed ────────────────────────────────────────────────────────────────────
const BookingEmbed = () => (
    <div className="w-full">
        <div className="relative rounded-3xl overflow-hidden bg-white border border-black/[0.06] shadow-[0_10px_30px_rgba(130,130,130,0.08),0_2px_6px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <iframe
                src={GCALENDAR_SRC}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Booking"
                className="block w-full min-h-[420px] h-[55vw] max-h-[700px] rounded-[inherit]"
                style={{ 
                    // filter: 'hue-rotate(160deg) saturate(1.2)' 
                }}
            />
            <div
                className="absolute inset-0 rounded-[inherit] pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 1px 2px rgba(0,0,0,0.03)' }}
            />

            {/* <ScheduleButton /> */}
        </div>
    </div>
);

import {  useRef } from "react";

const ScheduleButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://calendar.google.com/calendar/scheduling-button-script.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://calendar.google.com/calendar/scheduling-button-script.js";
    script.async = true;

    script.onload = () => {
      if (window.calendar && buttonRef.current) {
        window.calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ02mA4QqY9ENAPyNYTpTfxc9fvkv7vgCGV5q5-3trcg4vp95aPQBiZOEXhg8unMAdIn0X5g5g4d?gv=true",
          color: "#F4511E",
          label: "Schedule a Call",
          target: buttonRef.current,
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return <div ref={buttonRef}></div>;
};