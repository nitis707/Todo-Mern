import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import TodoCard from "./TodoCard";
import toast from "react-hot-toast";

const Todo = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const [input, setInput] = useState({
    title: "",
    body: "",
  });
  const [tasks, setTasks] = useState([]);

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

  const addTaskHandler = (e) => {
    e.preventDefault();
    console.log(input);

    setTasks([...tasks, input]);
    setInput({
      title: "",
      body: "",
    });
    toast.success("Task Added!");
    console.log(tasks);
  };

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
