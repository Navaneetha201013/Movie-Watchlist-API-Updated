const controller = require("../models/movieAPI");

exports.getMovies = async (req, res, next) => {
    try {
        const { search, inStock, minPrice, maxPrice, sort } = req.query;
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Number(req.query.limit) || 2, 1);
        
        const filter = {};
        if (search) {
            const safe = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            console.log(safe);
            filter.title = {
                $regex: safe,
                $options: "i"
            };
        }
        if(inStock){
            filter.inStock = inStock === "true";
        }
        if(minPrice || maxPrice){
            filter.price = {};
            if(minPrice) filter.price.$gte = Number(minPrice);
            if(maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const total = await controller.countDocuments(filter);
        const c = await controller.find(filter)
                                  .sort(sort || "-createdAt");
                                //   .skip((page-1)*limit)
                                //   .limit(limit);
        res.json({
            // total,
            // page,
            // pages: Math.ceil(total/limit),
            c
        });
    }
    catch (err) {
        next(err);
    }
};

exports.getMovie = async(req, res, next) => {
    console.log("Request recieved for movie by id")    
    try{
        const id = req.params.id
        const movie = await controller.findById(id);
        if(!movie){
            return res.status(400).json({
                message: "Wrong id format"
            });
        }
        res.status(200).json(movie);
    }
    catch(err){
        next(err);
    }
}

exports.createMovie = async (req, res, next) => {
   try {
        const {title, rating, genre} = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title not found"
            })
        }

        if (!rating) {
            return res.status(400).json({
                message: "rating not found"
            })
        }

        if (!genre) {
            return res.status(400).json({
                message: "genre not found"
            })
        }

        const c = await controller.create({
            ...req.body, 
            createdBy: req.user.id
        })
        return res.status(201).json(product);
   } catch (err) {
        next(err);
   }
}

exports.postMovies = async (req, res, next) => {
    try {
        const { title, rating, genre } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title not found"
            });
        }

        if (!rating) {
            return res.status(400).json({
                message: "rating not found"
            });
        }

        if (!genre) {
            return res.status(400).json({
                message: "Genre not found"
            });
        }

        const movie = await controller.create(req.body);

        return res.status(201).json(movie);
    }
    catch (err) {
    console.log("ERROR:", err);
    next(err);
}
};

exports.putMovies = async (req, res, next) => {
    try {
        const id = req.params.id;
        const movie = await controller.findByIdAndUpdate(id, req.body, {
            returnDocument: "after", runValidators: true
        });
        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }
        res.status(200).json(movie);
    } catch(err) {
        next(err)
    }
}

exports.getMyMovies = async(req, res, next) => {
    try{
        const c = await controller.find({createdBy: req.user.id})
        res.status(200).json(c);
    }
    catch(err){
        next(err)
    }
}

exports.deleteMovies = async (req, res, next) => {
    try{
        const id = req.params.id;
        const movie = await controller.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }
        res.status(200).json({
            message: "Movie deleted successfully"
        })
        const c=await controller.create({
            ...req.body,
            createdBy:req.user.id

        })
        return res.status(201).json(player);
    }
    catch(err){
        next(err)
    }    
}

exports.updateMovie = async (req, res, next) => {
    try{
        const c = await controller.findById(req.params.id);
        if(!c){
            return res.status(404).json({error: "Movie not found"});
        }
        if(String(c.createBy)!==req.user.id){
            return res.status(403).json({
                error: "You can only change your movie-entry"
            });
        }
        delete req.body.createdBy;
        const updated = await controller.findByIdAndUpdate(
            req.params.id, req.body,
            { returnDocument: "after", runValidators: true}
        );
        res.json(updated);
    }
    catch(err){
        next(err);
    }
}















        
    