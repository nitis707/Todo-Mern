import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const [input, setInput] = useState({ username: "", email: "", password: "" });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.username || !input.password) {
      toast.error("All fields required!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/register`,
        input
      );

      setInput({ username: "", email: "", password: "" });

      toast.success(response.data.message || "Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed. Try again!");
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Register Yourself
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={input.username}
                onChange={inputHandler}
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={inputHandler}
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                value={input.password}
                onChange={inputHandler}
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <Button onClick={submitHandler} type="submit">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
