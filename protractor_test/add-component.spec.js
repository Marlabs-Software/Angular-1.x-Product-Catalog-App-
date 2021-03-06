

describe('Protractor Angular App', function() {

    beforeEach(function() {
        var origFn = browser.driver.controlFlow().execute;

        browser.driver.controlFlow().execute = function() {
        var args = arguments;

        // queue 100ms wait
        origFn.call(browser.driver.controlFlow(), function() {
            return protractor.promise.delayed(100);
        });

        return origFn.apply(browser.driver.controlFlow(), args);
        }; 
    });
    
    it('should add component', function() {

        browser.get('http://localhost:8033/');
        
        element(by.id('lnkAddComp')).click();

        element(by.model('product.name')).sendKeys("Test Component");
        element(by.model('product.shortDescription')).sendKeys("Short Description");
        element(by.model('product.longDescription')).sendKeys("Long Description");
        element(by.id('btnAdd')).click();

        var elems = element.all(by.repeater('product in ProductCatlogDB'));
        expect(elems.count()).toBe(8);
    });
});