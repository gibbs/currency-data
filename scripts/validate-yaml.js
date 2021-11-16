#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const validate = require('yaml-schema-validator')
const yaml = require('js-yaml')

const dataPath = path.resolve(__dirname, '../data/currencies.yaml')
const schemaPath = path.resolve(__dirname, '../data/currencies.schema.yaml')
const data = yaml.load(fs.readFileSync(dataPath, 'UTF-8'))

let validSchema = true

// Traverse currencies object
Object.keys(data.currency).forEach((code) => {

  // Validate individual currency objects
  let validation = validate(data.currency[code], {
    schemaPath: schemaPath,
    logLevel: 'warn'
  })

  // Persist valid flag
  if (Object.keys(validation).length > 0) {
    validSchema = false
  }
})

// Return a generic exit code
process.exit(validSchema ? 0 : 1)
