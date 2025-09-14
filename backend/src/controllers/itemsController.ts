import { Request, Response } from "express";
import prisma from "../prisma";

const createItem = async (req: Request, res: Response) => {
  const { name, quantity, completed, userId } = req.body;

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        quantity,
        completed,
        userId,
      },
    });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Could not create item" });
  }
};

const getItems = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const items = await prisma.item.findMany({
      where: { userId: Number(userId) },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch items" });
  }
};

const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, quantity, completed } = req.body;

  try {
    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },
      data: { name, quantity, completed },
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Could not update item" });
  }
};

const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete item" });
  }
};

export { createItem, getItems, updateItem, deleteItem };
