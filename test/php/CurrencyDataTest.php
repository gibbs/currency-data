<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class CurrencyDataTest extends TestCase
{
  private $fixture;

  public function setUp(): void
  {
    $this->fixture = require_once __DIR__ . '/../../dist/currencies.php';
  }

  public function testArrayFixture(): void
  {
    // Get the array
    $data = $this->fixture;

    // Test against some major currencies
    $test_currencies = ['GBP', 'USD', 'JPY'];

    // Assert the type
    $this->assertIsArray($data);
    $this->assertIsIterable($data);

    foreach ($test_currencies as $currency_code) {
      $this->assertArrayHasKey($currency_code, $data);

      // Additional assertions - schema is already validated so unnecessary
      foreach (['title', 'name'] as $attribute) {
        $this->assertArrayHasKey($attribute, $data[$currency_code]);
        $this->assertIsString($data[$currency_code][$attribute]);
      }
    }
  }
}
