<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert clients
        // DB::table('clients')->insert([
        //     'id' => fake()->uuid(),
        //     'name' => fake()->name(),
        //     'cif' => Str::random(10),
        //     'address' => fake()->address(),
        //     'email' => fake()->email(),
        //     'contact_name' => fake()->name(),
        //     'contact_phone' => fake()->phoneNumber(),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        // Client::factory()->times(20)->create();

        for ($i = 0; $i < 100; $i++) {
            $clients = [];
            for ($j = 0; $j < 10; $j++) {
                $clients[] = [
                    'id' => fake()->uuid(),
                    'name' => fake()->name(),
                    'cif' => Str::random(10),
                    'address' => fake()->address(),
                    'phone' => fake()->phoneNumber(),
                    'email' => fake()->email(),
                    'contact_name' => fake()->name(),
                    'contact_phone' => fake()->phoneNumber(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            DB::table('clients')->insert($clients);
        }
    }
}
