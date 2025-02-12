import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

const TodoCard = ({ tasks, setTasks }) => {
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/deleteTask/${id}`
      );

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

      toast.success(response.data.message || "Task deleted!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.response?.data?.message || "Failed to delete task!");
    }
  };

  return (
    <>
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
                    <Button size="sm">
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
    </>
  );
};

export default TodoCard;
