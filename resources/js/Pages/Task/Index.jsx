import React from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

const Index = ({ auth, tasks, queryParams = null }) => {
    queryParams = queryParams || {};

    const SearchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("task.index", queryParams));
    };

    const onKeyPress = (e) => {
        if (e.key !== "Enter") return;

        SearchFieldChanged("name", e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("task.index", queryParams));
    };

    console.log(tasks);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="w-full flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tasks
                    </h2>
                    <div className="flex gap-5">
                        <TextInput
                            placeholder="Search"
                            defaultValue={queryParams?.name}
                            onBlur={(e) =>
                                SearchFieldChanged("name", e.target.value)
                            }
                            onKeyPress={(e) => {
                                onKeyPress(e);
                            }}
                            className="text-black"
                        />
                        <SelectInput
                            placeholder="Select"
                            defaultValue={queryParams.status}
                            onChange={(e) =>
                                SearchFieldChanged("status", e.target.value)
                            }
                        >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </SelectInput>
                    </div>
                </div>
            }
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>
                                        <th className="px-3 py-3">Image</th>
                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Name
                                        </TableHeading>
                                        <th className="px-3 py-2">
                                            Assigned User
                                        </th>
                                        <TableHeading
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Status
                                        </TableHeading>
                                        <TableHeading
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Create Date
                                        </TableHeading>

                                        <TableHeading
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Due Date
                                        </TableHeading>
                                        <th className="px-3 py-2">
                                            Created By
                                        </th>
                                        <th
                                            onClick={(e) => sortChanged()}
                                            className="px-3 py-2"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => (
                                        <tr
                                            key={task.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <th className="px-3 py-3">
                                                {task.id}
                                            </th>
                                            <td className="px-3 py-3">
                                                <img
                                                    src={task.image_path}
                                                    alt="image-path"
                                                    style={{ width: 60 }}
                                                />
                                            </td>
                                            <td className="px-3 py-3">
                                                {task.name}
                                            </td>
                                            <td className="px-3 py-3">
                                                {task.assigned_user.name}
                                            </td>
                                            <td className={`px-3 py-3`}>
                                                <span
                                                    className={`rounded text-white px-2 py-1
                                                    ${
                                                        TASK_STATUS_CLASS_MAP[
                                                            task.status
                                                        ]
                                                    }`}
                                                >
                                                    {
                                                        TASK_STATUS_TEXT_MAP[
                                                            task.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 text-nowrap">
                                                {task.created_at}
                                            </td>
                                            <td className="px-3 py-3 text-nowrap">
                                                {task.due_date}
                                            </td>
                                            <td className="px-3 py-3">
                                                {task.created_by.name}
                                            </td>
                                            <td className="px-3 py-3">
                                                <Link
                                                    href={route(
                                                        "task.edit",
                                                        task.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "task.destroy",
                                                        task.id
                                                    )}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
