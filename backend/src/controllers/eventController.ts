import { Request, Response } from 'express';
import prisma from '../db';

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        category: true,
        pembicara: true
      }
    });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch events' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        pembicara: true
      }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch event' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, categoryId, pembicaraId, maxParticipants } = req.body;
    
    // Validations
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Event title is required' });
    }
    if (!description || description.trim() === '') {
      return res.status(400).json({ error: 'Event description is required' });
    }
    if (!date || date.trim() === '') {
      return res.status(400).json({ error: 'Event date is required' });
    }
    if (!location || location.trim() === '') {
      return res.status(400).json({ error: 'Event location is required' });
    }
    if (!categoryId) {
      return res.status(400).json({ error: 'Event category is required' });
    }
    if (!pembicaraId) {
      return res.status(400).json({ error: 'Event speaker is required' });
    }

    const parsedCategoryId = parseInt(categoryId);
    const parsedPembicaraId = parseInt(pembicaraId);
    const parsedMaxParticipants = parseInt(maxParticipants) || 100;

    // Verify references
    const categoryExists = await prisma.categoryEvent.findUnique({ where: { id: parsedCategoryId } });
    if (!categoryExists) {
      return res.status(400).json({ error: 'Category does not exist' });
    }

    const speakerExists = await prisma.pembicara.findUnique({ where: { id: parsedPembicaraId } });
    if (!speakerExists) {
      return res.status(400).json({ error: 'Speaker does not exist' });
    }

    const event = await prisma.event.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        date: date.trim(),
        location: location.trim(),
        categoryId: parsedCategoryId,
        pembicaraId: parsedPembicaraId,
        maxParticipants: parsedMaxParticipants
      },
      include: {
        category: true,
        pembicara: true
      }
    });

    res.status(201).json(event);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, date, location, categoryId, pembicaraId, maxParticipants } = req.body;
    
    // Validations
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Event title is required' });
    }
    if (!description || description.trim() === '') {
      return res.status(400).json({ error: 'Event description is required' });
    }
    if (!date || date.trim() === '') {
      return res.status(400).json({ error: 'Event date is required' });
    }
    if (!location || location.trim() === '') {
      return res.status(400).json({ error: 'Event location is required' });
    }
    if (!categoryId) {
      return res.status(400).json({ error: 'Event category is required' });
    }
    if (!pembicaraId) {
      return res.status(400).json({ error: 'Event speaker is required' });
    }

    const parsedCategoryId = parseInt(categoryId);
    const parsedPembicaraId = parseInt(pembicaraId);
    const parsedMaxParticipants = parseInt(maxParticipants) || 100;

    // Verify references
    const categoryExists = await prisma.categoryEvent.findUnique({ where: { id: parsedCategoryId } });
    if (!categoryExists) {
      return res.status(400).json({ error: 'Category does not exist' });
    }

    const speakerExists = await prisma.pembicara.findUnique({ where: { id: parsedPembicaraId } });
    if (!speakerExists) {
      return res.status(400).json({ error: 'Speaker does not exist' });
    }

    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title: title.trim(),
        description: description.trim(),
        date: date.trim(),
        location: location.trim(),
        categoryId: parsedCategoryId,
        pembicaraId: parsedPembicaraId,
        maxParticipants: parsedMaxParticipants
      },
      include: {
        category: true,
        pembicara: true
      }
    });

    res.json(event);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update event' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete event' });
  }
};
