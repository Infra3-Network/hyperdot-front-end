export const CURRENT_API_VERSION = "v1";

export const hyperdotVersionApis = {
    "v1": {
        "system": {
            "dataengines": "/apis/v1/system/dataengines"
        },
        "dataengine": {
            "scheme": {
                "Postgres": "/apis/v1/dataengine/scheme/postgres",
            }
        },
        "query": {
            "run": {
                'postgres': {
                    url: '/apis/v1/query/run/postgres',
                    method: 'POST',
                }
            }
        }
    }
}

export const hyperdotApis = hyperdotVersionApis[CURRENT_API_VERSION]