<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document\Document;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\NoteStoreRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\DocumentCollection;

class DocumentsController extends Controller
{
    public function index()
    {
        return Inertia::render('Documents/Index', [
            'filters' => Request::all('search'),
            'documents' => new DocumentCollection(
                Auth::user()->documents()
                    ->with('group')
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

    public function destroy(Document $note)
    {
        return Redirect::back()->with('success', 'Document deleted.');
    }
}
