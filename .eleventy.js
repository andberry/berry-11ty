module.exports = function (eleventyConfig) {
    eleventyConfig.addCollection("homesections", collectionApi => {
        return collectionApi.getFilteredByTag('home').sort((a, b) => {
            return a.inputPath.localeCompare(b.inputPath);
        });
    });
    
    return {
        dir: {

            // Top level directory that we’ll use to look for templates.
            input: 'src',

            // Eleventy layouts, include files, extends files, partials, or macros.
            includes: '_includes',

            // directory inside which the global data template files, available to all templates
            data: '_data',

            // Controls the directory inside which the finished templates will be written to
            output: 'dist'
        },

        templateFormats: ["html", "njk", "liquid", "md"]
        // dataTemplateEngine: false,
        // markdownTemplateEngine: false,
        // htmlTemplateEngine: false
    }
}