<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia;
// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response
            ->assertStatus(200)
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('Welcome')
                ->where('appName', config('app.name'))
                ->has('laravelVersion')
                ->has('phpVersion')
            );
    }
}
