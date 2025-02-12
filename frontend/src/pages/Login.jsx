import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "@/store";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      return toast.error("All fields required!");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/login`,
        input
      );

      sessionStorage.setItem("userId", response.data.user.id);
      sessionStorage.setItem("username", response.data.user.username);
      dispatch(authActions.login());

      setInput({ email: "", password: "" });

      toast.success(response.data.message || "Login successful!");
      navigate("/todo");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed. Try again!");
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px] h-[350px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="grid w-full items-center gap-4">
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
