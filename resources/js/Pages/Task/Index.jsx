import React from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TasksTable from "@/Components/TasksTabel";

const Index = ({ auth, tasks, success, queryParams = null }) => {
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
                            <TasksTable
                                tasks={tasks}
                                from="task"
                                queryParams={queryParams}
                                success={success}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
