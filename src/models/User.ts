import * as Mongoose from "mongoose"
import * as Bcrypt from "bcryptjs"

export interface IUser extends Mongoose.Document {
  _id: string | null | any;
  name: string;
  email: string;
  password: string;
  dob: Date | null;
  phoneNumber: string;
  address: any;
  gender: string;
  role: string;
  profilePicture: any;
  occupation: string;
  marriageStatus: string;
  status: string;
  isActive: boolean;
  language: string;
  lastLogin: string;
  passwordToken: string;
  emailVerified: boolean;
  createdAt: Date | null;
  updateAt: Date | null;
}

export const UserSchema = new Mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true },
    dob: { type: Date },
    phoneNumber: String,
    address: { type: Object },
    gender: { type: String, enum: ['female', 'male'], default: 'male' },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    profilePicture: {
      type: Array,
      default: ['img/user_profile.png']
    },
    occupation: String,
    marriageStatus: String,
    status: { type: String, default: true },
    isActive: { type: Boolean, default: false },
    language: { type: String, default: 'en' },
    lastLogin: { type: Date },
    passwordToken: { type: String, default: '' },
    emailVerified: { type: Boolean, default: true },
  },
  {
    // This is for hide _v key form collection
    // Automatically include createdAt and updatedAt field
    timestamps: true
  }
);

function hashPassword(password: string): string {
  if (!password) {
    return "null"
  }
  return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
}

UserSchema.methods.validatePassword = function (requestPassword: any) {
  return Bcrypt.compareSync(requestPassword, this.password);
};

UserSchema.pre("save", function (next) {
  const user: any = this;

  if (!user.isModified("password")) {
    return next()
  }

  user["password"] = hashPassword(user["password"]);

  return next()
});

UserSchema.pre("findOneAndUpdate", function () {
  const password = hashPassword(this.getUpdate().$set.password)

  if (!password) {
    return;
  }

  this.findOneAndUpdate({}, { password: password })
});

export const User = Mongoose.model<IUser>("User", UserSchema)