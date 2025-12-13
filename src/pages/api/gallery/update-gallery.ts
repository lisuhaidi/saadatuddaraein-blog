// src/pages/api/gallery/update-gallery.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const galleryFilePath = path.resolve(process.cwd(), 'src/data/gallery.json');

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, title, description, url } = await request.json();

    // Validation
    if (!id || !title || !description || !url) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate url is an array with at least one item
    if (!Array.isArray(url) || url.length === 0) {
      return new Response(
        JSON.stringify({ message: 'At least one image URL is required' }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Read gallery data
    const galleryFileContent = await fs.readFile(galleryFilePath, 'utf-8');
    const gallery = JSON.parse(galleryFileContent);

    // Find item
    const itemIndex = gallery.data.findIndex((item: any) => item.id === id);
    
    if (itemIndex === -1) {
      return new Response(
        JSON.stringify({ message: 'Item not found' }), 
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Update item
    gallery.data[itemIndex] = {
      ...gallery.data[itemIndex],
      title,
      description,
      url, // Save as array
    };

    // Write to file
    await fs.writeFile(galleryFilePath, JSON.stringify(gallery, null, 2));

    return new Response(
      JSON.stringify({ message: 'Item updated successfully' }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating item:', error);
    return new Response(
      JSON.stringify({ message: 'An internal server error occurred.' }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};