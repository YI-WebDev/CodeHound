type FunctionParameter = {
    name: string;
    description: string;
    required: boolean;
}

export interface FunctionResult {
    name: string;
    description: string;
    syntax: string;
    parameters?: FunctionParameter[];
    returnValue?: string;
    example: string;
    alternatives?: string[];
    category: string;
}

export interface SearchResponse {
    functions: FunctionResult[];
} 