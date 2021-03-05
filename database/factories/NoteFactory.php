<?php

namespace Database\Factories;

use App\Models\Note;
use Illuminate\Database\Eloquent\Factories\Factory;

class NoteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Note::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $timestamp = $this->faker->dateTimeBetween('-30days', 'now');

        return [
            'content' => $this->faker->paragraph,
            'is_marked' => $this->faker->boolean,
            'created_at' => $timestamp,
        ];
    }
}
