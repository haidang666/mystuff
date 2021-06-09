<?php

namespace App\Http\Controllers\Document;

use Inertia\Inertia;
use App\Models\Document\Group;
use App\Models\Document\Document;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\Document\GroupCollection;
use App\Http\Requests\Document\GroupStoreRequest;
use App\Http\Requests\Document\GroupUpdateRequest;

class GroupController extends Controller
{
    public function index()
    {
        return Inertia::render('DocumentGroups/Index', [
            'filters' => Request::all('search'),
            'groups' => new GroupCollection(
                Auth::user()->documentGroups()
                    ->orderBy('created_at', 'desc')
                    ->paginate()
            ),
        ]);
    }

    public function store(GroupStoreRequest $request)
    {
        Auth::user()->documentGroups()->create(
            $request->validated()
        );

        return Redirect::route('documents.groups.index')->with('success', 'Group created.');
    }

    public function destroy(Document $note)
    {
        return Redirect::back()->with('success', 'Document deleted.');
    }

    public function update(Group $group, GroupUpdateRequest $request)
    {
        $group->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Document group updated.');
    }
}
