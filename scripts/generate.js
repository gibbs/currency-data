#!/usr/bin/env node
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const ObjectsToCsv = require('objects-to-csv')
const objectToXml = require('object-to-xml')

// Load the currency data
const currencyDataPath = path.resolve(__dirname, '../data/currencies.yaml')
const currencyData = yaml.load(fs.readFileSync(currencyDataPath, 'UTF-8'))

/**
 * Write Path
 *
 * @param {string} filename
 * @returns {string}
 */
function writePath (filename) {
  return path.resolve(__dirname, '../dist/', filename)
}

// Write CSV
new ObjectsToCsv(Object.values(currencyData.currency)).toDisk(writePath('currencies.csv'))

// Write JSON
fs.writeFileSync(writePath('currencies.json'), JSON.stringify(currencyData.currency, null, 2))

// Write PHP
ejs.renderFile(path.resolve(__dirname, 'templates/php-full.ejs'), { data: currencyData }, (error, content) => {
  if (!error) {
    fs.writeFileSync(writePath('currencies.php'), content)
  }
})

// Write XML
const xmlObj = {
  '?xml version="1.0" encoding="UTF-8"?': null,
  currencies: {
    '#': {
      currency: []
    }
  }
}

Object.keys(currencyData.currency).forEach((code, index) => {
  xmlObj.currencies['#'].currency.push({
    '@': {
      code: code
    },
    '#': currencyData.currency[code]
  })
})

const xml = objectToXml(xmlObj)
fs.writeFileSync(writePath('currencies.xml'), xml)

// Write Markdown
ejs.renderFile(path.resolve(__dirname, 'templates/markdown-full.ejs'), { data: currencyData }, (error, content) => {
  if (!error) {
    fs.writeFileSync(writePath('currencies.md'), content)
  }
})
