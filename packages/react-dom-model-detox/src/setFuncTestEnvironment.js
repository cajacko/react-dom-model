module.exports = (isFuncTestEnv) => {
    if (!isFuncTestEnv) return;

    require('./setDebugger')(true);
}