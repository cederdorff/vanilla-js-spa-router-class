class Router {
    // private attributes
    #basePath = location.pathname.replace("index.html", ""); // remove index.html from path
    #pages = document.querySelectorAll(".page"); // reference to alle page sections in the DOM
    #navLinks = document.querySelectorAll("nav a"); // reference to all nav links

    constructor() {
        this.routes = {
            /**
             * All routes of the SPA
             * "path": "id of page in DOM"
             */
            "#/": "home",
            "#/about": "about",
            "#/clients": "clients",
            "#/contact": "contact"
        };
        this.initRouter();
    }
    /**
     * Changing display to none for all pages
     */
    hideAllPages() {
        for (const page of this.#pages) {
            page.style.display = "none";
        }
    }

    /**
     * Navigating SPA to specific page by given path
     */
    navigateTo(path) {
        if (!this.routes[location.hash]) {
            // fallback, if route not exists
            path = "#/";
        }
        window.history.pushState({}, path, this.#basePath + path);
        this.showPage(path);
    }

    /**
     * Displaying page by given path
     */
    showPage(path) {
        this.hideAllPages(); // hide all pages
        document.querySelector(`#${this.routes[path]}`).style.display = "block"; // show page by given path
        this.setActiveTab(path);
    }

    /**
     * sets active menu item by given path
     */
    setActiveTab(path) {
        for (const link of this.#navLinks) {
            if (path === link.getAttribute("href")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    }

    /**
     * Attaching event to nav links and preventing default anchor link event
     */
    attachNavLinkEvents() {
        for (const link of this.#navLinks) {
            link.addEventListener("click", event => {
                event.preventDefault();
                const path = link.getAttribute("href");
                this.navigateTo(path);
            });
        }
    }

    /**
     * Initialising the router, calling attachNavLinkEvents(), popstate event and navigateTo()
     */
    initRouter() {
        this.attachNavLinkEvents();
        window.addEventListener("popstate", () => this.navigateTo(location.hash)); // change page when using back and forth in browser

        let path = "#/"; // default path
        if (this.routes[location.hash]) {
            // to handle refresh without going back to "#/"
            path = location.hash;
        }
        this.navigateTo(path);
    }
}

const router = new Router();
export default router;
