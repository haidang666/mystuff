<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\User;
use Faker\Generator;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Organization;
use Illuminate\Database\Seeder;
use Illuminate\Container\Container;

class DatabaseSeeder extends Seeder
{
    protected $faker;

    public function __construct()
    {
        $this->faker = $this->withFaker();
    }

    protected function withFaker()
    {
        return Container::getInstance()->make(Generator::class);
    }

    public function run()
    {
        $account = Account::create(['name' => 'Acme Corporation']);

        User::factory()->create([
            'account_id' => $account->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'owner' => true,
        ]);

        if (app()->environment('testing')) {
            User::factory()->count(5)->create([
                'account_id' => $account->id,
            ]);

            $organizations = Organization::factory()->count(100)->create([
                'account_id' => $account->id,
            ]);

            Contact::factory()->count(100)->create([
                'account_id' => $account->id,
            ])
                ->each(function (Contact $contact) use ($organizations) {
                    $contact->update(['organization_id' => $organizations->random()->id]);
                });
        }

        Note::factory()->count(5)->create();
        Note::factory()->count(2)->create([
            'deleted_at' => $this->faker->dateTimeBetween(),
        ]);
    }
}
