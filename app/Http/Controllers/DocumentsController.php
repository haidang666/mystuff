<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document\Group;
use App\Models\Document\Document;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\DocumentCollection;
use App\Http\Resources\DocumentGroupCollection;
use App\Http\Requests\Document\DocumentStoreRequest;

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
        return Inertia::render('Documents/Create', [
            'groups' => new DocumentGroupCollection(Group::all()),
        ]);
    }

    public function store(DocumentStoreRequest $request)
    {
        Auth::user()->documents()->create(
            $request->validated()
        );

        return Redirect::route('documents')->with('success', 'Document created.');
    }

    public function destroy(Document $note)
    {
        return Redirect::back()->with('success', 'Document deleted.');
    }
}
