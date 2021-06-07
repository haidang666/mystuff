<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\User;
use Faker\Generator;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Organization;
use App\Models\Document\Page;
use Illuminate\Database\Seeder;
use App\Models\Document\Document;
use Illuminate\Container\Container;
use App\Models\Document\Group as DocumentGroup;

class DatabaseSeeder extends Seeder
{
    /**
     * @var \Faker\Generator
     */
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

        $user = User::factory()->create([
            'account_id' => $account->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'owner' => true,
        ]);

        $organizations = Organization::factory()->count(100)->create([
            'account_id' => $account->id,
        ]);

        Contact::factory()->count(100)->create([
            'account_id' => $account->id,
        ])->each(function (Contact $contact) use ($organizations) {
            $contact->update(['organization_id' => $organizations->random()->id]);
        });

        Note::factory()->count(5)->create([
            'user_id' => $user->id,
        ]);

        Note::factory()->count(2)->create([
            'deleted_at' => $this->faker->dateTimeBetween(),
            'user_id' => $user->id,
        ]);

        $this->seedDocuments($user);
    }

    public function seedDocuments(User $user)
    {
        DocumentGroup::factory()->count(2)->create([
            'user_id' => $user->id,
        ]);

        Document::factory()->count(2)->create([
            'group_id' => 1,
            'user_id' => $user->id,
        ]);

        Page::factory()->create([
            'document_id' => 1,
            'position' => 0,
            'photo_url' => 'https://lorempixel.com/800/800/cats/0',
        ]);

        Page::factory()->create([
            'document_id' => 1,
            'position' => 1,
            'photo_url' => 'https://lorempixel.com/800/800/cats/1',
        ]);
    }
}
