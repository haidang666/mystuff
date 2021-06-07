<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document\Group;
use App\Models\Document\Document;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\Http\Resources\DocumentResource;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\DocumentCollection;
use App\Http\Resources\DocumentGroupCollection;
use App\Http\Resources\DocumentPageCollection;
use App\Http\Requests\Document\DocumentStoreRequest;
use App\Http\Requests\Document\DocumentUpdateRequest;
use App\Models\Document\Page;

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

    public function edit(Document $document)
    {
        return Inertia::render('Documents/Edit', [
            'document' => new DocumentResource($document),
            'groups' => new DocumentGroupCollection(Auth::user()->documentGroups()->get()),
            'pages' => new DocumentPageCollection($document->pages()->orderBy('position')->get()),
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

    public function update(Document $document, DocumentUpdateRequest $request)
    {
        $document->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Document updated.');
    }
}
