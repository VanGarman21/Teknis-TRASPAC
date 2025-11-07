<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function csrf(Request $request)
    {
        Log::info('CSRF endpoint hit', [
            'ip' => $request->ip(),
            'cookies' => array_keys($request->cookies->all()),
            'origin' => $request->headers->get('origin'),
            'referer' => $request->headers->get('referer'),
        ]);
        return response()->noContent();
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        Log::info('Login attempt', [
            'username' => $credentials['username'] ?? null,
            'has_x_xsrf_token' => $request->headers->has('x-xsrf-token'),
            'session_id' => $request->session()->getId(),
            'origin' => $request->headers->get('origin'),
            'referer' => $request->headers->get('referer'),
        ]);

        if (!Auth::attempt($credentials)) {
            Log::warning('Login failed: invalid credentials', [
                'username' => $credentials['username'] ?? null,
                'cookies' => array_keys($request->cookies->all()),
            ]);
            throw ValidationException::withMessages(['username' => ['Invalid credentials']]);
        }

        $request->session()->regenerate();
        Log::info('Login success', [
            'user_id' => Auth::id(),
            'session_id' => $request->session()->getId(),
        ]);
        return response()->json(['user' => Auth::user()]);
    }

    public function me(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

    public function logout(Request $request)
    {
        Log::info('Logout called', [
            'user_id' => Auth::id(),
            'session_id' => $request->session()->getId(),
        ]);
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }
}


