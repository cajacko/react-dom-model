exports.setFuncTestEnvironment = (isFuncTestEnv) => {
    if (!isFuncTestEnv) return;

    require('./setDebugger')(true);
}