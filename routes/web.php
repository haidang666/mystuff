<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth
Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');

// Users
Route::middleware(['auth'])->prefix('users')->group(function () {
    Route::get('')->name('users')->uses('UsersController@index')->middleware('remember');
    Route::post('')->name('users.store')->uses('UsersController@store');
    Route::get('create')->name('users.create')->uses('UsersController@create');
    Route::get('{user}/edit')->name('users.edit')->uses('UsersController@edit');
    Route::put('{user}')->name('users.update')->uses('UsersController@update');
    Route::delete('{user}')->name('users.destroy')->uses('UsersController@destroy');
    Route::put('{user}/restore')->name('users.restore')->uses('UsersController@restore');
});

// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// Organizations
Route::middleware(['auth'])->prefix('organizations')->group(function () {
    Route::get('')->name('organizations')->uses('OrganizationsController@index')->middleware('remember');
    Route::post('')->name('organizations.store')->uses('OrganizationsController@store');
    Route::get('create')->name('organizations.create')->uses('OrganizationsController@create');
    Route::get('{organization}/edit')->name('organizations.edit')->uses('OrganizationsController@edit');
    Route::put('{organization}')->name('organizations.update')->uses('OrganizationsController@update');
    Route::delete('{organization}')->name('organizations.destroy')->uses('OrganizationsController@destroy');
    Route::put('{organization}/restore')->name('organizations.restore')->uses('OrganizationsController@restore');
});

// Contacts
Route::middleware(['auth'])->prefix('contacts')->group(function () {
    Route::get('')->name('contacts')->uses('ContactController@index')->middleware('remember');
    Route::post('')->name('contacts.store')->uses('ContactController@store');
    Route::get('create')->name('contacts.create')->uses('ContactController@create');
    Route::get('{contact}/edit')->name('contacts.edit')->uses('ContactController@edit');
    Route::put('{contact}')->name('contacts.update')->uses('ContactController@update');
    Route::delete('{contact}')->name('contacts.destroy')->uses('ContactController@destroy');
    Route::put('{contact}/restore')->name('contacts.restore')->uses('ContactController@restore');
});

// Notes
Route::middleware(['auth'])->prefix('notes')->name('notes.')->group(function () {
    Route::get('')->name('index')->uses('NoteController@index')->middleware('remember');
    Route::get('create')->name('create')->uses('NoteController@create');
    Route::post('')->name('store')->uses('NoteController@store');
    Route::delete('{note}')->name('destroy')->uses('NoteController@destroy');
});

// Documents
Route::middleware(['auth'])->prefix('documents')->name('documents.')->namespace('Document')->group(function () {
    Route::get('')->name('index')->uses('DocumentController@index')->middleware('remember');
    Route::get('create')->name('create')->uses('DocumentController@create');
    Route::post('')->name('store')->uses('DocumentController@store');
    Route::delete('{note}')->name('destroy')->uses('DocumentController@destroy');
    Route::get('{document}/show')->name('show')->uses('DocumentController@show');
    Route::put('{document}')->name('update')->uses('DocumentController@update');

    // Group
    Route::prefix('groups')->name('groups.')->group(function () {
        Route::get('')->name('index')->uses('GroupController@index')->middleware('remember');
        Route::post('')->name('store')->uses('GroupController@store');
        Route::put('{group}')->name('update')->uses('GroupController@update');
        Route::delete('{group}')->name('destroy')->uses('GroupController@destroy');
    });

    // Page
    Route::prefix('{document}/pages')->name('pages.')->group(function () {
        Route::post('')->name('store')->uses('PageController@store');
    });
});

// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    throw new Exception('server internal error');
});
