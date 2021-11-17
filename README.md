# Currency Data

![Test](https://github.com/gibbs/currency-data/actions/workflows/tests.yml/badge.svg)

English language currency datasets in CSV, JSON, PHP, XML and YAML formats. See
the `dist` directory for data.

## Data

All currency data is maintained in an easy to read and parse format (YAML) 
under `data/currencies.yaml`. The data here is authoritative for this dataset
and used to generate data in other formats.

## Schema

| Key   | Description |
|-------|-------------|
| title | The currency title. More formal (e.g. Pound Sterling, United States Dollar) |
| name  | Shorter currency name used in common parlance (e.g. pound, dollar) |
| code  | The ISO 4217 currency code (e.g. GBP, USD) |

## License

[CC0 v1.0 Universal](https://github.com/gibbs/currency-data/blob/master/LICENSE)

## Sources

Data has primarily been sourced from and referenced against
[ISO 4217](https://www.iso.org/iso-4217-currency-codes.html).
