import React from 'react';
import SearchIcon from './SearchIcon';
import type { FilterList } from '../../types/filter';
import { FilterLists } from './FilterList';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterList: FilterList;
    setFilterList: React.Dispatch<React.SetStateAction<FilterList>>;
}

const SearchBar = ({ placeholder = '메일을 검색해보세요', value, onChange, filterList = [], setFilterList }: SearchBarProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className="flex items-center w-full bg-[#F5F7FA] rounded-xl px-2 py-2 mb-2">
                <SearchIcon className="w-8 h-8 text-gray-400 mr-2" />
                <input
                    type="text"
                    className="bg-transparent outline-none border-none w-full text-lg text-gray-700 placeholder-gray-400 font-medium"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <FilterLists filterList={filterList} setFilterList={setFilterList} />
        </div>
    );
};
export default SearchBar;