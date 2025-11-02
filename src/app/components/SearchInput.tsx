'use client';

type SearchBarProps = {
  searchName: string;
  color?: string;
  placeholderText: string;
};

export default function SearchInput(SearchBarProps: SearchBarProps){

    const defaultColor = SearchBarProps.color || "#6b7280";

    const displayText = SearchBarProps.placeholderText + SearchBarProps.searchName;

    return(
        <div className="p-4 sm:p-8 lg:p-20">
            <input type="text" placeholder={displayText} 
                   style= {{
                       border: `2px solid ${defaultColor}`
                   }}/>
        </div>
    )
}