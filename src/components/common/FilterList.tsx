import { useState } from "react";
import type { DefaultFilterType, FilterList } from "../../types/filter";
import { FILTER_OPTIONS } from "../../data/filterOptions";
import DeleteIcon from "./DeleteIcon";
import BottomSheet from "./BottomSheet";

interface FilterListsProps {
    filterList: FilterList;
    setFilterList: React.Dispatch<React.SetStateAction<FilterList>>;
}

export const FilterLists = ({ filterList, setFilterList }: FilterListsProps) => {
    const [sheetIdx, setSheetIdx] = useState<number | null>(null);

    const handleDelete = (type: DefaultFilterType) => {
        setFilterList((prev) => {
            const newFilterList = [...prev];
            const index = newFilterList.findIndex(filter => filter.type === type);
            if (index !== -1) {
                newFilterList[index].option = null;
            }
            return newFilterList;
        });
    };

    const handleChipClick = (idx: number) => {
        setSheetIdx(idx);
    };

    const handleOptionSelect = (option: string) => {
        if (sheetIdx === null) return;
        setFilterList(prev => {
            const newList = [...prev];
            newList[sheetIdx] = { ...newList[sheetIdx], option: option as import('../../types/filter').ReadFilterType | import('../../types/filter').SizeFilterType | import('../../types/filter').PeriodFilterType };
            return newList;
        });
        setSheetIdx(null);
    };

    return (
        <>
            <div className='flex flex-row gap-2'>
                {filterList.map((filter, idx) => (
                    <div
                        key={filter.type}
                        className={
                            filter.option
                                ? 'bg-white flex flex-row justify-center text-sm border-[1px] whitespace-nowrap border-main text-main items-center py-2 px-[14px] gap-2 rounded-full shadow-[0_0_2px_rgba(107,107,107,0.25)] cursor-pointer'
                                : 'bg-white flex flex-col text-[#ACADB4] text-sm justify-center items-center whitespace-nowrap py-2 px-[14px] gap-2 rounded-full shadow-[0_0_2px_rgba(107,107,107,0.25)] cursor-pointer'
                        }
                        onClick={() => handleChipClick(idx)}
                    >
                        {filter.option || filter.type}
                        {filter.option && (
                            <button className='w-4 h-4' onClick={e => { e.stopPropagation(); handleDelete(filter.type as DefaultFilterType); }}>
                                <DeleteIcon />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <BottomSheet open={sheetIdx !== null} onClose={() => setSheetIdx(null)}>
                {sheetIdx !== null && (
                    <div className="flex flex-col gap-2">
                        {FILTER_OPTIONS[filterList[sheetIdx].type as DefaultFilterType].map(option => (
                            <button
                                key={option}
                                className={`w-full text-left py-3 px-2 rounded-lg ${filterList[sheetIdx].option === option ? 'bg-main text-white font-bold' : 'hover:bg-gray-100'}`}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </BottomSheet>
        </>
    );
};