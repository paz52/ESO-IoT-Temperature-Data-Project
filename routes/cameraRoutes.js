const Sequelize = require('sequelize')

module.exports = (app, sequelize) => { 
    const Camera = sequelize.define('Cameras', {
        model: Sequelize.STRING,
        configurations: Sequelize.STRING,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE
    });

    app.post('/camera', async (req, res) => {
        const model = req.body.model;
        const configurations = req.body.configurations;
        const startDate = new Date().getTime();
        const endDate = null; //initially, the end date is unknown

        try {
            // insert the record
            await Camera.create({
                model, configurations, startDate, endDate
            });
            // send response 
            res.send('New Camera Inserted!');
        } catch (e) {
            re.send('Error inserting camera', e)
        }
    })

    app.put('/camera/id/:id', async (req, res) => {
        try {
            const oldCamera = await Camera.findOne({ where: { id: req.params.id } });
            if (oldCamera === null) {
                res.send('Camera Not found!');
            } else {
                if (req.body.model != null ) oldCamera.model = req.body.model;
                if (req.body.configurations != null ) oldCamera.configurations = req.body.configurations;
                if (req.body.startDate != null ) oldCamera.startDate = req.body.startDate;
                if (req.body.endDate != null ) oldCamera.endDate = req.body.endDate;

                await oldCamera.save();
                res.send('Camera Updated!');
            }
    
        } catch (e) {
            re.send('Error updating camera', e)
        }
    })

    app.put('/camera/id/autoEndDate/:id', async (req, res) => {
        const endtDate = new Date().getTime();
        try {
            const oldCamera = await Camera.findOne({ where: { id: req.params.id } });
            if (oldCamera === null) {
                res.send('Camera Not found!');
            } else {
                oldCamera.endDate = endtDate;

                await oldCamera.save();
                res.send('End Date Updated!');
            }
        } catch (e) {
            re.send('Error updating camera', e)
        }
    })
    
    app.get('/camera', async (req, res) => {
        try {
            // now display everything in the table
            const cameras = await Camera.findAll();
            res.send(cameras);
        } catch (e) {
            console.log('Error displaying cameras', e)
        }
    })

    app.get('/camera/id/:id', async (req, res) => {
        try {
            const camera = await Camera.findOne({ where: { id: req.params.id } });
            if (camera === null) {
                res.status(404).send('Camera Not found!');
            } else {
                res.send(camera);
            }
        } catch (e) {
            re.send('Error displaying camera', e)
        }
    })

    app.delete('/camera/id/:id', async (req, res) => {
        try {
            const oldCamera = await Camera.findOne({ where: { id: req.params.id } });
            if (oldCamera === null) {
                res.send('Camera Not found!');
            } else {
                await oldCamera.save();
                res.send('Camera Deleted!');

            }
    
        } catch (e) {
            re.send('Error deleting camera', e)
        }
    })
}