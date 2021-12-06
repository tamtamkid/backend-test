const User = require('../models/User')

module.exports = {
    addUser : async (req, res) => {
        try {
            const {
                userName,
                accountNumber,
                emailAddress,
                identityNumber,
            } = req.body;

            if (
                userName === undefined ||
                accountNumber === undefined ||
                emailAddress === undefined ||
                identityNumber === undefined
            )   {
                    res.status(404).json({ message: "Lengkapi semua field" });
                }

            const user = await User.create({
                userName,
                accountNumber,
                emailAddress,
                identityNumber,
            });

            res.status(201).json({ message: "Success Add user", user });
                
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },

    getUser : async (req, res) => {
        try {
            const userdata = await User.find();
            res.status(200).json({
                message: "Success Retrive user Data", userdata
            })
            
        } catch (error) {
            //console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getUserByAccountNumber : async (req, res) => {
        const {accountnumber} = req.body;
        try {
            
            if (accountnumber === undefined)   {
                    res.status(404).json({ message: "Harap mencantumkan data pada body" });
            }
            else {
                const userdata =  await User.find({accountNumber : accountnumber}); 
                console.log(userdata)
                if(userdata.length == 0) {
                    res.status(400).json({
                        message: "User not found"
                    })
                    
                }
                else {
                    res.status(200).json({message: "Success Retrive user Data", userdata });
                }
            }          
             
            
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getUserByidentityNumber : async (req, res) => {
        const {identitynumber} = req.body;
        try {
            
            if (identitynumber === undefined)   {
                    res.status(404).json({ message: "Harap mencantumkan data pada body" });
            }
            else {
                const userdata =  await User.find({identityNumber : identitynumber}); 
                console.log(userdata)
                if(userdata.length == 0) {
                    res.status(400).json({
                        message: "User not found"
                    })
                    
                }
                else {
                    res.status(200).json({message: "Success Retrive user Data", userdata });
                }
            }          
             
            
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

}