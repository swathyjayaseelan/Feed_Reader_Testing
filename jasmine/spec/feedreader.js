/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //check if all urls are defined
        it('URLs are all defined', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe(0);
            });
        });
        //check if names are present
        it('names are all defined', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe(0);
            });
        });
    });

    describe('Menu', function() {
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('menu hidden by default', function() {
            //by default 'body' should have 'menu-hidden' class
            expect($('body')).toHaveClass('menu-hidden');
        });
        it('menu opens when clicked and closes when clicked again', function() {
            // When the icon is clicked the class will be toggled
            $(".menu-icon-link").click();
            expect($('body')).not.toHaveClass('menu-hidden');
            $(".menu-icon-link").click();
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var feed;
        beforeEach(function(done) {
            //go through feed to find the elements "article"
            loadFeed(0, function() {
                feed = $('.feed').find('article').length;
                done();
            });
        });
        it('load feed function works', function() {
            //if the length is greather than 0 then atleast one article is present. And only article has the class ".entry"
            expect(feed).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.

         */
        var feed1;
        var feed2;

        beforeEach(function(done) {
            //get the first feed and store in feed1
            loadFeed(0, function() {
                feed1 = ($('.feed').text());
            });
            //get a different feed and store in feed2
            loadFeed(1, function() {
                feed2 = ($('.feed').text());
                done();
            });
        });

        it('feed content is updated', function() {
            //check if both the feeds are not equal
            expect(feed1).not.toEqual(feed2);
        });
    });
}());
