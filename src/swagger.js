const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/openapi.yaml'));

module.exports = swaggerDocument;