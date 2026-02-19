import { useEffect, useRef, useState } from "react"

export function useCarousel() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [active, setActive] = useState(0)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const slides = Array.from(container.children)

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActive(Number(entry.target.getAttribute("data-index")))
                    }
                })
            },
            { root: container, threshold: 0.6 }
        )

        slides.forEach(slide => observer.observe(slide))
        return () => observer.disconnect()
    }, [])

    const scrollTo = (index: number) => {
        const container = containerRef.current
        if (!container) return

        const slide = container.children[index] as HTMLElement
        slide?.scrollIntoView({ behavior: "smooth", inline: "center" })
    }

    return { containerRef, active, scrollTo }
}
