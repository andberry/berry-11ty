function initScrollLinks() {
    const scrollLinks = document.querySelectorAll("a[href^='#']");
    for (const item of Array.from(scrollLinks)) {
        UIkit.scroll(item, {});
    }
}

function doOnDocumentLoaded () {
    initScrollLinks();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doOnDocumentLoaded);
} else {
    doOnDocumentLoaded();
}