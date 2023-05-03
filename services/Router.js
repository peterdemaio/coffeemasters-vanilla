const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                //const url = a.href; one way to get the url
                //const url = a.getAttribute("href"); // another way to do it
                const url = event.target.getAttribute("href") // can also use event.target instead of a. Either is fine because we have access to both
                Router.go(url);
            })
        })

        //Event handler for URL changes
        window.addEventListener("popstate", event => {
            Router.go(event.state.route, false);
        })
        // check the initital URL
        Router.go(location.pathname)
    },
    go: (route, addToHistory = true) => {
        console.log(`Going to ${route}`)

        if (addToHistory) {
            history.pushState({ route }, '', route);
        }
        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    pageElement.dataset.productId = route.substring(route.lastIndexOf("-") + 1);
                }
                break;
        }
        if (pageElement) {

            //document.querySelector("main").children[0].remove();
            const cache = document.querySelector("main")
            cache.innerHTML = ""; //the quick and dirty way to clear html
            cache.appendChild(pageElement)
            window.scrollX = 0;
            window.scrollY = 0;
        }

    }
}

export default Router;