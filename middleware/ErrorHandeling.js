//checks if an error took place 
function errorHandling(err,req,res,next){
    if (err || res.statusCode >= 400) {
        res.json({
            status: err.status || res.statusCode || 500,
            msg: 'An error has occurred. Please try again later.',
        });
    } else {
        next()
    }
}

export{
    errorHandling
}