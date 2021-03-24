<?php

namespace App\Http\Controllers;

use App\Http\Resources\NoteCollection;
use App\Models\Note;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class NotesController extends Controller
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

    public function create()
    {
        return Inertia::render('Notes/Create', []);
    }
}
