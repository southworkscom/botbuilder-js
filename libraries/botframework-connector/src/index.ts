const env = (new Function('return (global || window);'))();

if (!env.hasOwnProperty("FormData")) {
    env.FormData = require('form-data');
};

if (!env.hasOwnProperty("fetch")) {
    env.fetch = require('node-fetch');
}

import { TokenResponse } from './connectorApi/models/mappers';

/**
 * @module botbuilder
 */
export * from './auth';
export { ConnectorClient } from './connectorApi/connectorClient';
export { TokenApiClient, TokenApiModels } from './tokenApi/tokenApiClient';
export { EmulatorApiClient } from './emulatorApiClient';
export * from './tokenApi/models'
