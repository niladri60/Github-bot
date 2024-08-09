class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }

    loadRoute(...urlSegments) {
        const matchedRoute = this._matchUrlToRoute(urlSegments);

        const url = `/${urlSegments.join('/')}`;
        history.pushState({}, 'this works', url);

        const routerOutlet = document.querySelector('[data-router-outlet]');
        routerOutlet.innerHTML = matchedRoute.template;
    }

    _matchUrlToRoute(urlSegments) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);

            if (routePathSegments.length !== urlSegments.length) {
                return false;
            }

            return routePathSegments.every((segment, i) => segment === urlSegments[i]);
        });

        return matchedRoute;
    }

    _loadInitialRoute() {
        const pathSegments = window.location.pathname.split('/').slice(1);
        this.loadRoute(...pathSegments);
    }
}

// Usage Example
const routes = [
    { path: '/', template: '<h1>Home</h1>' },
    { path: '/about', template: '<h1>About</h1>' },
    { path: '/contact', template: '<h1>Contact</h1>' }
];

const router = new Router(routes);
