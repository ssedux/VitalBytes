import {Schema , model} from "mongoose";

const categoryShema = new Schema({

    name : {type:String, require : true,minLength : 5}
},
{
    timestamps:true,
    strict: false
}

);

export default model("Categories",categoryShema)