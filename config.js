const nodeEnv = process.env.NODE_ENV || "DEV";
const PORT = process.env.PORT || 4000;

const cLog = function (message) {
    console.log(`// -------------------- //
                ${message}
// -------------------- //
`);
};

export default { nodeEnv, PORT, cLog };