const { readFile, writeFile } = require('../daos/index'); //NOTE: Importing the readFile & writeFile as separate functions
const dbFilePath = `${__dirname}../../../data/blog-db.json`;
module.exports = {
    getById: async (req, res, next) => {
        try {
            const data = await readFile(dbFilePath);
            res.send(data);
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const blogs = await readFile(dbFilePath);
            const singleBlog = blogs.find(blog => blog.id === id);

            if (!singleBlog) {
                res.status(404).send(`Account with id: ${id} not found!`);
            } else {
                res.send(singleBlog);
            }
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const incomingblog = req.body;
            const blogs = await readFile(dbFilePath);
            incomingblog.id = blog.length + 1;
    
            blogs.push(incomingblog);
            await writeFile(dbFilePath, blogs);
        
            res.send(blogs);
        } catch (error) {
            next(error);
        }
    
        //NOTE: implement create operation same way as course day 7
    },
    updateById :  async (req, res, next) => {
        const blogs = await readFile(dbFilePath);
        const blogId = Number(request.params.id);
  const body = request.body;
  const blog = blogs.find((blog) => blog.id === blogId);
  const index = blogs.indexOf(account);

  if (!blog) {
    response.status(404).send("blog not found.");
  } else {
    const updatedBlog = { ...blog, ...body };

    blogs[index] = updatedBlog;

    response.status(200).send(updatedBlog);
  }
//   try{
//             const id = Number(req.params.id);
//             const blogs = await readFile(dbFilePath);
//             const newBlog = req.body;

//             let flag = 0;
//             let index = -1;

//             for(let i in blogs){
//                 if(blogs[i].id === id){
//                     blogs[i] = {...blogs[i],...newBlog};
//                     index = i;
//                     flag = 1;
//                     break;
//                 }
//             }

//             if(flag === 1){
//                 await writeFile(dbFilePath,blogs);
//                 res.send(blogs[index]);
//             }else{
//                 res.status(404).send(`Account with id: ${id} not found!`);
//             }
//         }catch(error){
//             next(error);
//         }
},

        //NOTE: implement update operation same way as course day 7
    

    deleteById: async (req, res, next) => {
        
            const blogId = Number(request.params.id);
            const blognew = blogs.filter((blogs) => blogs.id != blogId);
          
            if (!blognew) {
              response.status(404).send("blogs not found.");
            } else {
              blogs = blognew;
              response.status(200).send(blogs);
            }
          
        //NOTE: implement delete operation same way as course day 7
        // try{
        //     const id = Number(req.params.id);
        //     const blogs = await readFile(dbFilePath);

        //     let flag = 0;

        //     blogs = blogs.filter(function(blog){
        //         if(blog.id === id){
        //             flag = 1;
        //             return blog.id !== id;
        //         } 
        //     }) 


        //     if(flag === 1){
        //         await writeFile(dbFilePath,blogs);
        //         res.send("Deleted successfully");
        //     }else{
        //         res.status(404).send(`Account with id: ${id} not found!`);
        //     }
        // }catch(error){
        //     next(error);
        // }
    }
}
