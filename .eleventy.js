module.exports = function (eleventyConfig) {
    /*
    eleventyConfig.addCollection("homeContents", collectionApi => {
        return collectionApi.getFilteredByTag('homeContents').sort((a, b) => {
            return a.fileSlug.localeCompare(b.fileSlug);
        });
    });

    eleventyConfig.addCollection("homeFrContents", collectionApi => {
        return collectionApi.getFilteredByTag('homeFrContents').sort((a, b) => {
            return a.fileSlug.localeCompare(b.fileSlug);
        });
    });
    */

    eleventyConfig.addFilter("sortCollectionByFilename", (c) => {
        return c.sort((a, b) => {
            const aNum = parseInt(a.fileSlug.split('-')[0]);
            const bNum = parseInt(b.fileSlug.split('-')[0]);
            return aNum - bNum;
            // return a.fileSlug.split('-')[0].localeCompare(b.fileSlug.split('-')[0])
        });
    });

    // assets config
    eleventyConfig.addPassthroughCopy({ "src/assets/compiled": "assets" });
    eleventyConfig.addWatchTarget("src/assets/compiled/");
    
    
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
    }
}