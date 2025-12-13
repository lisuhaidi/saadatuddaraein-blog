import type { APIContext } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// Resolve the path to gallery.json in the src/data directory
const galleryPath = path.resolve(process.cwd(), 'src/data/gallery.json');

/**
 * Handles POST requests to delete a gallery item by its ID.
 */
export async function POST({ request }: APIContext): Promise<Response> {
    try {
        const body = await request.json();
        const { id } = body;

        // Validate that an ID was provided
        if (!id) {
            return new Response(JSON.stringify({ message: 'An ID is required to delete an item.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Read the current gallery data
        const currentGalleryData = fs.readFileSync(galleryPath, 'utf-8');
        const gallery = JSON.parse(currentGalleryData);
        const galleryItems: { id: any }[] = gallery.data;

        // Check if the item to be deleted actually exists
        const itemExists = galleryItems.some(item => String(item.id) === String(id));
        if (!itemExists) {
            return new Response(JSON.stringify({ message: `Gallery item with ID ${id} not found.` }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Filter out the item to be deleted
        const updatedItems = galleryItems.filter(item => String(item.id) !== String(id));

        // Create the new gallery object
        const updatedGallery = {
            data: updatedItems
        };

        // Write the updated data back to the file
        fs.writeFileSync(galleryPath, JSON.stringify(updatedGallery, null, 2), 'utf-8');

        // Return a success response
        return new Response(JSON.stringify({ message: 'Gallery item deleted successfully.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        // Log the error and return a server error response
        console.error('Failed to delete gallery item:', error);
        return new Response(JSON.stringify({ message: 'An internal server error occurred.', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// Block other HTTP methods for this endpoint
export function ALL() {
  return new Response(JSON.stringify({ message: 'Method not allowed. Use POST.' }), {
    status: 405
  });
}
