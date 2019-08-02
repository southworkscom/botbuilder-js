/**
 * @module botbuilder-ai
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * NOTE: This class was auto generated by OpenAPI Generator (https://openapi-generator.tech)
 * and was modify manually to make compliance with the current implementation of the library.
 */

import { CompositeChildModel } from './compositeChildModel';

export interface CompositeEntityModel {
    /**
    * Type/name of parent entity.
    */
    parentType: string;
    /**
    * Value for composite entity extracted by LUIS.
    */
    value: string;
    /**
    * Child entities.
    */
    children: Array<CompositeChildModel>;
}

export class CompositeEntityModel {
    /**
    * Type/name of parent entity.
    */
    'parentType': string;
    /**
    * Value for composite entity extracted by LUIS.
    */
    'value': string;
    /**
    * Child entities.
    */
    'children': Array<CompositeChildModel>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            'name': 'parentType',
            'baseName': 'parentType',
            'type': 'string'
        },
        {
            'name': 'value',
            'baseName': 'value',
            'type': 'string'
        },
        {
            'name': 'children',
            'baseName': 'children',
            'type': 'Array<CompositeChildModel>'
        }    ];

    static getAttributeTypeMap() {
        return CompositeEntityModel.attributeTypeMap;
    }
}
