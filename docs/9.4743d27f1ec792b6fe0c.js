(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"+nDP":function(l,n,e){"use strict";e.r(n);var t=e("8Y7J");class u{}var a=e("pMnS"),o=e("SVse"),i=e("hpmT"),r=e("4WZM"),s=e("3Bj6");class d{deserialize(l){return Object.assign(this,l),this}}e("J9tS");class c{constructor(l){this.libServ=l}ngOnInit(){this.cards=this.cardsJson.map(l=>(new d).deserialize(l)),this.cardsChunk=this.cards.length<4?[this.cards]:this.libServ.chunk(this.cards,parseInt((this.cards.length/2).toFixed(),10))}}var f=e("n+z6"),p=t["\u0275crt"]({encapsulation:0,styles:[[".cards-container[_ngcontent-%COMP%]{margin-top:1rem!important;margin-bottom:-.3rem!important}.card-image[_ngcontent-%COMP%]{max-width:60px;max-height:60px;opacity:.6}i[_ngcontent-%COMP%]{font-size:2.5rem;opacity:.6}.card-icon[_ngcontent-%COMP%]{float:left;margin:15px;width:3rem;text-align:center}"]],data:{}});function m(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,14,"div",[["class","p-col"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"p",[["style","float: left; margin: 23px 15px;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"i",[],null,null,null,null,null)),t["\u0275did"](3,278528,null,0,o.NgClass,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2],{ngClass:[0,"ngClass"]},null),(l()(),t["\u0275eld"](4,0,null,null,10,"p-card",[["styleClass","ui-card-shadow"]],null,null,null,i.b,i.a)),t["\u0275did"](5,49152,null,2,r.Card,[t.ElementRef],{style:[0,"style"],styleClass:[1,"styleClass"]},null),t["\u0275qud"](335544320,1,{headerFacet:0}),t["\u0275qud"](335544320,2,{footerFacet:0}),t["\u0275pod"](8,{"background-color":0}),(l()(),t["\u0275eld"](9,0,null,1,5,"span",[],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"h6",[],null,null,null,null,null)),(l()(),t["\u0275ted"](11,null,[" "," "])),(l()(),t["\u0275eld"](12,0,null,null,2,"h5",[],null,null,null,null,null)),(l()(),t["\u0275ted"](13,null,[" "," "])),t["\u0275ppd"](14,3)],function(l,n){l(n,3,0,n.context.$implicit.imageClass);var e=l(n,8,0,n.context.$implicit.color);l(n,5,0,e,"ui-card-shadow")},function(l,n){l(n,11,0,n.context.$implicit.displayName);var e=t["\u0275unv"](n,13,0,l(n,14,0,t["\u0275nov"](n.parent.parent,0),n.context.$implicit.value,n.context.$implicit.format,n.context.$implicit.config));l(n,13,0,e)})}function g(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"div",[["class","p-grid"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,m)),t["\u0275did"](2,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,2,0,n.context.$implicit)},null)}function b(l){return t["\u0275vid"](0,[t["\u0275pid"](0,s.a,[]),(l()(),t["\u0275eld"](1,0,null,null,2,"div",[["class","cards-container"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](3,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,3,0,n.component.cardsChunk)},null)}var h=e("VSng"),v=e("iInd"),C=e("AytR"),k=e("IheW");class y{constructor(l){this.http=l,this.BASE_URL=C.a.baseUrl}getCardData(){return this.http.post(`${this.BASE_URL}/commonMaster/GetMasterData`,{})}}y.ngInjectableDef=t.defineInjectable({factory:function(){return new y(t.inject(k.HttpClient))},token:y,providedIn:"root"});var w=e("2gpa"),_=(e("24Yq"),e("pGrQ")),R=e("kKz3"),N=e("2pr5");class O{constructor(l,n,e){this.libServ=l,this.dataFetchServ=n,this.dialogService=e,this.noTableData=!1,this.filtersApplied={},this.appConfig={},this.cardsJson=[],this.showCards=!1}ngOnInit(){this.cardsJson=[{field:"total_Customer",displayName:"Total Customer",value:0,imageClass:"fas fa-eye",format:"number",config:[],color:"#bd94ff"},{field:"total_Product",displayName:"Total Product",value:0,imageClass:"fas fa-eye",format:"number",config:[],color:"#7dd4ee"},{field:"total_Sale_TRN",displayName:"Total Sales Transaction",value:0,imageClass:"fas fa-eye",format:"number",config:[],color:"#71e071"},{field:"total_advOrder",displayName:"Total Order",value:0,imageClass:"fas fa-hand-holding-usd",format:"number",config:[],color:"#ffa500"},{field:"total_Done",displayName:"Total Done Order",value:0,imageClass:"fas fa-dollar-sign",format:"number",config:[],color:"#e27197"},{field:"total_Ready",displayName:"Total Ready Order",value:0,imageClass:"fas fa-percent",format:"number",config:[2],color:"#FFDC00"},{field:"total_Pending",displayName:"Total Pending Order",value:0,imageClass:"fas fa-funnel-dollar",format:"number",config:[],color:"#8094f2"},{field:"total_Cancel",displayName:"Total Cancel Order",value:0,imageClass:"fas fa-file-invoice-dollar",format:"number",config:[],color:"#f28a9d"}],this.loadCards()}loadCards(){this.showCards=!1,this.dataFetchServ.getCardData().subscribe(l=>{this.libServ.isEmptyObj(l.table)?this.cardsJson.map(l=>{l.value=0}):(this.cardsJson.map(n=>{n.value=l.table[0][n.field]}),this.cardsJson[3].value=l.table[0].total_Done+l.table[0].total_Ready+l.table[0].total_Pending+l.table[0].total_Cancel),this.showCards=!0})}NewCustomer(){this.dialogService.open(w.a,{data:{isEdit:!1},header:"New Customer",contentStyle:{width:"75vw"}}).onClose.subscribe(l=>{this.loadCards()})}NewProduct(){this.dialogService.open(_.a,{data:{isEdit:!1},header:"New Product",contentStyle:{width:"50vw"}}).onClose.subscribe(l=>{this.loadCards()})}NewCakeOrder(){this.dialogService.open(R.a,{data:{isEdit:!1},header:"New Cake Order",contentStyle:{width:"75vw"}}).onClose.subscribe(l=>{this.loadCards()})}NewSales(){this.dialogService.open(N.a,{data:{isEdit:!1},header:"New Sales",contentStyle:{width:"75vw"}}).onClose.subscribe(l=>{this.loadCards()})}ngOnDestroy(){this.appConfigObs&&!this.appConfigObs.closed&&this.appConfigObs.unsubscribe()}}var x=e("6xRK"),M=t["\u0275crt"]({encapsulation:0,styles:[[".dashboard-page[_ngcontent-%COMP%]{background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.3)),to(rgba(0,0,0,.3))),url(/assets/images/multicake.jpeg) center center no-repeat fixed;background:linear-gradient(180deg,rgba(0,0,0,.3),rgba(0,0,0,.3)),url(/assets/images/multicake.jpeg) center center no-repeat fixed;background-size:cover;overflow:hidden;height:97vh}.shotCutButton[_ngcontent-%COMP%]{height:90px;text-align:center}.buttons[_ngcontent-%COMP%]{height:60px;width:200px;font-size:16px!important;color:#161616!important;font-weight:700}.shortcuts[_ngcontent-%COMP%]{text-align:center;font-size:20px;font-weight:700;color:#06f;text-decoration:underline;background-color:#fff4a4}.borderMain[_ngcontent-%COMP%]{border:2px solid #1b00ff;margin:10px}"]],data:{}});function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ym-cards",[],null,null,null,b,p)),t["\u0275did"](1,114688,null,0,c,[f.a],{cardsJson:[0,"cardsJson"]},null)],function(l,n){l(n,1,0,n.component.cardsJson)},null)}function B(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,39,"div",[["class","app-container dashboard-page"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"div",[["class","ui-g-12"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](3,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](4,0,null,null,35,"div",[["class","ui-g borderMain"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,2,"div",[["class","ui-g-12 shortcuts"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Shortcuts"])),(l()(),t["\u0275eld"](8,0,null,null,15,"div",[["class","ui-g-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,4,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,3,"button",[["class","ui-button-success buttons"],["icon","fas fa-user-edit"],["label","Customer Master"],["pButton",""],["style","background-color: #66de9b; border: 1px solid #66de9b;"],["type","submit"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t["\u0275nov"](l,12).onClick()&&u),u},null,null)),t["\u0275did"](11,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),t["\u0275did"](12,16384,null,0,v.RouterLink,[v.Router,v.ActivatedRoute,[8,null],t.Renderer2,t.ElementRef],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](13,1),(l()(),t["\u0275eld"](14,0,null,null,4,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,3,"button",[["class","ui-button-success buttons"],["icon","fas fa-user-edit"],["label","Product Master"],["pButton",""],["style","background-color: #e686ae; border: 1px solid #e686ae;"],["type","submit"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t["\u0275nov"](l,17).onClick()&&u),u},null,null)),t["\u0275did"](16,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),t["\u0275did"](17,16384,null,0,v.RouterLink,[v.Router,v.ActivatedRoute,[8,null],t.Renderer2,t.ElementRef],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](18,1),(l()(),t["\u0275eld"](19,0,null,null,4,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,3,"button",[["class","ui-button-success buttons"],["icon","fas fa-user-edit"],["label","Order Master"],["pButton",""],["style","background-color: #c3ee6f; border: 1px solid #c3ee6f;"],["type","submit"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t["\u0275nov"](l,22).onClick()&&u),u},null,null)),t["\u0275did"](21,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),t["\u0275did"](22,16384,null,0,v.RouterLink,[v.Router,v.ActivatedRoute,[8,null],t.Renderer2,t.ElementRef],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](23,1),(l()(),t["\u0275eld"](24,0,null,null,5,"div",[["class","ui-g-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](25,0,null,null,0,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](26,0,null,null,2,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](27,0,null,null,1,"button",[["class","ui-button-success buttons"],["icon","fas fa-user-edit"],["label","New Sales Transation"],["pButton",""],["style","background-color: #f6d531; border: 1px solid #f6d531;"],["type","submit"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.NewSales()&&t),t},null,null)),t["\u0275did"](28,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),(l()(),t["\u0275eld"](29,0,null,null,0,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](30,0,null,null,9,"div",[["class","ui-g-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](31,0,null,null,2,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](32,0,null,null,1,"button",[["class","ui-button-success buttons"],["icon","fas fa-user-edit"],["label","New Customer"],["pButton",""],["style","background-color: #7da1f0; border: 1px solid #7da1f0;"],["type","submit"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.NewCustomer()&&t),t},null,null)),t["\u0275did"](33,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),(l()(),t["\u0275eld"](34,0,null,null,2,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](35,0,null,null,1,"button",[["class","ui-button-success buttons"],["icon","fas fa-user-edit"],["label","New Product"],["pButton",""],["style","background-color: #e4ac73; border: 1px solid #e4ac73;"],["type","submit"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.NewProduct()&&t),t},null,null)),t["\u0275did"](36,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),(l()(),t["\u0275eld"](37,0,null,null,2,"div",[["class","ui-g-4 shotCutButton"]],null,null,null,null,null)),(l()(),t["\u0275eld"](38,0,null,null,1,"button",[["class","ui-button-success buttons"],["icon","fas fa-user-edit"],["label","New Order"],["pButton",""],["style","background-color: #c67bff; border: 1px solid #c67bff;"],["type","submit"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.NewCakeOrder()&&t),t},null,null)),t["\u0275did"](39,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null)],function(l,n){l(n,3,0,n.component.showCards),l(n,11,0,"Customer Master","fas fa-user-edit");var e=l(n,13,0,"/customer");l(n,12,0,e),l(n,16,0,"Product Master","fas fa-user-edit");var t=l(n,18,0,"/product");l(n,17,0,t),l(n,21,0,"Order Master","fas fa-user-edit");var u=l(n,23,0,"/order");l(n,22,0,u),l(n,28,0,"New Sales Transation","fas fa-user-edit"),l(n,33,0,"New Customer","fas fa-user-edit"),l(n,36,0,"New Product","fas fa-user-edit"),l(n,39,0,"New Order","fas fa-user-edit")},null)}function D(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ym-dashboard-app",[],null,null,null,B,M)),t["\u0275did"](1,245760,null,0,O,[f.a,y,x.DialogService],null,null)],function(l,n){l(n,1,0)},null)}var P=t["\u0275ccf"]("ym-dashboard-app",O,D,{},{},[]),E=e("s7LF"),F=e("9+Zv"),L=e("7LN8"),T=e("F+M6");e.d(n,"DashboardAppRoutesAppModuleNgFactory",function(){return I});var I=t["\u0275cmf"](u,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[a.a,P]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,o.NgLocalization,o.NgLocaleLocalization,[t.LOCALE_ID,[2,o["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,E["\u0275angular_packages_forms_forms_j"],E["\u0275angular_packages_forms_forms_j"],[]),t["\u0275mpd"](4608,s.a,s.a,[]),t["\u0275mpd"](1073742336,o.CommonModule,o.CommonModule,[]),t["\u0275mpd"](1073742336,h.ButtonModule,h.ButtonModule,[]),t["\u0275mpd"](1073742336,F.a,F.a,[]),t["\u0275mpd"](1073742336,E["\u0275angular_packages_forms_forms_bc"],E["\u0275angular_packages_forms_forms_bc"],[]),t["\u0275mpd"](1073742336,E.FormsModule,E.FormsModule,[]),t["\u0275mpd"](1073742336,L.SharedModule,L.SharedModule,[]),t["\u0275mpd"](1073742336,r.CardModule,r.CardModule,[]),t["\u0275mpd"](1073742336,T.a,T.a,[]),t["\u0275mpd"](1073742336,v.RouterModule,v.RouterModule,[[2,v["\u0275angular_packages_router_router_a"]],[2,v.Router]]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,v.ROUTES,function(){return[[{path:"",component:O}]]},[])])})}}]);