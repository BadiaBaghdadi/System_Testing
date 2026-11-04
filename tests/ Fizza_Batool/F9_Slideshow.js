
import { Selector } from 'testcafe';

fixture('T009 - F9 Homepage Slideshow')
    .page('https://www.demoblaze.com/');

const nextButton = Selector('a.carousel-control-next');
const prevButton = Selector('a.carousel-control-prev');
const activeSlide = Selector('.carousel-item.active');

    
test('TS01 - Next slide navigation', async t => {
    
const originalImage = await activeSlide.find('img').getAttribute('src');

await t.takeScreenshot('F9_TS01_before.png');

await t.click(nextButton);

await t.wait(1000);


await t.expect(
    activeSlide.find('img').getAttribute('src')
).notEql(originalImage);

await t.takeScreenshot('F9_TS01_after.png');

});


    
test('TS02 - Previous slide navigation', async t => {
    
const originalImage = await activeSlide.find('img').getAttribute('src');

await t.takeScreenshot('F9_TS02_before.png');

await t.click(prevButton);

    
await t.expect(
    activeSlide.find('img').getAttribute('src')
).notEql(originalImage);

await t.takeScreenshot('F9_TS02_after.png');

});



test('TS03 - Automatic slideshow transition', async t => {
    const originalImage = await activeSlide.find('img').getAttribute('src');

    await t.takeScreenshot('F9_TS03_before.png');

    await t.wait(5500);

    await t.expect(
        activeSlide.find('img').getAttribute('src')
    ).notEql(originalImage);

    await t.takeScreenshot('F9_TS03_after.png');
});
