import OpenAI from 'openai';
import { SPREADS } from './tarot/spreads';
import { SpreadKey } from './tarot/types';

export const openaiClient = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

const SPREAD_KEY_ENUM = SPREADS.map(spread => spread.key) as SpreadKey[];

export const RECOMMEND_SPREADS_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: ['recommendations'],
    properties: {
        recommendations: {
            type: 'array',
            minItems: 2,
            maxItem: 2,
            items: {
                type: 'object',
                additionalProperties: false,
                required: ['key', 'reason'],
                properties: {
                    key: {
                        type: 'string',
                        enum: SPREAD_KEY_ENUM
                    },
                    reason: {
                        type: 'string'
                    }
                }
            }
        }
    }
};