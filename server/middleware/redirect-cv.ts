import { defineEventHandler, sendRedirect } from 'h3';

export default defineEventHandler((event) => {
  const reqUrl = event.node.req.url ?? '';

  // Check if the request URL matches the old CV path
  if (reqUrl.startsWith('/pdf/CV-Pascal-Achard-20.pdf')) {
    // permanent redirect to the new path
    return sendRedirect(event, '/pdf/CV-Pascal-Achard.pdf', 301);
  }
});
