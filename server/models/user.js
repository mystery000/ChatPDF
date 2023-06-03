const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            default: 'User',
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
            required: true,
        },
        sources: [
            {
                name: String,
                sourceId: String,
                // documents: [String],
                messages: [
                    {
                        text: String,
                        isChatOwner: Boolean,
                        sentBy: String,
                        sentAt: { type: Date, default: new Date() },
                        sourceDocuments: [
                            {
                                pageContent: String,
                                metadata: Object,
                            },
                        ],
                    },
                ],
            },
        ],
        utm_source: {
            type: String
        },
        utm_medium: {
            type: String
        },
        utm_campaign: {
            type: String
        },
        utm_content: {
            type: String
        },
        stripeId: {
            type: String
        },
        pm_type: {
            type: String
        },
        pm_last_four: {
            type: String
        },
        trial_ends_at: {
            type: Date,
        }
    },
    {
        timestamps: true,
    },
);

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
