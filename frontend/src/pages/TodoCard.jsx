import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TodoCard = ({ tasks, setTasks }) => {
  const updateHandler = () => {
    toast.success("Task Updated!");
  };

  const deleteHandler = (idx) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks]; // Create a shallow copy of the tasks array
      updatedTasks.splice(idx, 1); // Remove the task at the given index
      return updatedTasks; // Return the updated array to setTasks
    });
    toast.success("Task deleted!");
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
                      onClick={() => deleteHandler(idx)}
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
