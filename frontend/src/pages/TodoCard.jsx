import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Update from "./Update";

const TodoCard = ({ tasks, setTasks }) => {
  const [editIndex, setEditIndex] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const deleteHandler = async (id) => {
    if (userId) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/deleteTask/${id}`
        );

        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

        toast.success(response.data.message || "Task deleted!");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error(error.response?.data?.message || "Failed to delete task!");
      }
    } else {
      return toast.error("Please login first!");
    }
  };

  const handleEdit = (idx) => {
    if (!userId) {
      return toast.error("Please login first!");
    }
    setEditIndex(editIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col gap-2">
      {editIndex !== null && (
        <Update
          updateId={editIndex}
          task={tasks}
          setTasks={setTasks}
          onClose={() => setEditIndex(null)} // Add this
        />
      )}
      <Card className="w-[350px] sm:w-[650px]">
        <CardHeader>
          <CardTitle>Your Todos</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-foreground">
              No tasks added!
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tasks.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col h-[160px] justify-between gap-4 p-2 bg-gray-100 dark:bg-gray-800 rounded"
                >
                  <div className="overflow-hidden break-words whitespace-normal">
                    <p className="text-l font-bold">{item.title}</p>
                    <p>{item.body.split("", 77)}...</p>
                  </div>

                  <div className="space-x-4">
                    <Button size="sm" onClick={() => handleEdit(idx)}>
                      <Edit />
                    </Button>

                    <Button
                      onClick={() => deleteHandler(item._id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoCard;
