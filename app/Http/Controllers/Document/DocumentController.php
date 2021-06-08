<?php

namespace App\Http\Controllers\Document;

use Inertia\Inertia;
use App\Models\Document\Group;
use App\Models\Document\Document;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\Document\PageCollection;
use App\Http\Resources\Document\GroupCollection;
use App\Http\Resources\Document\DocumentResource;
use App\Http\Resources\Document\DocumentCollection;
use App\Http\Requests\Document\DocumentStoreRequest;
use App\Http\Requests\Document\DocumentUpdateRequest;

class DocumentController extends Controller
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
            'groups' => new GroupCollection(Group::all()),
        ]);
    }

    public function edit(Document $document)
    {
        return Inertia::render('Documents/Edit', [
            'document' => new DocumentResource($document),
            'groups' => new GroupCollection(Auth::user()->documentGroups()->get()),
            'pages' => new PageCollection($document->pages()->orderBy('position')->get()),
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
