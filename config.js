const env = process.env;

export const nodeEnv = env.NODE_ENV || "development";

export const cLog = function (message) {
    console.log("// -------------------- //");
    console.log(message);
    console.log("// -------------------- //");
};

export default {
    port: env.PORT || 4000
};