import { Request, Response } from 'express';
import prisma from '../db';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categoryEvent.findMany({
      include: {
        _count: {
          select: { events: true }
        }
      }
    });
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.categoryEvent.findUnique({
      where: { id: parseInt(id) },
      include: {
        events: true
      }
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch category' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = await prisma.categoryEvent.create({
      data: {
        name: name.trim(),
        description: description ? description.trim() : null
      }
    });
    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create category' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = await prisma.categoryEvent.update({
      where: { id: parseInt(id) },
      data: {
        name: name.trim(),
        description: description ? description.trim() : null
      }
    });
    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update category' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.categoryEvent.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete category' });
  }
};
