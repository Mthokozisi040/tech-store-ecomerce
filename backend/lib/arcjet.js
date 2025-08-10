import arcjet, {tokenBucket, shield, detectBot} from "../lib/arcjet.js";

import "dotenv/config";

//initialize arcjet
const arcjetInstance = arcjet({
    processId: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules:[
        //shield protects your app from commonattacks e.g sql injection, xss, etc.
        shield({mode: "LIVE"}),
        detectBot({
            mode: "LIVE",
            allow:["CATEGORY:SEARCH_ENGINE"]
        }), //rate limit requests

        tokenBucket({
            mode: "LIVE",
            refillRate: 5, //requests per second
            interval: 10,
            capacity: 10, //maximum burst size  
        }),
    ],
});