import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    threads: [ //one user can have multupul references to specific threads stored in thr database
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Threads'
        }
    ],
    onboarded: { //after the user is signup, he will need to update an additional info about himself. this check if he updated the info
        type: Boolean,
        default: false
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]

});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;