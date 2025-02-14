"use server";
import prisma from "@/app/db"

import { revalidatePath } from "next/cache"
import getAuthUser from "./auth"

export const getBoardIdForUser = async () => {
  const user = await getAuthUser()
  const board = await prisma.kanbanBoard.findFirst({
    where: {
      userId: user?.id as string
    }
  })

  return board ? board.id : null
}


export const createNewBoard = async (formData: FormData) => {
  const user = await getAuthUser()

  const boardName = formData.get("boardname") as string

  const existingBoard = await prisma.kanbanBoard.findFirst({
    where: {
      userId: user?.id as string
    }
  })

  if (existingBoard) {
    await prisma.kanbanBoard.update({
      where: {
        id: existingBoard.id
      },
      data: {
        name: boardName
      }
    })
  } else {
    await prisma.kanbanBoard.create({
      data: {
        name: boardName,
        userId: user?.id as string
      }
    })
  }

  revalidatePath("/");
}

export async function createTask(formData: FormData) {
  const taskName = formData.get("task") as string
  const boardId = formData.get("boardId") as string

  if (!taskName.trim()) {
    return
  }

  await prisma.task.create({
    data: {
      name: taskName,
      boardId: boardId,
      status: "TODO"
    }
  })

  revalidatePath("/");
}

export async function deleteTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;

  await prisma.task.delete({
    where: {
      id: taskId
    }
  })

  revalidatePath("/")
}

export async function editTask(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const newTask = formData.get("newTask") as string;

  if(!newTask.trim()) {
    return
  }

  await prisma.task.update({
    where: {
      id: taskId
    },
    data: {
      name: newTask
    }
  })
}