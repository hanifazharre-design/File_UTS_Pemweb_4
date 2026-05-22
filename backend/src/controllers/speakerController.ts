import { Request, Response } from 'express';
import prisma from '../db';

export const getAllSpeakers = async (req: Request, res: Response) => {
  try {
    const speakers = await prisma.pembicara.findMany({
      include: {
        _count: {
          select: { events: true }
        }
      }
    });
    res.json(speakers);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch speakers' });
  }
};

export const getSpeakerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const speaker = await prisma.pembicara.findUnique({
      where: { id: parseInt(id) },
      include: {
        events: true
      }
    });
    if (!speaker) {
      return res.status(404).json({ error: 'Speaker not found' });
    }
    res.json(speaker);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch speaker' });
  }
};

export const createSpeaker = async (req: Request, res: Response) => {
  try {
    const { name, biodata, email, photoUrl } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Speaker name is required' });
    }
    if (!biodata || biodata.trim() === '') {
      return res.status(400).json({ error: 'Speaker biodata is required' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'Speaker email is required' });
    }

    const speaker = await prisma.pembicara.create({
      data: {
        name: name.trim(),
        biodata: biodata.trim(),
        email: email.trim().toLowerCase(),
        photoUrl: photoUrl ? photoUrl.trim() : null
      }
    });
    res.status(201).json(speaker);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create speaker' });
  }
};

export const updateSpeaker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, biodata, email, photoUrl } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Speaker name is required' });
    }
    if (!biodata || biodata.trim() === '') {
      return res.status(400).json({ error: 'Speaker biodata is required' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'Speaker email is required' });
    }

    const speaker = await prisma.pembicara.update({
      where: { id: parseInt(id) },
      data: {
        name: name.trim(),
        biodata: biodata.trim(),
        email: email.trim().toLowerCase(),
        photoUrl: photoUrl ? photoUrl.trim() : null
      }
    });
    res.json(speaker);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update speaker' });
  }
};

export const deleteSpeaker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.pembicara.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Speaker deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete speaker' });
  }
};
