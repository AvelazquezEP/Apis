<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Blogs = Blog::get();

        $subset = $Blogs->map(function ($blog) {
            return collect($blog->toArray())
                ->only(['id', 'title', 'body', 'created_at', 'updated_at'])
                ->all();
        });

        return [
            // 'Data' => Blog::all(),
            'Data' => $subset,
        ];
    }

    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\Response
     */
    public function getPost($id)
    {
        $blog = Blog::where('id', $id)->first();

        if (!$blog == null) {
            return [
                'Post' => $blog,
            ];
        }

        return [
            'Post' => "No hay ningun post",
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        request()->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        // $createPost = Blog::create([
        //     "title" => request('title'),
        //     "body" => request('body'),
        // ]);

        return Blog::create([
            "title" => request('title'),
            "body" => request('body'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Blog $blog
     */
    public function updatePost($id)
    {
        request()->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        // $post = Blog::where('id', $id)->update([
        //     'title' => request('title'),
        //     'body' => request('body'),
        // ]);
        $post = Blog::find($id);
        $post->title = request('title');
        $post->save();

        return [
            'Update' => $post,
        ];
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param \App\Models\Blog
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $blog = Blog::where('id', $id)->first();

        if (!$blog == false) {
            return [
                'success' => $blog->delete(),
            ];
        }

        return [
            'success' => "No se puede eliminar este Post",
        ];
    }
}
