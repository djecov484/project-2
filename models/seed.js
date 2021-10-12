const mongoose = require("./connection");
const Animal = require("./zoo")


//Seed Code
mongoose.connection.on("open", () => {
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

    Animal.remove({}, (err, data) => {
       
            Animal.create(startAnimals, (err, data) => {
                console.log("-------ANIMALS CREATED---------")
                console.log(data)
                console.log("-------ANIMALS CREATED---------")
                // close the DB connection
          mongoose.connection.close();
            })
        })
    })





