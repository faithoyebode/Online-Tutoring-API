exports.notFound = (req, res) => {
    res.status(404).send('Endpoint not found');
    
}