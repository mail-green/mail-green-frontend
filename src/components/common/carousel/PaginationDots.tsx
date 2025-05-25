type Props = {
    activeIndex: number;
    total: number;
}

export function PaginationDots({ activeIndex, total }: Props) {
    return (
        <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    className={
                        i === activeIndex
                            ? "w-4 h-2 rounded-full bg-main transition-all duration-200"
                            : "w-2 h-2 rounded-full bg-gray-300 transition-all duration-200"
                    }
                />
            ))}
        </div>
    );
}