const Sequelize = require('sequelize')

module.exports = (app, sequelize) => { 
    const PageLoads = sequelize.define('page_loads', {
        userAgent: Sequelize.STRING,
        time: Sequelize.DATE
    });

    app.post('/', async (req, res) => {
        // get the user agent and current time
        const userAgent = req.body.soylamapa;
        const time = new Date().getTime();
    
        try {
            // insert the record
            await PageLoads.create({
                userAgent, time
            });
    
            // send response 
            res.send('Inserted!');
        } catch (e) {
            console.log('Error inserting data', e)
        }
    })
    
    app.get('/', async (req, res) => {
        try {
            // now display everything in the table
            const messages = await PageLoads.findAll();
            res.send(messages);
        } catch (e) {
            console.log('Error inserting data', e)
        }
    })
}