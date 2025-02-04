"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SyncLoader from "react-spinners/SyncLoader";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import { createNewBoard, createTask } from "@/actions/board";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const OnboardingForm = ({
  user,
  boardId,
}: {
  user: string | null | undefined;
  boardId: string | null;
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (boardId !== null) {
      router.push("/kanban");
    }
  }, []);

  const stepOneSubmit = () => {
    setStep(2);
  };

  const stepTwoSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      router.replace("/kanban");
      toast.success(`Welcome to your new board ${user}`);
      setLoading(false);
    }, 5000);
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full items-center justify-center pt-[82px] w-full mx-auto text-white bg-gradient-to-br from-gray-700 to-gray-950"
    >
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          <h1 className="mb-10 text-4xl font-bold uppercase">
            Hey {user} 👋 Let's Give Your Board a Name!
          </h1>
          <form
            className="flex flex-col gap-10 items-center"
            action={createNewBoard}
            onSubmit={stepOneSubmit}
          >
            <input
              type="text"
              name="boardname"
              placeholder="My Board Name..."
              disabled={loading}
              className={`h-20 bg-transparent border-b text-3xl w-4/5 self-center focus:outline-none
                ${loading && "opacity-50 cursor-default"} `}
            />
            <Button text="Continue" type="submit" />
          </form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          <h1 className="mb-10 text-4xl font-bold uppercase">
            Now Let's Add your first task! 😊
          </h1>
          <form
            onSubmit={stepTwoSubmit}
            action={createTask}
            className="flex flex-col gap-10 items-center"
          >
            <input
              type="text"
              name="task"
              placeholder="My First Task..."
              disabled={loading}
              className={`h-20 bg-transparent border-b text-3xl w-4/5 self-center focus:outline-none
                ${loading && "opacity-50 cursor-default"} `}
            />
            <input
              type="hidden"
              value={boardId || ""}
              name="boardId"
            />

            <div className="flex justify-between w-4/5 mb-10">
              <Button
                text="&#8592; Go Back"
                onClick={goBack}
                disabled={loading}
              />
              <Button
                text="Continue"
                type="submit"
                disabled={loading}
              />
            </div>
            {loading ? (
              <div className="flex gap-3 items-center text-white">
                <SyncLoader color="#fff" />
                <span>Getting Your Board Ready</span>
              </div>
            ) : null}
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OnboardingForm;