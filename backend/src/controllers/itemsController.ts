import { Request, Response } from "express";
import prisma from "../prisma";

const createItem = async (req: Request, res: Response) => {
  const { name, quantity, completed } = req.body;

  try {
    const userId = (req.user as { id: number }).id;
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
    console.error(error);
    res.status(500).json({ error: "Could not create item" });
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { id: number }).id;
    const items = await prisma.item.findMany({
      where: { userId: Number(userId) },
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch items" });
  }
};

const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, quantity, completed } = req.body;

  try {
    const userId = (req.user as { id: number }).id;
    const item = await prisma.item.findUnique({ where: { id: Number(id) } });
    if (!item || item.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to update this item" });
    }
    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },
      data: { name, quantity, completed },
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update item" });
  }
};

const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userId = (req.user as { id: number }).id;
    const item = await prisma.item.findUnique({ where: { id: Number(id) } });
    if (!item || item.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this item" });
    }
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Item deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete item" });
  }
};

export { createItem, getItems, updateItem, deleteItem };
