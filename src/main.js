import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`);
        // Wait for the category cards to render,
        // otherwise enqueueLinks wouldn't enqueue anything.
        await page.waitForSelector('.collection-block-item');

        // Add links to the queue, but only from
        // elements matching the provided selector.
        await enqueueLinks({
            selector: '.collection-block-item',
            label: 'CATEGORY',
        });
    },
});

await crawler.run(['https://warehouse-theme-metal.myshopify.com/collections']);
