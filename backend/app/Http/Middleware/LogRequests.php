<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogRequests
{
    public function handle(Request $request, Closure $next)
    {
        $path = ltrim($request->path(), '/');
        if (in_array($path, ['sanctum/csrf-cookie', 'login', 'logout', 'api/me'])) {
            Log::info('Incoming request', [
                'method' => $request->method(),
                'path' => $request->path(),
                'ip' => $request->ip(),
                'origin' => $request->headers->get('origin'),
                'referer' => $request->headers->get('referer'),
                'cookies' => array_keys($request->cookies->all()),
                'has_x_xsrf_token' => $request->headers->has('x-xsrf-token'),
                'content_type' => $request->headers->get('content-type'),
            ]);
        }

        $response = $next($request);

        if (in_array($path, ['sanctum/csrf-cookie', 'login', 'logout', 'api/me'])) {
            Log::info('Outgoing response', [
                'method' => $request->method(),
                'path' => $request->path(),
                'status' => $response->getStatusCode(),
            ]);
        }

        return $response;
    }
}


