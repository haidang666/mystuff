<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteStoreRequest;
use App\Http\Resources\NoteCollection;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class NotesController extends Controller
{
    public function index()
    {
        return Inertia::render('Notes/Index', [
            'filters' => Request::all('search'),
            'notes' => new NoteCollection(
                Auth::user()->notes()
                    ->orderBy('created_at', 'desc')
                    ->paginate()
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Notes/Create', []);
    }

    public function store(NoteStoreRequest $request)
    {
        Auth::user()->notes()->create(
            $request->validated()
        );

        return Redirect::route('notes')->with('success', 'Note created.');
    }

    public function destroy(Note $note)
    {
        $note->delete();

        return Redirect::back()->with('success', 'Note deleted.');
    }
}
