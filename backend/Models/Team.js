const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    teamLeader:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    memberCount:{
        type: Number,
        required: true,
    },
    members: [
                {
                    Id : {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                    },
                    name: {
                        type: String,
                        required: true
                    }
                }
            ],
});
const Team = mongoose.model('team',teamSchema);
module.exports = Team;