<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\NoteCollection;
use App\Http\Requests\NoteStoreRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class NoteController extends Controller
{
    public function index()
    {
        return Inertia::render('Notes/Index', [
            'filters' => Request::all('search', 'trashed'),
            'notes' => new NoteCollection(
                Auth::user()->notes()
                    ->orderBy('created_at', 'desc')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
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
