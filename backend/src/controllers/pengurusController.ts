import { Request, Response } from 'express';
import { prisma } from '../db';

export const getPengurus = async (req: Request, res: Response) => {
  try {
    const pengurus = await prisma.pengurus.findMany();
    res.json(pengurus);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPengurus = async (req: Request, res: Response) => {
  try {
    const { nama, jabatan, photoUrl } = req.body;
    const pengurus = await prisma.pengurus.create({
      data: { nama, jabatan, photoUrl },
    });
    res.json(pengurus);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePengurus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama, jabatan, photoUrl } = req.body;
    const pengurus = await prisma.pengurus.update({
      where: { id: Number(id) },
      data: { nama, jabatan, photoUrl },
    });
    res.json(pengurus);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePengurus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.pengurus.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Pengurus deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
