import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import toast from "react-hot-toast";
import axios from "axios";

const Todo = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [input, setInput] = useState({
    title: "",
    body: "",
  });
  const [tasks, setTasks] = useState([]);
  let userId = sessionStorage.getItem("userId");

  const show = () => {
    setShowTextarea(true);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const addTaskHandler = async (e) => {
    e.preventDefault();
    if (!input.title || !input.body) {
      return toast.error("All fields are required!");
    }

    if (userId) {
      const response = await axios.post(
        "http://localhost:8080/api/v2/addTask",
        {
          title: input.title,
          body: input.body,
          id: userId,
        }
      );

      console.log(response.data);

      setInput({
        title: "",
        body: "",
      });

      toast.success(response.data.message || "Task Added!");
    } else {
      setTasks((prevTasks) => [...prevTasks, input]);
      setInput({
        title: "",
        body: "",
      });

      toast.error("Your Task is not saved! Please login.");
    }
  };

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        const response = await axios.get(
          `http://localhost:8080/api/v2/fetchTask/${userId}`
        );

        setTasks(response.data.tasks);
      };
      fetch();
    }
  }, [addTaskHandler]);

  return (
    <div className="min-h-[90vh] py-4">
      <div className="flex justify-center">
        <Card className="w-[350px] sm:w-[650px]">
          <CardContent>
            <div className="space-y-2 pt-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={input.title}
                  onChange={inputHandler}
                  type="text"
                  placeholder="Enter your title"
                  onClick={show}
                />
              </div>
              {showTextarea && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="body">Body</Label>
                  <Textarea
                    id="body"
                    name="body"
                    value={input.body}
                    onChange={inputHandler}
                    placeholder="Enter Body"
                  />
                </div>
              )}
              <div>
                <Button onClick={addTaskHandler}>Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-5">
        <TodoCard tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Todo;
