
import {Schema , model} from "mongoose";

const categoryShema = new Schema({

    name : {type:String, require : true ,maxLength : 20,minLength : 5}
},
{
    timestamps:true,
    strict: false
}

);

export default model("category",categoryShema)