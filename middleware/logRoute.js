exports.logRoutes = (app) => {
    const router = app._router;
    const { stack } = router;

    stack.forEach((middleware) => {
        if (middleware.route) {
            const methods = Object.keys(middleware.route.methods);
            methods.forEach((method) => {
                console.log(`          - ${method.toUpperCase()} ${middleware.route.path}`);
            });
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    const methods = Object.keys(handler.route.methods);
                    const path = middleware.regexp.source.replace('^\\/', '/').replace('\\/?(?=\\/|$)', '');
                    methods.forEach((method) => {
                        console.log(`          - ${method.toUpperCase()} ${path}${handler.route.path}`);
                    });
                }
            });
        }
    });
};