const env = process.env;
const mongo = "CLOUD";
let mongoURL;

mongo === "CLOUD" ?
    mongoURL = "mongodb+srv://admin:Passw0rd@react.rq9gj.mongodb.net/test?retryWrites=true&w=majority"
    : mongoURL = "mongodb://localhost:27017/fullstack";

export default {
    mongodbUri: mongoURL,
    NODE_ENV: env.NODE_ENV || "DEV",
    PORT: env.PORT || 3000,
    HOST: env.HOST || "0.0.0.0",
    get serverUrl() {
        return `http://${this.HOST}:${this.PORT}`;
    }
};

// Alternative method below:
// const NODE_ENV = env.NODE_ENV || "DEV";
// const PORT = env.PORT || 4000;
// const HOST = env.HOST || "0.0.0.0";

// export default { NODE_ENV, PORT, HOST };