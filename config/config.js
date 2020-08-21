const env = process.env;

export default {
    mongodbUri: "mongodb://localhost:27017/fullstack",
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