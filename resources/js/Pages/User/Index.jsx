import React from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

const index = ({ auth, users, queryParams = null, success }) => {
    queryParams = queryParams || {};

    const SearchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index", queryParams));
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        SearchFieldChanged(name, e.target.value);
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
        router.get(route("user.index", queryParams));
    };

    const deleteUser = (user) => {
        if (window.alert("Are you sure you want to delete the user?")) {
            return;
        }
        router.delete(route("user.destroy", user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="w-full flex justify-between">
                    <div className="flex gap-8">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Users
                        </h2>
                    </div>
                    <div className="flex gap-5">
                        <Link
                            href={route("user.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all
                             hover:bg-emerald-600 flex items-center"
                        >
                            Add new
                        </Link>
                        <TextInput
                            placeholder="User Name"
                            defaultValue={queryParams?.name}
                            onBlur={(e) =>
                                SearchFieldChanged("name", e.target.value)
                            }
                            onKeyPress={(e) => {
                                onKeyPress("name", e);
                            }}
                            className="text-black"
                        />
                        <TextInput
                            placeholder="User Name"
                            defaultValue={queryParams?.email}
                            onBlur={(e) =>
                                SearchFieldChanged("email", e.target.value)
                            }
                            onKeyPress={(e) => {
                                onKeyPress("email", e);
                            }}
                            className="text-black"
                        />
                    </div>
                </div>
            }
        >
            <Head title="Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {success && (
                            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                                {success}
                            </div>
                        )}
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

                                        <TableHeading
                                            name="email"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Email
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
                                        <th
                                            onClick={(e) => sortChanged()}
                                            className="px-3 py-2"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <th className="px-3 py-3">
                                                {user.id}
                                            </th>
                                            <td className="px-3 py-3">
                                                <Link className="text-white">
                                                    {user.name}
                                                </Link>
                                            </td>
                                            <td className={`px-3 py-3`}>
                                                {user.email}
                                            </td>
                                            <td className="px-3 py-3 text-nowrap">
                                                {user.created_at}
                                            </td>
                                            <td className="px-3 py-3 text-nowrap">
                                                <Link
                                                    href={route(
                                                        "user.edit",
                                                        user.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteUser(user)
                                                    }
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default index;
