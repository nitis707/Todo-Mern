import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Update = ({ updateId, task, setTasks, onClose }) => {
  const [input, setInput] = useState({
    title: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (updateId !== null && task[updateId]) {
      setInput({
        title: task[updateId].title,
        body: task[updateId].body,
      });
    }
  }, [updateId]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateHandler = async () => {
    if (!input.title || !input.body) {
      return toast.error("All fields are required!");
    }

    if (!userId) {
      return toast.error("Please login first!");
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/updateTask/${
          task[updateId]._id
        }`,
        {
          title: input.title,
          body: input.body,
          id: userId,
        }
      );

      if (response.data.success) {
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks[updateId] = response.data.task;
          return newTasks;
        });
        toast.success(response.data.message || "Task Updated!");
        onClose(); // Close the form after successful update
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update task. Please try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything if no task is selected for update
  if (updateId === null) return null;

  return (
    <Card className="w-[350px] sm:w-[650px] mb-2">
      <CardHeader>
        <CardTitle>Update Task</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 pt-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="titleUpdate">Title</Label>
            <Input
              id="titleUpdate"
              name="title"
              value={input.title}
              onChange={inputHandler}
              type="text"
              placeholder="Enter title"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="bodyUpdate">Description</Label>
            <Textarea
              id="bodyUpdate"
              name="body"
              value={input.body}
              onChange={inputHandler}
              placeholder="Enter Description"
              disabled={isLoading}
            />
          </div>

          <div className="space-x-2">
            <Button onClick={updateHandler} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Update;
