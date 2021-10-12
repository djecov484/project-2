// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Animal = require("../models/zoo")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
  });

//Routs


router.get("/seed", (req, res) => {
    const startAnimals = [
        {name : "Ted", extinct: false, location: "USA", life: 20, 
         img: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Lion_Image_2.jpg"
    },
        {name : "Lady", extinct: true, location: "China", life: 40 ,
        img: "https://www.wwf.org.uk/sites/default/files/styles/gallery_image/public/2019-11/Curious%20adolescent%20lion.jpg?h=6f8e8448&itok=2H_IvYeV"
},
        {name : "Kayla", extinct: true, location: "Africa", life: 15 ,
        img: "https://nationalzoo.si.edu/sites/default/files/styles/1400_scale/public/animals/africanlion-001.jpg?itok=68Fi0kEi"
},
        {name : "Ozzy", extinct: true, location: "Africa", life: 20 ,
        img: "https://images.all-free-download.com/images/graphiclarge/the_lookout_515087.jpg"
        },
        {name : "Coco", extinct: true, location: "Africa", life: 50,
         img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Parrot.jpg"
},
       
        {name : "Bulldog", extinct: true, location: "Australia", life: 20,
       img: "https://www.cookmuseum.org/wp-content/uploads/2020/07/Snapping-turtle-cropped-3.jpg"
    }
    ]

    //Delete
    Animal.remove({}, (err, data) => {
        Animal.create(startAnimals,(err, data) => {
            res.json(data);
        })
    })
})


//Index route
router.get("/", (req, res) => {
    Animal.find({}, (err, animals) => {
        console.log(animals);
        res.render("zoo/index.ejs", {animals});
    })
  
})

// New Route (Get => /animals/new)
router.get("/new", (req, res) => {
    res.render("zoo/new.ejs")
})

// Create route
router.post("/", (req, res) => {
    
    req.body.extinct = req.body.extinct === "on" ? true : false;
   
    Animal.create(req.body, (err, animal) => {
     
      res.redirect("/zoo");
    });
  });

//Edit route
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    console.log(id)
    Animal.findById(id, (err, animal) => {
        res.render("zoo/edit.ejs", {zoo})
    })
})

//Update route
router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        res.redirect("/animals")
    })
})

//Delete route
router.delete("/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, animal) => {
        res.redirect("/animals")
    })
})
//Show route
router.get("/:id", (req, res) => {
    const id = req.params.id

    Animal.findById(id, (err, animal) => {
        res.render("zoo/show.ejs", {animal})
    })
})



module.exports = router