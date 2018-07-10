let timeout = 500;

exports.get = () => timeout;

exports.set = (newTimeout) => {
    timeout = newTimeout;
}