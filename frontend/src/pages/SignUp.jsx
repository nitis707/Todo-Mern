import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SignUp = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Register Yourself
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  // value={form.username}
                  // onChange={formHandler}
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  // value={form.email}
                  // onChange={formHandler}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  // value={form.password}
                  // onChange={formHandler}
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
