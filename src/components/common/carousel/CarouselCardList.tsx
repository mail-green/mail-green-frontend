import React, { useState, useRef, useLayoutEffect } from "react";
import { PaginationDots } from "./PaginationDots";

type CarouselProps<T> = {
    data: T[];
    renderCard: (item: T, idx: number) => React.ReactNode;
};

export function Carousel<T>({ data, renderCard }: CarouselProps<T>) {
    const [current, setCurrent] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const mouseDownX = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useLayoutEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 터치 이벤트
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        setIsDragging(true);
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || touchStartX.current === null) return;
        const moveX = e.touches[0].clientX - touchStartX.current;
        setDragX(moveX);
    };
    const onTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (Math.abs(dragX) > containerWidth / 4) {
            if (dragX < 0 && current < data.length - 1) {
                setCurrent(current + 1);
            } else if (dragX > 0 && current > 0) {
                setCurrent(current - 1);
            }
        }
        setDragX(0);
        touchStartX.current = null;
    };

    // 마우스 이벤트
    const onMouseDown = (e: React.MouseEvent) => {
        mouseDownX.current = e.clientX;
        setIsDragging(true);
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || mouseDownX.current === null) return;
        const moveX = e.clientX - mouseDownX.current;
        setDragX(moveX);
    };
    const onMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (Math.abs(dragX) > containerWidth / 4) {
            if (dragX < 0 && current < data.length - 1) {
                setCurrent(current + 1);
            } else if (dragX > 0 && current > 0) {
                setCurrent(current - 1);
            }
        }
        setDragX(0);
        mouseDownX.current = null;
    };
    const onMouseLeave = () => {
        if (isDragging) onMouseUp();
    };

    // 카드 translateX 계산 (한 번에 한 장만 중앙에 오도록)
    const offset = -current * containerWidth + dragX;

    return (
        <div className="relative w-full max-w-xl mx-auto select-none">
            <div
                className="overflow-hidden"
                ref={containerRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                style={{ height: "auto", cursor: isDragging ? "grabbing" : "grab" }}
            >
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        width: "100%",
                        transform: `translateX(${offset}px)`,
                        transition: isDragging ? "none" : "transform 0.5s cubic-bezier(.4,0,.2,1)",
                    }}
                >
                    {data.map((item, idx) => (
                        <div key={idx} className="flex-[0_0_100%] min-w-0 px-2">
                            {renderCard(item, idx)}
                        </div>
                    ))}
                </div>
            </div>
            <PaginationDots activeIndex={current} total={data.length} />
        </div>
    );
} 