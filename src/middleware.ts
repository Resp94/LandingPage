// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
    // Extract runtime injected by Cloudflare
    const runtime = (context.locals as any).runtime;

    // Attach variables globally to locals so all components can access it uniformly
    // We prefer the Cloudflare runtime.env, but fallback to process.env and import.meta.env
    context.locals.env = {
        ...import.meta.env,
        ...(typeof process !== 'undefined' ? process.env : {}),
        ...(runtime?.env || {})
    };

    return next();
});
