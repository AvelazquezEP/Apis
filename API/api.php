<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Models\Blog;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// GET POST (ALL)
Route::get('/blogs', [BlogController::class, 'index']);
// GET POST BY ID
Route::get('/blog/{id}', [BlogController::class, 'getPost']);
// CREATE
Route::post('/blog/create', [BlogController::class, 'store']);
// UPDATE
Route::put('/blog/update/{blog}', [BlogController::class, 'updatePost']);
// DELETE BY ID
Route::delete('/blog/remove/{blog}', [BlogController::class, 'destroy']);
