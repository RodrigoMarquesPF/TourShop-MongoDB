
import Tour from '../models/Tour.js'


// create new tour

export const createTour = async (req, res)=>{
    const newTour = new Tour(req.body)

    try {
        const savedTour = await newTour.save()

        res.status(200).json({success:true, message:'Successfully created',
        data:savedTour
        })
        
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to create. Try again'
        })
    }
};


//update tour

export const updateTour = async (req, res) => {

    const id = req.params.id

    try {

        const updatedTour = await Tour.findByIdAndUpdate(id,{
            $set:  req.body
        }, {new:true});

        res.status(200).json({success:true, message:'Successfully update',
        data:updatedTour,
        });
        
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to update',
        });
        
    }
};

//delete tour

export const deleteTour = async (req, res) => {
    const id = req.params.id

    try {

        await Tour.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfully delete',
        });
        
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to delete',
        });
        
    }
};

//getSingle tour

export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        
        const tour = await Tour.findById(id);
        /*
        res.status(200).json({success:true, message:'Successfully found',
        data:tour});
        */

        if (!tour) {
            // Se tour é null, nenhum tour foi encontrado
            res.status(404).json({ success: false, message: 'not found' });
            return; // Importante: encerre a execução da função aqui
        }

        // Se tour não é null, encontrou um tour com sucesso
        res.status(200).json({
            success: true,
            message: 'Successfully found',
            data: tour
        });
        
    } catch (err) {
        
        res.status(404).json({success:false, message:'not found',
        });
        
    }
};

//getAll tour

export const getAllTour = async (req, res) => {

    //for pagination
    const page = parseInt(req.query.page)
    //console.log(page);

    try {
        //limiti de resultados  = .skip(page * 8).limit(8)
        const tours = await Tour.find({}).skip(page * 8).limit(8)
        
        res.status(200).json({success:true, count:tours.length ,message:'Successful',
        data:tours})
    } catch (err) {
        res.status(404).json({success:false, message:'not found',
        });
    }
};



//get tour by search

export const getTourBySearch = async(req, res) =>{
    const city = new RegExp(req.query.city, 'i') //'i' significa case sensitive
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        //gte mens greater than equal
        const tours = await Tour.find({city, distance:{$gte:distance},
        maxGroupSize:{$gte:maxGroupSize}})
        
        if (tours.length === 0) {
            // Se a array de tours está vazia, nenhum tour foi encontrado
            res.status(404).json({ success: false, message: 'not found' });
            return; // Importante: encerre a execução da função aqui
        }
        res.status(200).json({success:true, message:'Successful',
        data:tours})
        
    } catch (err) {
        res.status(500).json({success:false, message:'not found',
        });
        
    }

}



//get featured tour

export const getFeaturedTour = async (req, res) => {


    try {
   
        const tours = await Tour.find({featured:true}).limit(8);
        
        res.status(200).json({success:true, message:'Successful',
        data:tours})
    } catch (err) {
        res.status(404).json({success:false, message:'not found',
        });
    }
};


//get tour counts
export const getTourCount = async (req,res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()

        res.status(200).json({success:true, data:tourCount})
    } catch (error) {
        
        res.status(500).json({success:false, message:"failed to fetch"})
    }
}
