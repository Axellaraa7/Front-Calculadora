const d = document,
  templates = d.createElement("template");

const urls = ["url1","url2","url3"];

const cientificos = [
  {
    name:"Albert Einstein",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/675px-Albert_Einstein_Head.jpg?20141125195928",
    bio: "https://es.wikipedia.org/wiki/Albert_Einstein"
  },
  {
    name:"Arquimedes",
    img:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Retrato_de_un_erudito_%28%C2%BFArqu%C3%ADmedes%3F%29%2C_por_Domenico_Fetti.jpg/330px-Retrato_de_un_erudito_%28%C2%BFArqu%C3%ADmedes%3F%29%2C_por_Domenico_Fetti.jpg",
    bio:"https://es.wikipedia.org/wiki/Arqu%C3%ADmedes"
  },
  {
    name:"Blaise Pascal",
    img:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Blaise_Pascal_Versailles.JPG/330px-Blaise_Pascal_Versailles.JPG",
    bio:"https://es.wikipedia.org/wiki/Blaise_Pascal"
  },
  {
    name:"Leibniz",
    img:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg/330px-Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg",
    bio:"https://es.wikipedia.org/wiki/Gottfried_Leibniz"
  },
  {
    name:"Isaac Newton",
    img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/GodfreyKneller-IsaacNewton-1689.jpg/330px-GodfreyKneller-IsaacNewton-1689.jpg",
    bio:"https://es.wikipedia.org/wiki/Isaac_Newton"
  },
  {
    name:"Nikola Tesla",
    img:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/330px-Tesla_circa_1890.jpeg",
    bio:"https://es.wikipedia.org/wiki/Nikola_Tesla"
  }
]

export default function loadTemplates() {
  loadTemplatesHTML();
}

async function loadTemplatesHTML() {
  const response = await fetch("templates.html");
  const data = await response.text();
  templates.innerHTML = data;
  loadTemplateInHTML("header", "headerTemplate");
  loadTemplateInTemplate("footerTemplate","contactanos","contactTemplate");
  loadTemplateInHTML("footer", "footerTemplate");
  loadTemplateInHTML("mainAside","slides");
  loadTemplateInHTML("mainAside","slides");
  loadTemplateInHTML("mainAside","slides");
  loadCarousels();
  
}

function loadTemplateInHTML(sectionPrm, templatePrm) {
  let section = d.getElementById(sectionPrm),
    template = templates.content.getElementById(templatePrm),
    fragment = d.createDocumentFragment(),
    clone = document.importNode(template.content, true);

  //Sirve para no hacer muchas inserciones cuando se tiene un array de elementos.
  fragment.appendChild(clone);
  section.appendChild(fragment);
}

function loadTemplateInTemplate(receiverTemplate, idSection, originTemplate) {
  let section = templates.content.getElementById(receiverTemplate).content.getElementById(idSection),
    template = templates.content.getElementById(originTemplate),
    clone = document.importNode(template.content, true);
  section.appendChild(clone);
}

function loadCarousels (){
  const figures = d.querySelectorAll(".figureCarousel");
  figures.forEach((figure,index)=>{
    loadCarousel(figure,cientificos);
  })
}

const loadCarousel = (figure,data) => {
  let cont = 0;
  const interval = setInterval(()=>{
    console.log("interval");
    let link = figure.children[0],
      img = link.children[0],
      figcaption = link.children[1];
    
    link.classList.add("fadeIn");
    setTimeout(()=>{
      console.log("TimeOut");
      img.setAttribute("alt",data[cont].name);
      figcaption.textContent = data[cont].name;
      link.setAttribute("href",data[cont].bio);
      img.setAttribute("src",data[cont].img);
      link.classList.remove("fadeIn");
      cont++;
      if(cont >= data.length) cont = 0;
    },400);
  },5000);

  //clearInterval(interval);
}
