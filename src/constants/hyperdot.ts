export const CURRENT_API_VERSION = "v1";

export const hyperdotVersionApis = {
    "v1": {
        "query": {
            "engines": {
                'postgres': {
                    url: '/apis/v1/query/run/postgres',
                    method: 'POST',
                }
            }
        }
    }
}

export const hyperdotApis = hyperdotVersionApis[CURRENT_API_VERSION]