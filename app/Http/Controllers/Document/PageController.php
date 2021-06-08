<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class PageController extends Controller
{
    public function store(Request $request)
    {
        // Auth::user()->documentGroups()->create(
        //     $request->validated()
        // );

        return Redirect::route('documents.groups')->with('success', 'Group created.');
    }
}
