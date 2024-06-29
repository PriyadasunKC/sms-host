require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");


const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const forgottenPasswordRoute = require("./routes/ForgottenPasswordRoute");
const ApproveActorModelRoute = require("./routes/ApproveActorModelRoute")
const updateFixtureRoute = require("./routes/UpdateFixtureRoute/UpdateFixtureRoute");
const StoreRoute = require("./routes/StoreRoute/StoreRoute");
const shuffleNewTeamRoute = require("./routes/ShuffleNewTeamRoute/ShuffleNewTeamRoute")
const fixtureRoute = require("./routes/FixtureRoute/FixtureRoute");
const deleteRoute = require("./routes/DeleteRoute/DeleteRoute");
const createFixtureRoute = require("./routes/CreateFixtureRoute/CreateFixtureRoute")
const getFixtureRoute = require("./routes/CreateFixtureRoute/getFixtureRoute")
const createEventRoute = require("./routes/CreateEventRoute/createEventRoute")
const getOneEventData = require("./routes/CreateFixtureRoute/getOneFixtureRoute")
const deleteOneFixtureRouter = require("./routes/CreateFixtureRoute/deleteOneFixtureRoute")
const giveReviewRoute = require("./routes/CoachReviewRoute/CreateReviewRoute")
const getPlayerDetailsRoute = require('./routes/GetAllPlayerDetails/getPlayerDetailsRoute')

const PlayerProfileRoute = require('./routes/PlayerProfileRoute/PlayerProfileRoute')
const coachProfileRoute = require('./routes/CoachProfileRoute/CoachProfileRoute')
const eventOrganizerProfileRoute = require('./routes/EventOrganizerProfileRoute/EventOrganizerProfileRoute')

const coachAvailabilityRoute = require("./routes/CoachAvailabilityRoute/CoachAvailabilityRoute")
const PlayerAvailabilityRoute = require("./routes/PlayerAvailabilityRoute/PlayerAvailabilityRoute")
const getPlayerReviewRoute = require("./routes/CoachReviewRoute/getCurrentPlayerReviewRoute")

const searchLocationRoute = require("./routes/PlayerAvailabilityRoute/SerachLocationRoute")
const eventOrganizerBracketRoute = require("./routes/EventOrganizerBracketRoute/EventOrganizerBracketRoute")
const CoachesAssignDeleteRoute = require('./routes/CoachesAssignDeleteRoute/CoachesAssignDeleteRoute')
const eventViewRoute = require("./routes/EventViewRoute/EventView")
const playerSearchProfile = require("./routes/PlayerSearchProfileRoute/PlayerSearchProfileRoute")
const playerSearchTable = require("./routes/PlayerSearchTableRoute/PlayerSearchTableRoute")
const EditEventTable = require("./routes/EditEventTableRoute/EditEventTableRoute")
const refreeProfile = require("./routes/RefreeProfileRoute/RefreeProfileRoute")

const organizerRoutes = require("./routes/organizerRoutes")
const coachRoutes = require("./routes/coachRoutes")

const getOnlyEventOrganizerRoute = require("./routes/GetOnlyEventOrganizerRoute/GetOnlyEventOrganizerRoute")
const GetOnlyCoachRoute = require("./routes/GetOnlyCoachRoute/GetOnlyCoachRoute")
const GetOnlyTeamManagersRoute = require("./routes/GetOnlyTeamManagersRoute/GetOnlyTeamManagersRoute")
const RefereeEventRoute = require("./routes/RefereeEventRoute/RefereeEventRoute")
const getRefereeDetailsRoute = require("./routes/GetAllRefereeDetails/GetAllRefereeDetails")
const FixtureSearchRoute = require("./routes/FixtureSearchRoute/FixtureSearchRoute")
const CoachSearchRoute = require("./routes/CoachSearchRoute/CoachSearchRoute")
const TMSearchRoute = require("./routes/TMSearchRoute/TMSearchRoute")
const PointTableFormRoutes = require("./routes/PointTableFormRoutes/PointTableFormRoutes")
const AssignCoachesNewRoute = require("./routes/AssignCoachesNewRoute/AssignCoachesNewRoutes")
const DisplayAssignPlayers = require("./routes/DisplayAssignPlayersRoute/DisplayAssignPlayersRoute")
const RefereeAvailabilityRoute = require("./routes/RefereeAvailabilityRoute/RefereeAvailabilityRoute")
const GetPlayerAssignEventRoute = require("./routes/GetPlayerAssignEventRoute/GetPlayerAssignEventRoute")


require("./db/mongoDb"); 

const app = express();

app.use(express.json()); // middlewares
app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log("User connected ", socket.id);

   socket.on("send_message",(data)=>{
       console.log("Message Received ",data);

       io.emit("receive_message",data);
   })


   socket.on("disconnect", () => {
       console.log("User disconnected ", socket.id);
   })


});


// COMMON ROUTE HANDLE
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/forgotten", forgottenPasswordRoute);
app.use("/api/v1/aprove",ApproveActorModelRoute)

// HANDLE FIXTURE ROUTE
app.use("/api/v1/fixture",fixtureRoute)
app.use("/api/v1/update",updateFixtureRoute)
app.use("/api/v1/store",StoreRoute)
app.use("/api/v1/shuffle",shuffleNewTeamRoute)
app.use("/api/v1/delete",deleteRoute)

//HANDLE CREATE FIXTURE ROUTE
app.use("/api/v1/create",createFixtureRoute)
app.use("/api/v1/get",getFixtureRoute)


// HNDLE CREATE EVENT ROUTE
app.use("/api/v1/event",createEventRoute);
app.use("/api/v1/event",getOneEventData);  
app.use("/api/v1/delete",deleteOneFixtureRouter);  

// HANDLE GIVE REVIEW ROUTE
app.use("/api/v1/review",giveReviewRoute);
app.use("/api/v1/review-give-coach",getPlayerReviewRoute);


// GET ONLY PLAYER ROUTE
app.use("/api/v1/player",getPlayerDetailsRoute);

// GET ONLY Referee ROUTE
app.use("/api/v1/referee",getRefereeDetailsRoute);


// PLAYER ROUTE
app.use("/api/v1/profile",PlayerProfileRoute);

// COACH ROUTE
app.use("/api/v1/profile",coachProfileRoute);

// EVENT ORGANIZER ROUTE
app.use("/api/v1/profile",eventOrganizerProfileRoute);


// COACH AVAILABILITY
app.use("/api/v1/availability",coachAvailabilityRoute);

// REFEREE AVAILABILITY
app.use("/api/v1/availability",RefereeAvailabilityRoute);

// PLAYER AVAILABILITY
app.use("/api/v1/player-availability",PlayerAvailabilityRoute);

// Search Location
app.use("/api/v1/search",searchLocationRoute);


// Event Organizer Bracekt
app.use("/api/v1/eventOrganizerBracket",eventOrganizerBracketRoute)

//coaches assign and delete
app.use("/api/v1/coaches-assign-delete",CoachesAssignDeleteRoute)
app.use("/api/v1/eventView",eventViewRoute)
// player search profile
app.use("/api/v1/playerSearchProfile",playerSearchProfile )
// player search Table
app.use("/api/v1/playerSearchTable",playerSearchTable)
// edit event table and from
app.use("/api/v1/EditEventTable",EditEventTable)
//refree profile
app.use("/api/v1/refreeProfile",refreeProfile)


app.use("/api/v1/organizer", organizerRoutes)
app.use("/api/v1/coach", coachRoutes)


app.use("/api/v1/event-organizer", getOnlyEventOrganizerRoute);
app.use("/api/v1/coach", GetOnlyCoachRoute);
app.use("/api/v1/team-manager", GetOnlyTeamManagersRoute);
// REFREE ROUTE
app.use("/api/v1/referee", RefereeEventRoute);


// SEARCH FIXTURE ROUTE
app.use("/api/v1/search",FixtureSearchRoute);

// SEARCH Coach
app.use("/api/v1/search",CoachSearchRoute);

// SEARCH TM
app.use("/api/v1/search",TMSearchRoute);
app.use("/api/v1/PointTableForm", PointTableFormRoutes);

//Asssign coaches New
app.use("/api/v1/Assign-Coaches-New",AssignCoachesNewRoute);
//Assign players for matches
app.use("/api/v1/DisplayAssignPlayers", DisplayAssignPlayers);


// GET Player Assign event
app.use("/api/v1/event",GetPlayerAssignEventRoute)

const PORT = process.env.PORT || 3000; 

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});