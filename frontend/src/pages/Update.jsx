import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();

  const updateHandler = () => {
    toast.success("Task Updated!");
    navigate("/todo");
  };

  return (
    <div className="min-h-[90vh] py-4">
      <div className="flex justify-center">
        <Card className="w-[350px] sm:w-[650px]">
          <CardHeader>
            <CardTitle>Your Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 pt-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  //   value={input.title}
                  //   onChange={inputHandler}
                  type="text"
                  placeholder="Enter your title"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="body">Body</Label>
                <Textarea
                  id="body"
                  name="body"
                  // value={input.body}
                  // onChange={inputHandler}
                  placeholder="Enter Body"
                />
              </div>

              <div>
                <Button onClick={updateHandler}>Update</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Update;
