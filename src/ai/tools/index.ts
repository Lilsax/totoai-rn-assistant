import type { FunctionDeclarationsTool } from '@react-native-firebase/ai';
import { Schema, SchemaType } from '@react-native-firebase/ai';
import { PINECONE_API_KEY, PINECONE_HOST } from '../../config/env';
import components from '../data/components.json';
import endpoints from '../data/endpoints.json';
import navigation from '../data/navigation.json';
import { apiService } from '../../services/apiService';
import type { CreditCardData, DashboardData, Notification, Transaction, UserProfile } from '../../types';
import { getEmbedding } from '../../utils';

export const fileReadingTools: FunctionDeclarationsTool = {
    functionDeclarations: [
        {
            name: 'readComponentsFile',
            description: 'Read the components.json file to get available React components and their props when JSX rendering is needed',
            parameters: {
                properties: {
                    reason: Schema.string({
                        description: "Why you need to read the components file (e.g., 'Need to render account balance component')",
                    }),
                },
                type: SchemaType.OBJECT,
            },
        },
        {
            name: 'readApiEndpointsFile',
            description: 'Read the api-endpoints.json file to get available API functions when data fetching is needed',
            parameters: {
                properties: {
                    reason: Schema.string({
                        description: "Why you need to read the API file (e.g., 'Need to fetch user account data')",
                    }),
                },
                type: SchemaType.OBJECT,
            },
        },
        {
            name: 'readNavigationFile',
            description: 'Read the navigation.json file to get available app navigation routes when routing is needed',
            parameters: {
                properties: {
                    reason: Schema.string({
                        description: "Why you need to read navigation file (e.g., 'Need to navigate to transfer page')",
                    }),
                },
                type: SchemaType.OBJECT,
            },
        },
        {
            name: 'getQueryData',
            description: 'Fetch actual data from a specific API endpoint by providing the query/endpoint name. Use this tool when you need to retrieve real data from the backend API services. This tool executes the actual API call and returns the data that can be used for responses or passed as props to components.',
            parameters: {
                properties: {
                    query: Schema.string({
                        description: "The exact name of the API endpoint/query to call (e.g., 'getUserAccounts', 'getTransactionHistory', 'getCardDetails'). This should match the function name available in the apiService.",
                    }),
                },
                type: SchemaType.OBJECT,
                required: ['query'],
            },
        },
        {
            name: 'queryVectorDB',
            description: 'Fetch relevant information from the vector database based on the user\'s text query. Use the retrieved data to directly solve the user\'s query and provide a clear and accurate answer, covering banking policies, financial guidelines, or general knowledge topics.',
            parameters: {
                properties: {
                    query: Schema.string({
                        description: "Use the exact text query provided by the user to search the vector database. The tool will return the most relevant text chunks based on semantic similarity, covering banking, finance, or general knowledge topics.",
                    }),
                },
                type: SchemaType.OBJECT,
                required: ['query'],
            },
        }
    ],
};


export const tools = {
    readComponentsFile: ({ reason }: { reason: string }): string => {
        console.log(`Reading components file because: ${reason}`);

        return JSON.stringify(components, null, 2);
    },
    readApiEndpointsFile: ({ reason }: { reason: string }): string => {
        console.log(`Reading API endpoints because: ${reason}`);

        return JSON.stringify(endpoints, null, 2);
    },
    readNavigationFile: ({ reason }: { reason: string }): string => {
        console.log(`Reading navigation file because: ${reason}`);

        return JSON.stringify(navigation, null, 2);
    },
    getQueryData: async ({
        query,
    }: {
        query: keyof typeof apiService
    }): Promise<
        DashboardData | UserProfile | CreditCardData[] | Transaction[] | Notification[]
    > => {
        try {
            const method = apiService[query];

            if (typeof method !== 'function') {
                throw new Error(`"${query}" is not a function`);
            }

            const data = await method();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    queryVectorDB: async ({query}: {query: string}) => {
        try {
            console.log("query", query)
            const embedding = await getEmbedding(query);

            console.log('Embedding:', embedding);

            const response = await fetch(PINECONE_HOST, {
                method: "POST",
                headers: {
                    "Api-Key": PINECONE_API_KEY,
                    "Content-Type": "application/json",
                    "X-Pinecone-API-Version": "2025-04",
                },
                body: JSON.stringify({
                    vector: embedding,
                    topK: 3,
                    namespace: "default-namespace-1",
                    includeMetadata: true,
                    includeValues: true
                }),
            });

            const results = await response.json();
            const arrMatches = results.matches.map((match: { metadata: { chunk_text: string; }; }) => match?.metadata?.chunk_text);
            console.log("arrMatches", arrMatches)
            return arrMatches;
        } catch (error) {
            console.error('Error querying vector DB:', error)
        }
    }
};
