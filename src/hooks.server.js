export async function handle({ event, resolve }) {
    // if (event.url.pathname !== '/login' && !event.cookies.get("token")) {
    //     return new Response('Redirect', {status: 303, headers: { Location: '/scroll' }});
    // }
    if (event.url.pathname === '/') {
        return new Response('Redirect', {status: 303, headers: { Location: '/image' }});
    }
    return await resolve(event);
} 