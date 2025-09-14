import { Request, Response } from 'express';
import prisma from '../prisma';
import bcrypt from 'bcrypt';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })
  res.json(result)
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  res.json({ message: 'Signin successful' })
}