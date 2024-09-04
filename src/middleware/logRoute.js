exports.logRoutes = (app) => {
    const router = app._router;
    const { stack } = router;
    let logOutput = '';

    stack.forEach((middleware) => {
        if (middleware.route) {
            const methods = Object.keys(middleware.route.methods);
            methods.forEach((method) => {
                logOutput += `          - ${method.toUpperCase()} ${middleware.route.path}\n`;
            });
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    const methods = Object.keys(handler.route.methods);
                    const path = middleware.regexp.source.replace('^\\/', '/').replace('\\/?(?=\\/|$)', '');
                    methods.forEach((method) => {
                        logOutput += `          - ${method.toUpperCase()} ${path}${handler.route.path}\n`;
                    });
                }
            });
        }
    });

    return logOutput;
};