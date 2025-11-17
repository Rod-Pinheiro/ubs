import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  // Set up SSE headers
  const responseStream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode('data: {"type": "connected"}\n\n'));

      // Set up interval to check for new classifications
      let lastCheck = new Date();

      const checkInterval = setInterval(async () => {
        try {
          // Get count of classifications since last check
          const newClassifications = await prisma.classification.findMany({
            where: {
              createdAt: {
                gt: lastCheck,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          });

          if (newClassifications.length > 0) {
            // Send new classifications to client
            const data = JSON.stringify({
              type: 'new_classifications',
              data: newClassifications,
            });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }

          lastCheck = new Date();
        } catch (error) {
          console.error('SSE error:', error);
          // Send error message
          const errorData = JSON.stringify({
            type: 'error',
            message: 'Database connection error',
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
        }
      }, 5000); // Check every 5 seconds

      // Clean up interval when connection closes
      request.signal.addEventListener('abort', () => {
        clearInterval(checkInterval);
        controller.close();
      });
    },
  });

  return new Response(responseStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}