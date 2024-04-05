exports.testingMethod = async () => {
    try {
        return null;
    } catch (error) {
        console.error('Testing Error:', error);
        throw new Error('Testing Error');
    }
};