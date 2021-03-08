<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;
use App\Http\Resources\NoteCollection;

class NoteController extends Controller
{
    public function index()
    {
        return Inertia::render('Notes/Index', [
            'filters' => Request::all('search'),
            'notes' => new NoteCollection(
                Note::orderBy('created_at', 'desc')
                ->paginate()
            ),
        ]);
    }
}
