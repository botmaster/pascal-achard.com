export default defineEventHandler(async (event) => {
  throw createError({
    statusCode: 502,
    statusMessage: 'Something bad happened on the server',
  });
});
