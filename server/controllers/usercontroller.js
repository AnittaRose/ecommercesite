
const users = require('../db/models/users');
// const usertypes = require('../db/models/users_type');
const { successfunction, errorfunction } = require('../utils/responsehandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Categories = require('../db/models/Categories');
const Addproduct = require('../db/models/Addpage');
const usertypes = require('../db/models/users_type');
const fileUpload = require('../utils/upload').fileUpload;


exports.Createusers = async function (req, res) {
    try {
        const body = req.body;
        console.log('Request body:', body);

        const user_type = await usertypes.findOne({ user_type: body.user_type });
        if (!user_type) {
            return res.status(400).send({
                success: false,
                message: "User type not found."
            });
        }
        body.user_type = user_type._id;

        const userExists = await users.exists({ email: body.email });
        if (userExists) {
            return res.status(400).send(errorfunction({
                statuscode: 400,
                message: "User already exists",
            }));
        }

        body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
        const newUser = await users.create(body);

        return res.status(200).send(successfunction({
            success: true,
            statuscode: 200,
            message: "User added successfully",
            data: newUser
        }));
    } catch (error) {
        console.error('Error in Createusers:', error);
        return res.status(500).send(errorfunction({
            statuscode: 500,
            message: "An error occurred while creating the user.",
            error: error.message
        }));
    }
};


exports.view = async function (req, res) {
    try {
        const userTypes = await usertypes.find();
        return res.status(200).send(successfunction({
            success: true,
            statuscode: 200,
            message: "User types retrieved successfully",
            data: userTypes
        }));
    } catch (error) {
        console.error("Error in view function:", error);
        return res.status(500).send(errorfunction({
            success: false,
            statuscode: 500,
            message: "An error occurred while retrieving user types.",
            error: error.message
        }));
    }
};

exports.viewall = async function (req, res) {
    try {
        let section = await users.find();
        console.log('section', section);

        if (section) {
            res.status(200).json(section);
        } else {
            res.status(404).send('server error');
        }
    } catch (error) {
        console.log('error', error);

    }
}

exports.singleuser = async function (req, res) {

    try {
        let single_id = req.params.id;
        console.log('id from single', single_id);

        let one_data = await users.findOne({ _id: single_id })
        console.log('one_data', one_data);

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "single view success",
            data: one_data

        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {
        console.log("error", error);

        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"

        })
        res.status(response.statuscode).send(response)
        return;

    }
};

// In userController.js (or the file where deleteuser is defined)
exports.deleteuser = async function (req, res) {
    try {
        let delete_id = req.params.id;
        console.log('delete_id', delete_id);

        let delete_onedata = await users.deleteOne({ _id: delete_id });
        res.status(200).send(delete_onedata);
    } catch (error) {
        console.log('error', error);
        res.status(500).send({ error: 'Failed to delete user' });
    }
};
exports.edituser = async function (req, res) {
    try {
        let body = req.body;
        console.log('body', body);


        let data = {
            name: body.name,
            email: body.email,
            password: body.password,
            phoneno: body.phoneno,
            user_type: body.user_type
        }


        let id = req.params.id;

        let updatedata = await users.updateOne({ _id: id }, { $set: data });
        console.log('updatedata', updatedata);

        let strupdatedata = JSON.stringify(updatedata);
        console.log('strupdatedata', strupdatedata)

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: " updated Successfully",
            data: updatedata

        })
        res.status(response.statuscode).send(response)
        return;



    } catch (error) {

        console.log("error : ", error);
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"

        })
        res.status(response.statuscode).send(response)
        return;
    }
};
exports.addproduct = async function (req, res) {
    try {
        let body = req.body;
        console.log('Received Body:', body);
        let image = body.Images;

        // Validate category presence
    

        let body_category = body.Category
        console.log(body_category);

        const Category = await Categories.findOne({ Category: body_category })
        console.log("category for product add :",Category);

        let  Category_id = Category._id
        console.log(Category_id);


        body.Category= Category;

        if (image) {
            let image_path = await fileUpload(image, "users");
            console.log("image_path", image_path);
            body.image = image_path;
        }
        let view = await Addproduct.create(body);
        console.log('New Product:', view);

        // Send success response
        let response = successfunction({
            success: true,
            statusCode: 200,
            message: "Product Added Successfully",
            data: view
        });
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("Error:", error);
        let response = errorfunction({
            success: false,
            statusCode: 400,
            message: "An error occurred",
        });
        res.status(response.statuscode).send(response);
        return;
    }
};

exports.fetchCategory = async function (req, res) {
    try {

        let Category = await Categories.find();
        console.log("category", Category);



        let response = successfunction({
            success: true,
            statusCode: 200,
            data: Category,
            message: "Category Added Successfully"

        });
        res.status(response.statuscode).send(response);
        return;


    } catch (error) {
        console.log(error);
    }
}
exports.viewallproducts = async function (req, res) {
    try {
        let section = await Addproduct.find().populate('Category')
        console.log('section', section);

        if(section){
            let response = successfunction({
                success : true,
                message : "data fetched",
                statuscode : 200,
                data : section
            })
            return res.status(response.statuscode).send(response);
        }else{
            let response =errorfunction({
                success : false,
                statuscode : 400,
                message : "sinethibg went wrong"
            });
            return res.status(response.statuscode).send(response)
        }
    } catch (error) {
        console.log('error', error);

    }
};
exports.singleproductview = async function (req,res){
    try {
        let single_id = req.params.id;
        console.log('id from single',single_id);
    
        let singledata = await Addproduct.findOne({_id: single_id})
        console.log('singledata',singledata);
    
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "singleProduct view success",
            data: singledata
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       } catch (error) {
        console.log("error",error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       }  

}


