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
    Route::get('')->name('contacts')->uses('ContactsController@index')->middleware('remember');
    Route::post('')->name('contacts.store')->uses('ContactsController@store');
    Route::get('create')->name('contacts.create')->uses('ContactsController@create');
    Route::get('{contact}/edit')->name('contacts.edit')->uses('ContactsController@edit');
    Route::put('{contact}')->name('contacts.update')->uses('ContactsController@update');
    Route::delete('{contact}')->name('contacts.destroy')->uses('ContactsController@destroy');
    Route::put('{contact}/restore')->name('contacts.restore')->uses('ContactsController@restore');
});

// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    throw new Exception('server internal error');
});
