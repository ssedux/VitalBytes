/*campos:
-idClient
-idcart
*/
import { Schema, model } from "mongoose";

const salesSchema = new Schema(
    {
        idClient: {
            type: Schema.Types.ObjectId,
            ref: "client",
            required: true,
        },
        idcart: {
            type: Schema.Types.ObjectId,
            ref: "cart",
            required: true,
        },
    },
    {
        timestamps: true,
        strict: false,  
    }
);

export default model("sales", salesSchema);