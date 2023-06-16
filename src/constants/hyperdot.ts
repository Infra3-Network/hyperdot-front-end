export const CURRENT_API_VERSION = "v1";

export const hyperdotVersionApis =  {
   "v1" : {
    "system": {
        "dataengines": "/apis/v1/system/dataengines"
    },
    "dataengine": {
        "scheme": {
            "postgres": {
                "polkadot": "/apis/v1/dataengine/scheme/postgres/polkadot"
            }
        } 
    }
   }
}

export const hyperdotApis = hyperdotVersionApis[CURRENT_API_VERSION]