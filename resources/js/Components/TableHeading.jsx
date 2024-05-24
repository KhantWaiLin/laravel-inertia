import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

const TableHeading = ({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => {},
    children,
}) => {
    return (
        <th onClick={(e) => sortChanged(name)}>
            <div className="px-3 w-full py-2 flex items-center gap-2 justify-between">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={`w-4 h-4 cursor-pointer ${
                                sort_field === name && sort_direction === "asc"
                                    ? "text-white"
                                    : ""
                            }`}
                        />
                        <ChevronDownIcon
                            className={`w-4 h-4 cursor-pointer ${
                                sort_field === name && sort_direction !== "asc"
                                    ? "text-white"
                                    : ""
                            }`}
                        />
                    </div>
                )}
            </div>
        </th>
    );
};

export default TableHeading;
