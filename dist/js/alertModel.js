
class alertmodel{
    constructor(){
        this.model = new bootstrap.Modal('#alertModel');
        this.header = $("#alertModelHeader");
        this.body = $("#alertModelBody");
        this.footer = $("#alertModelFooter");
    }
    show=()=>{
        this.model.show();
    }
    hide=()=>{
        this.model.hide();
    }
    setHeader=(text)=>{
        this.header.text(text);
    }
    setBody=(text)=>{
        this.body.text(text);
    }
    getFooterObj = ()=>{
        return $("<button>").attr("type","button").attr("class","btn btn-secondary").attr("data-bs-dismiss","modal").text("確認");
    }
    setDefaultFooter = ()=>{
        this.footer.empty();
        this.footer.append($("<button>").attr("type","button").attr("class","btn btn-secondary").attr("data-bs-dismiss","modal").text("確認"));
    }
}
let alertModel;

$(()=>{
    alertModel = new alertmodel();
})