const createFixtureModel = require('../../models/CreateFixtureModel/CreateFixtureModel');


const createFixtureController = async (req, res) => {
        try {

           const { nameOfTheEvent, nameOfTheTeam, location,eventNewDate,formattedTime } = req.body;

           console.log(nameOfTheEvent, nameOfTheTeam, location,eventNewDate,formattedTime);

           const data = new createFixtureModel({
                nameOfTheEvent: nameOfTheEvent,
                nameOfTheTeam: nameOfTheTeam,
                location: location,
                eventNewDate:eventNewDate,
                formattedTime:formattedTime
             })

           await data.save();

           console.log(data);

           res.status(200).send({
                success:true,
                message:'Fixture Created Successfully',
                data:data
           })

        } catch (error) {
           res.status(400).send({
                success:false,
                message:'Fixture Created Unsuccessfully',
                data:data
             })
        }

}

module.exports = { createFixtureController }