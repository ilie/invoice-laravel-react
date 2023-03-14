<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'cif' => Str::random(10),
            'address' => fake()->address(),
            'email' => fake()->unique()->safeEmail(),
            'contact_name' => fake()->name(),
            'contact_phone' => fake()->phoneNumber(),
        ];
    }
}
