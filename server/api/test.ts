export default defineEventHandler(async () => {
  throw createError({
    statusCode: 502,
    statusMessage: 'Something bad happened on the server',
  });
});
