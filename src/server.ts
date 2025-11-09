/*  
 * @source https://medium.com/deno-the-complete-reference/a-beginners-guide-to-building-a-static-file-server-in-bun-9392b4eb0921
 */

const PORT = 3000;

const ROOT_PATH = 'public/';

const INDEX = 'index.html';

console.log(`Serving on port: ${PORT}`)

Bun.serve({
  port: PORT,
  fetch(req) {
    const pathname = new URL(req.url).pathname;
    console.log('URL: ', pathname);

    if (pathname === '/' || pathname === `/${INDEX}`) {
      return serveFile(INDEX);
    }

    return serveFile(pathname);
  },
  error() {
    return new Response(null, { status: 404 }); 
  },
});


function serveFile(pathname: string) {
  const filePath = `${ROOT_PATH}${pathname}`;
  const file = Bun.file(filePath);

  return new Response(file);
}
