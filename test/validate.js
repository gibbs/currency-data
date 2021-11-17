#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const csval = require('csval')
const { XMLParser } = require('fast-xml-parser')

// Validate CSV
const csvPath = path.resolve(__dirname, '../dist/currencies.csv')
const csvData = fs.readFileSync(csvPath, 'UTF-8')

csval.parseCsv(csvData)

// Validate JSON
const jsonPath = path.resolve(__dirname, '../dist/currencies.json')
const jsonData = fs.readFileSync(jsonPath, 'UTF-8')

JSON.parse(jsonData)

// Validate XML
const xmlPath = path.resolve(__dirname, '../dist/currencies.xml')
const xmlData = fs.readFileSync(xmlPath, 'UTF-8')

const xmlParsed = new XMLParser().parse(xmlData)

if (typeof xmlParsed === 'undefined' || Object.keys(xmlParsed).length <= 0) {
  throw new Error('Failed to parse currencies.xml')
}
