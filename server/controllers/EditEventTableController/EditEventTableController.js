const createEventModel = require("../../models/CreateEventModel/createEventModel")
const deletedEventModel = require("../../models/DeleteEventModel/DeleteEventModel")

const getevent = async (req, res) => {
    try {
        let data = createEventModel.find({})

        if (!data) return res.json({ success: false, data: [] })

        // search 
        if (req.query) {
            const query = req.query;

            if (query.q) {
                const q = query.q;
                data.find({nameOfTheEvent: { $regex: q, $options: "i"}});
            }

            if (query.date) {
                const date = query.date;
                data.find({eventDate: { $regex: date, $options: "i"}});
            }
        }

        try {
            data = await data.exec();
            res.json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error While Getting Review',
                error
            })
        }
       

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}

const getSingleEvent =  async (req, res) => {
    try {
        const { _id } = req.params;

        const data = await createEventModel.findById({ _id });
        res.json({
            success: true,
            data: data
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}

const updateevent = async(req,res)=>{
   try{
    const{nameOfTheEvent,numberOfTeams,location,eventNewDate,formattedTime,eventId} = req.body

   console.log(nameOfTheEvent,numberOfTeams,location,eventNewDate,formattedTime,eventId);

   const updatedData = await createEventModel.findByIdAndUpdate({_id : eventId},{nameOfTheEvent,numberOfTeams,location,eventNewDate,formattedTime})
   
    //  const data = await createEventModel.updateOne({_id : _id},rest)
    //  res.send({success : true, message : "data update successfully", data : data})

    res.status(200).send({
        success: true,
        message: 'Update Successful',
        data:updatedData
    })


   } catch (error) {
    res.status(400).send({
        success: false,
        message: 'Error While Getting Review',
        error
    })
   }
   
}


const deletevent = async (req, res) => {
    try {

        const { id } = req.params
        console.log(id);

        
        const deletedUser = await createEventModel.findByIdAndDelete(id);

        const deletedEvent = new deletedEventModel({
            eventId: id
        })

        await deletedEvent.save()

        res.send({ 
            success: true, 
            message: "data delete successfully", 
            data: deletedUser 
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}
module.exports = {getevent,updateevent,deletevent, getSingleEvent};