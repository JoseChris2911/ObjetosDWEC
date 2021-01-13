//Aparte de comentar el codigo, pondre un poco lo que pienso
//porque este ejercicio me lió con tantos tipos de formas al hacerlo



//Aprovechando la version ES6 de javascript creamos los objetos con las clases junto con sus get y sets


class Gallery {

    //aprovechamos para darle un titulo por defecto para que no de error.

    _title = "Default";
    //Primero creamos un array con los autores
    //luego otro con las categorias
    //las propiedades no se si deberian estar inicializadas explicando que son arrays y objetos de esta forma
    //De todas formas si no se usa nada, tenemos valores default, asi la galeria no queda vacia
    //la categoria tiene una default y un author default, podemos usarlos con la primera entrada
    //del array

    _authors = [];
    _categories = [{
        category: {
            title: "Default title category",
            description: "Default description category"
        },
        images: [{
            image: {},
            author: "Default author"
        }]
    }];

    // _authors = [];
    // _categories = [];
    //Si queremos relacionar los objetos debemos de crear referencias entre los arrays
    //ya que los objetos de las clases actuan de manera independiente.
    //este array NO es de objetos categoria si no que cada objeto tendrá, {objeto categoria, images[]}
    //de esta forma relacionamos las categorias con las imagenes
    //y dentro del array images, NO es un array de objetos imagen si no que hacemos
    //lo mismo con categories {objeto image, _authors[posicionautor].nickname}



    get _title() {
        return this._title;
    }
    set _title(title) {
        this._title = title;
    }
    get _categories() {
        return this._categories;
    }
    get _authors() {
        return this._authors;
    }

    addCategory(category) {


        //como _categories no es un array de objetos categorias especifico
        //necesito acceder solo a la primera propiedad del array que contiene los objetos categoria
        //(la segunda propiedad es images[]), para añadir solo la categoria.Esto significa que no tiene
        //aun imagenes por lo que creo un objeto con la categoria y un array de imagenes vacio
        //pero antes hay que comprobar si esta categoria existe
        let existe = false;
        //con un for puedo acceder a cada elemento del array y con ello averiguar si
        //la propiedad categoria ya estaba antes de añadirla
        for (let index = 0; index < this._categories.length; index++) {
            const element = this._categories[index];
            if (element.category == category) {
                existe = true;
            }

        }


        if (category != null && !existe) {
            //si no esta la categoria y no da null creo un elemento
            //para añadirlo al array [categoria, arrayimages]
            let elemento = {
                category: category,
                images: []

            }
            this._categories.push(elemento);
            return this._categories.length;
        } else {
            throw new TypeError("Categoria no permitida")
        }



    }
    removeCategory(category) {

        //con un for puedo acceder a cada elemento del array y con ello averiguar si
        //la propiedad categoria ya estaba antes de añadirla

        for (let index = 0; index < this._categories.length; index++) {
            const element = this._categories[index];
            if (element.category == category) {

                this._categories.splice(index, 1);
                return this._categories.length;
            }

        }


    }

    addImage(image, category, author) {
        let nuevaimagen;

        if (image == null) {
            //si la imagen no existe lanzamos excepcion
            throw "La imagen no debe ser null"

        }else if(category == null){
            //si no se suministra categoria, añadimos la foto a la
            //categoria default con el autor
            nuevaimagen = {
                image: image,
                //si el author tampoco se suministra le meto uno default
                author: author ? author._nickname : "Author default"
            }
            this._categories[0].images.push(nuevaimagen);
        }
        
        for (let index = 0; index < this._categories.length; index++) {
            const element = this._categories[index];
            if (element.category == category) {
                //si encuentro la categoria entro a la otra propiedad array images
                //meto el autor en el array de autores y con ello lo tenemos todo listo
                //para meter la imagen y el nick del autor
                //creo el objeto que contiene la imagen y el author
                
                //si el autor ha sido añadido previiamente con el metodo addauthor
                //no le añadimos y simplemente guardamos el nick junto a la imagen
                if(this._authors.includes(author)){
                    nuevaimagen = {
                        image: image,
                        author: author._nickname
                    }
                }else{
                    //si no existia pues lo añadimos
                    gallery.addAuthor(author);
                    nuevaimagen = {
                        image: image,
                        author: this._authors[this._authors.length - 1]._nickname
                    }
                }
                //añado el objeto de la imagen y el autor a la categoria
                //console.log("NUEVA IMAGEN "+nuevaimagen.author)
                element.images.push(nuevaimagen);

                return this._categories.length;
            }

        }

    }
    
    removeImage(image) {
        //recorro las categorias en busca de la imagen
        for (let index = 0; index < this._categories.length; index++) {
            const element = this._categories[index];
            //paro en cada categoria y busco la posicion de la imagen
            //let numeroimagen = element.images.indexOf(image);
            for (let indey = 0; indey < element.images.length; indey++) {
                //ahora estoy en el listado de imagenes.
                const element2 = element.images[indey];
                
                //ahora que estoy en el element de la categoria.images ya puedo
                //buscar la imagen con este for

                if (element2.image == image) {
                    
                    element.images.splice(indey, 1);
                }

            }

        }
        return this._categories;
        
        
    }

    getCategoryImages(category) {
        if (category == null) {
            throw "categoria necesaria"
        }
        for (let index = 0; index < this._categories.length; index++) {
            const element = this._categories[index];

            if (element.category == category) {


                return element.images;
            }

        }
    }
    addAuthor(author) {
        if (author == null) {
            throw "autor necesario"
        }
        if(this._authors.includes(author)){
            throw "Este autor ya existe"
        }else{
            this._authors.push(author);
            return this._authors.length;
        }
        
        


    }
    removeAuthor(author) {
        let numeroautor = this._authors.indexOf(author);
        
        if (numeroautor !== -1) {
            this._authors.splice(numeroautor,1);
            return this._authors.length;
        } else {
            throw "Autor no encontrado"
        }
    }
    getAuthorImages(author) {
        if (author == null) {
            throw "autor necesario"
        }
        let arrayimagenes = [];
        for (let index = 0; index < this._categories.length; index++) {
            const element = this._categories[index];
            //viajo por las categorias para buscar en cada listado de imagenes
            //las que tengan el nombre del autor seleccionado
            
            for (let indey = 0; indey < element.images.length; indey++) {
                //ahora estoy en el listado de imagenes.
                const element2 = element.images[indey];
                
                //debo crear un array que contenga las imagenes
                //cuyo autor tenga el mismo nick que el que se pasa por parametro
                //miro la propiedad author, la cual es un string con solo el nick
                //y si coincide, la primera propiedad que es la imagen la añado al array
                if (element2.author == author._nickname) {
                    arrayimagenes.push(element2.image)
                    
                }

            }

        }
        return arrayimagenes;
    }

    getPortraits() {
        //Aqui debemos buscar las clases portraits de las imagenes
        //asi que buscamos todos los objetos images que lo cumplan y
        //los guardamos en un array
        let arrayimagenes = [];
        for (let index = 0; index < this._categories.length; index++) {
            const element = this._categories[index];
            //viajo por las categorias para buscar en cada listado de imagenes
            
            for (let indey = 0; indey < element.images.length; indey++) {
                //ahora estoy en el listado de imagenes.
                const element2 = element.images[indey];
                //si la imagen extiende de portrait entonces se añade al array
                if (element2.image instanceof Portrait) {

                    arrayimagenes.push(element2.image)
                }

            }

        }
        return arrayimagenes
    }
    getLandScapes() {
        // este metodo es exactamente igual al anterior
        let arrayimagenes = [];
        for (let index = 0; index < this._categories.length; index++) {
            const element = this._categories[index];
            //viajo por las categorias para buscar en cada listado de imagenes
            
            for (let indey = 0; indey < element.images.length; indey++) {
                //ahora estoy en el listado de imagenes.
                const element2 = element.images[indey];
                //si la imagen extiende de landscape entonces se añade al array
                if (element2.image instanceof Landscape) {

                    arrayimagenes.push(element2.image)
                }

            }

        }
        return arrayimagenes
    }

};

class Category {
    _title;
    _description;

    constructor(title, description) {
        this._title = title;
        this._description = description;
    }

    get _title() {
        return this._title;
    }
    set _title(title) {
        if (title.isEmpty()) {
            throw new TypeError("Titulo de la categoria vacio");
        } else {
            this._title = title;
        }

    }
    get _description() {
        return this._description;
    }
    set _description(description) {
        this._description = description;
    }

}

class Image {
    _title;
    _description;
    _url;
    _coords;
    constructor(title, description, url, coords){
        this._title = title;
        this._description = description;
        this._url = url;
        this._coords = coords;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        if (title.isEmpty()) {
            throw "Titulo de la categoria vacio"
        } else {
            this._title = title;
        }

    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get url() {
        return this._url;
    }
    set url(url) {
        this._url = url;
    }

}
//no he entendido esta parte. Se que portrait y landscapes son subclases de image, pero no se
// a que te refieres cuando una imagen es de este tipo u otro.
//asi que lo que he entendido es que al crear un objeto de tipo landscape, actua como imagen
//pero lleva como renombre 'landscape' por ejemplo
class Landscape extends Image {

    constructor(title, description, url, coords){
        super();
        this._title = title;
        this._description = description;
        this._url = url;
        this._coords = coords;
    }
}
class Portrait extends Image {
    constructor(title, description, url, coords){
        super();
        this._title = title;
        this._description = description;
        this._url = url;
        this._coords = coords;
    }
}

class Coords {
    _latitude;
    _longitude;
    constructor(latitude, longitude){
        this._latitude = latitude;
        this._longitude = longitude;
    }

    get _latitude() {
        return this._latitude;
    }
    set _latitude(latitude) {
        this._latitude = latitude;
    }
    get _longitude() {
        return this._longitude;
    }
    set _longitude(longitude) {
        this._longitude = longitude;
    }
}

class Author {

    _nickname;
    _email;
    _avatar;

    constructor(nickname, email, avatar){
        this._nickname = nickname;
        this._email = email;
        this._avatar = avatar;
    }

    get _nickname() {
        return this._nickname;
    }
    set _nickname(nickname) {
        this._nickname = nickname;
    }
    get _email() {
        return this._email;
    }
    set _email(email) {
        this._email = email;
    }
    get _avatar() {
        return this._avatar;
    }
    set _avatar(avatar) {
        this._avatar = avatar;
    }

}

function test() {
    //El ejercicio no decia nada de interfaz solo de ejecutarlo por consola
    //y como se usan bastantes metodos, lo he impreso por aqui en la web.
    //Toda funcion tiene su titulo y como quedaria en consola
    console.log("TEST");
    //ahora voy a implementar la galeria como si estuviera en una aplicacion
    let gallery = new Gallery();
    gallery._title = "Gallery";
    //creo unas categorias con titulo y descripcion
    let category = new Category("categoria 1", "descripcion 1");
    let category2 = new Category("categoria 2", "descripcion 2");

    //creo una imagen de los 3 tipos con unas coords
    let coords = new Coords(-12,12)
    let imagenland = new Landscape("titulo lands", "desc lands", "url lands", coords);
    let imagenportrait = new Portrait("titulo Portrait", "desc portrait", "url portrait", coords);
    let imagenormal = new Image("titulo normal", "desc normal", "url normal", coords);
    
    //y por ultimo unos autores
    let author = new Author("Matias", "Matias desc", "Matias url");
    let author2 = new Author("Matias impostor", "Matias impostor desc", "Matias impostor url");
    
    
    //metodos de gallery:
    //add galery
    console.log("ADD CATEGORY")
    gallery.addCategory(category);
    gallery.addCategory(category2);
    console.log(gallery);
    //add author
    console.log("ADD AUTHOR");
    gallery.addAuthor(author);
    gallery.addAuthor(author2);
    console.log(gallery);
    //add images (dos, una landscape y una normal) a una categoria con un autor
    console.log("ADD IMAGES")
    gallery.addImage(imagenland, category, author)
    gallery.addImage(imagenormal, category, author)
    console.log(gallery);
    //aqui no usaremos categoria por lo que se ira a default
    console.log("ADD IMAGE SIN CATEGORIA");
    gallery.addImage(imagenportrait, null ,author)
    console.log(gallery);
    console.log("GETTERS")
    //get author images Matias
    //las 3 imagenes de antes son todas de matias
    console.log("getAuthorImages")
    console.log(gallery.getAuthorImages(author))
    //get category "category 1" images
    //deberia devolver la landscape y la normal puesto que la portrait se fue a
    //la categoria default
    console.log("getCategoryImages")
    console.log(gallery.getCategoryImages(category))
    //get portraits
    console.log("getPortraits")
    console.log(gallery.getPortraits())
    //get landscapes
    console.log("getLandScapes")
    console.log(gallery.getLandScapes())
    //REMOVES
    console.log("REMOVES")
    console.log("remove author");
    //borro a Matias impostor
    console.log(gallery.removeAuthor(author2))
    console.log("remove category");
    //borro la categoria 2
    console.log(gallery.removeCategory(category2))
    console.log("remove image");
    //borro la imagen normal a Matias
    console.log(gallery.removeImage(imagenormal))
    console.log(gallery.getAuthorImages(author))


}
test();
