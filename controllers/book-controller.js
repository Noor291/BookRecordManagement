const {UserModel,BookModel}=require("../models")
const IssuedBook = require("../dtos/book-dto");
const IssuedBookFine=require("../dtos/book-dto1")

exports.getAllBooks=async (req,res)=>{
    const books = await BookModel.find();

    if(books.length ===0){
        return res.status(404).json({
            success:false,
            message:"No book found",
        })
    }

    res.status(200).json({
        success:true,
        data:books,
    })
};

exports.getSingleBookById=async (req,res)=>{
    const{id}=req.params;
    const book =await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"book not found",
        });
    }
    return res.status(200).json({
        sucess: true,
        data: book,
    });
};

exports.getAllIssuedBooks=async (req,res)=>{
    const users = await UserModel.find({
        issuedBook:{$exists:true}, //operators in mongoDB
    }).populate("issuedBook")
     
    const issuedBooks = users.map((each)=> new IssuedBook(each))

    if(issuedBooks.length===0)
      return res.status(404).json({
        success:false,
        message:"No books issued yet",
      })
      return res.status(200).json({success:true,data:issuedBooks,})
};

exports.addNewBook=async (req,res)=>{
    const {data} =req.body;
    if(!data){
     return res.status(404).json({
         success:false,
         message:"No data provided",
     });
    }
    
    await BookModel.create(data);
    const allBooks = await BookModel.find();

    return res.status(201).json({
        success:true,
        data:allBooks,
    })
};

exports.updateBook=async (req,res)=>{
    const{id}=req.params;
    const{data}=req.body;
    
    const updatedBook=await BookModel.findOneAndUpdate({_id:id},data,{new:true})
    return res.status(201).json({
     success:true,
     data:updatedBook,
    });
};

exports.deleteBook=async (req,res)=>{
    const{id}=req.params;
    
    await BookModel.deleteOne({_id:id});
    const allBooks = await BookModel.find();
    return res.status(201).json({
     success:true,
     data:allBooks,
    });
};

exports.getIssuedBooksWithFine=async (req,res)=>{
    const users = await UserModel.find({
        issuedBook:{$exists:true}, //operators in mongoDB
    }).populate("issuedBook")
    
    const issuedBooks = users.map((each)=> new IssuedBookFine(each))
    
    if(issuedBooks.length===0)
      return res.status(404).json({
        success:false,
        message:"No books issued yet",
      })
    return res.status(200).json({success:true,data:issuedBooks,})
 }