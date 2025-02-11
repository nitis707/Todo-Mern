import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-7xl font-semi-bold flex flex-col">
          Organize your
          <span>work and life, finally.</span>
        </h1>
        <p className="flex flex-col text-xl">
          Become focused, organized, and calm with
          <span>todo app. The world's #1 task manager app.</span>
        </p>
        <div className="">
          <Button onClick={() => navigate("/todo")}>Make Todo List</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
