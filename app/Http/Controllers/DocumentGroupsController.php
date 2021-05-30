<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document\Group;
use App\Models\Document\Document;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\DocumentGroupCollection;
use App\Http\Requests\Document\DocumentGroupStoreRequest;
use App\Http\Requests\Document\DocumentGroupUpdateRequest;

class DocumentGroupsController extends Controller
{
    public function index()
    {
        return Inertia::render('DocumentGroups/Index', [
            'filters' => Request::all('search'),
            'groups' => new DocumentGroupCollection(
                Auth::user()->documentGroups()
                    ->orderBy('created_at', 'desc')
                    ->paginate()
            ),
        ]);
    }

    public function store(DocumentGroupStoreRequest $request)
    {
        Auth::user()->documentGroups()->create(
            $request->validated()
        );

        return Redirect::route('documents.groups')->with('success', 'Group created.');
    }

    public function destroy(Document $note)
    {
        return Redirect::back()->with('success', 'Document deleted.');
    }

    public function update(Group $group, DocumentGroupUpdateRequest $request)
    {
        $group->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Document group updated.');
    }
}
