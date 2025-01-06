import { RequestQueue } from 'crawlee';

// First you create the request queue instance.
const requestQueue = await RequestQueue.open();

// And then you add one or more requests to it.
await requestQueue.addRequest({ url: 'https://crawlee.dev' });
