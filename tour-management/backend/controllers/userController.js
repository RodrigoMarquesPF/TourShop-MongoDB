import User from '../models/User.js'


// create new User
export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        
        const savedUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedUser
        });
    } catch (err) {
        console.error(err);
        console.error('Error during user creation:', err);
    console.log('Request Body:', req.body);

        // Verificar se o erro contém informações do Mongoose
        if (err.errors) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: err.errors
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to create. Try again',
                error: err.message
            });
        }
    }
};


//update User

export const updateUser = async (req, res) => {

    const id = req.params.id

    try {

        const updatedUser = await User.findByIdAndUpdate(id,{
            $set:  req.body
        }, {new:true});

        res.status(200).json({success:true, message:'Successfully update',
        data:updatedUser,
        });
        
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to update',
        });
        
    }
};

//delete User

export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {

        await User.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfully delete',
        });
        
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to delete',
        });
        
    }
};

//getSingle User

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        
        const user = await User.findById(id);
        /*
        res.status(200).json({success:true, message:'Successfully found',
        data:User});
        */

        if (!user) {
            // Se User é null, nenhum User foi encontrado
            res.status(404).json({ success: false, message: 'not found' });
            return; // Importante: encerre a execução da função aqui
        }

        // Se User não é null, encontrou um User com sucesso
        res.status(200).json({
            success: true,
            message: 'Successfully found',
            data: user
        });
        
    } catch (err) {
        
        res.status(404).json({success:false, message:'not found',
        });
        
    }
};

//getAll User

export const getAllUser = async (req, res) => {


    //console.log(page);

    try {
        //limiti de resultados  = .skip(page * 8).limit(8)
        const users = await User.find({})
        
        res.status(200).json({success:true, message:'Successful',
        data:users})
    } catch (err) {
        res.status(404).json({success:false, message:'not found',
        });
    }
};
