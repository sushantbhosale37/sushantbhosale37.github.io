(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{nwWL:function(l,n,e){"use strict";e.r(n);var t=e("8Y7J");class o{}var a=e("pMnS"),u=e("+cad"),i=e("No4M"),r=e("s7LF"),d=e("SVse"),s=e("/A74"),c=e("ol0q"),m=e("7LN8"),p=e("3Bj6"),f=e("FUWh"),g=e("KB/w"),h=e("VSng"),C=e("bAr+"),b=e("3GNW"),v=e("oygf"),T=e("AytR"),S=e("IheW");class D{constructor(l){this.http=l,this.BASE_URL=T.a.baseUrl}getRelativeFilterValues(l){return this.http.post(`${this.BASE_URL}/commonMaster/GetRelativeCommonData`,l)}getFilterValues(l){return this.http.post(`${this.BASE_URL}/commonMaster/GetCommonData`,l)}getSalesData(l){return this.http.post(`${this.BASE_URL}/sales/GetSalesData`,l)}getGetOrderData(l){return this.http.post(`${this.BASE_URL}/order/GetOrderData`,l)}saveSales(l){return this.http.post(`${this.BASE_URL}/sales/AddUpdateSales`,l)}updateSales(l){return this.http.post(`${this.BASE_URL}/sales/AddUpdateSales`,l)}deleteSales(l){return this.http.post(`${this.BASE_URL}/commonMaster/DeleteDataOnFlag`,l)}getCustomerData(l){return this.http.post(`${this.BASE_URL}/customer/GetCustomerData`,l)}getGetProductData(l){return this.http.post(`${this.BASE_URL}/product/GetProductData `,l)}checkAvailableProdQty(l){return this.http.post(`${this.BASE_URL}/sales/CheckAvailableProdQty `,l)}}D.ngInjectableDef=t.defineInjectable({factory:function(){return new D(t.inject(S.HttpClient))},token:D,providedIn:"root"});var R=e("wd/R"),y=e("EUZL");class M{constructor(l,n){this.dataFetchServ=l,this.fb=n,this.noTableData=!1,this.isForExport=!1}ngOnInit(){this.fromDate=R().toDate(),this.toDate=R().toDate(),this.todaysDate=R().toDate(),this.formNewRioModel=this.fb.group({fromDate:new r.FormControl("",r.Validators.required),toDate:new r.FormControl("",r.Validators.required)}),this.initialLoading(),this.flatTableColumnDef=[{field:"billNo",displayName:"Bill No",format:"",width:"140",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"string",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!0,colSort:!0,resizable:!0,movable:!1}},{field:"custName",displayName:"Customer Name",format:"",width:"250",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"string",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!0,colSort:!0,resizable:!0,movable:!1}},{field:"salesDate",displayName:"Date",format:"",width:"90",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"string",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!0,colSort:!0,resizable:!0,movable:!1}},{field:"netAmt",displayName:"Net. Amount",format:"Rs.",width:"100",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"string",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!1,colSort:!1,resizable:!0,movable:!1}},{field:"deliveryCharges",displayName:"Delivery Charges",format:"Rs.",width:"100",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"currency",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!1,colSort:!1,resizable:!0,movable:!1}},{field:"discountAmt",displayName:"Discount",format:"Rs.",width:"80",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"string",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!1,colSort:!1,resizable:!0,movable:!1}},{field:"totalAmt",displayName:"Total Amount",format:"Rs.",width:"90",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"currency",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!1,colSort:!1,resizable:!0,movable:!1}},{field:"paymentMode",displayName:"Payment Mode",format:"",width:"120",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"currency",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!0,colSort:!0,resizable:!0,movable:!1}},{field:"advPayment",displayName:"Adv. Payment",format:"Rs.",width:"100",value:"",condition:"",columnType:"dimensions",isClearSearch:!0,exportConfig:{format:"currency",styleinfo:{thead:"default",tdata:"white"}},formatConfig:[],options:{editable:!1,colSearch:!1,colSort:!1,resizable:!0,movable:!1}}],this.flatTableJson={page_size:50,page:0,lazy:!1,loading:!1,export:!0,sortMode:"multiple",resizableColumns:!0,columnResizeMode:"fit",reorderableColumns:!0,scrollHeight:"400px",totalRecords:1e3,columns:this.flatTableColumnDef.slice(2),selectedColumns:this.flatTableColumnDef.slice(2),frozenCols:[this.flatTableColumnDef[0],this.flatTableColumnDef[1]],frozenWidth:this.flatTableColumnDef.slice(0,2).reduce((l,n)=>l+parseInt(n.width,10),0)+"px",scrollable:!0,selectionMode:"multiple",selectedColsModal:[],selectionDataKey:"name",metaKeySelection:!0,showHideCols:!0,overallSearch:!0,columnSearch:!0}}get f(){return this.formNewRioModel.controls}initialLoading(){this.getTableData()}getTableData(){this.dataFetchServ.getSalesData({id:0,StartDate:"",EndDate:""}).subscribe(l=>{this.noTableData=!1;const n=[];let e=l;for(const o of e){const l={};l.data=o,n.push(l)}this.tblResData=n;const t=[];for(const o of e){const l={};l.billNo=o.billNo,l.custName=o.custName,l.salesDate=o.salesDate,l.netAmt=o.netAmt,l.deliveryCharges=o.deliveryCharges,l.discountAmt=o.discountAmt,l.totalAmt=o.totalAmt,l.paymentMode=o.paymentMode,l.advPayment=o.advPayment,t.push(l)}this.rows=t,this.flatTableData=n,this.flatTableJson.totalRecords=l.totalItems,this.flatTableJson.loading=!1,setTimeout(()=>{this.flatTableJson.lazy=!1},0)})}isHiddenColumn(l){return this.flatTableJson.selectedColumns.some(n=>n.field===l.field)||this.flatTableJson.frozenCols.some(n=>n.field===l.field)}clearFilter(){this.getTableData()}submitHandler(){const l={id:null,StartDate:R(this.fromDate).format("DD/MM/YYYY"),EndDate:R(this.toDate).format("DD/MM/YYYY")};this.dataFetchServ.getSalesData(l).subscribe(l=>{this.noTableData=!1;const n=[];let e=l;for(const o of e){const l={};l.data=o,n.push(l)}this.tblResData=n;const t=[];for(const o of e){const l={};l.billNo=o.billNo,l.custName=o.custName,l.salesDate=o.salesDate,l.netAmt=o.netAmt,l.deliveryCharges=o.deliveryCharges,l.discountAmt=o.discountAmt,l.totalAmt=o.totalAmt,l.paymentMode=o.paymentMode,l.advPayment=o.advPayment,t.push(l)}this.rows=t,this.flatTableData=n,this.flatTableJson.totalRecords=l.totalItems,this.flatTableJson.loading=!1,setTimeout(()=>{this.flatTableJson.lazy=!1},0)})}ngOnDestroy(){this.appConfigObs&&!this.appConfigObs.closed&&this.appConfigObs.unsubscribe()}exportExcel(){this.isForExport=!0,this.saveExcelFile()}saveExcelFile(){if(1==this.isForExport){const l="Sales_Report_"+R(this.todaysDate).format("DD_MMM_YYYY")+".xlsx",n=y.utils.json_to_sheet(this.rows);this.changeHeaders(n),y.writeFile({Sheets:{data:n},SheetNames:["data"]},l),this.isForExport=!1}}changeHeaders(l){y.utils.sheet_add_aoa(l,[["Bill No","Customer Name","Sales Date","Net Amount","Delivery Charges","Discount Amount","Total Amount","Payment Mode","Advance Payment"]]),l["!cols"]=[{wch:11},{wch:18},{wch:11},{wch:11},{wch:14},{wch:14},{wch:11},{wch:14},{wch:15}]}}var w=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function x(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,10,"div",[["class","mb-1"],["style","text-align: left; float: left; display: inline-block;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,9,"p-multiSelect",[["defaultLabel","Choose Columns"],["maxSelectedLabels","1"],["optionLabel","displayName"],["selectedItemsLabel","{0} columns selected"]],[[2,"ui-inputwrapper-filled",null],[2,"ui-inputwrapper-focus",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var t=!0;return"ngModelChange"===n&&(t=!1!==(l.component.flatTableJson.selectedColumns=e)&&t),t},u.b,u.a)),t["\u0275did"](2,13877248,null,3,i.MultiSelect,[t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{defaultLabel:[0,"defaultLabel"],style:[1,"style"],maxSelectedLabels:[2,"maxSelectedLabels"],selectedItemsLabel:[3,"selectedItemsLabel"],optionLabel:[4,"optionLabel"],options:[5,"options"]},null),t["\u0275qud"](335544320,5,{footerFacet:0}),t["\u0275qud"](335544320,6,{headerFacet:0}),t["\u0275qud"](603979776,7,{templates:1}),t["\u0275pod"](6,{minWidth:0}),t["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,function(l){return[l]},[i.MultiSelect]),t["\u0275did"](8,671744,null,0,r.NgModel,[[8,null],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,r.NgControl,null,[r.NgModel]),t["\u0275did"](10,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null)],function(l,n){var e=n.component,t=l(n,6,0,"200px");l(n,2,0,"Choose Columns",t,"1","{0} columns selected","displayName",e.flatTableJson.columns),l(n,8,0,e.flatTableJson.selectedColumns)},function(l,n){l(n,1,0,t["\u0275nov"](n,2).filled,t["\u0275nov"](n,2).focus,t["\u0275nov"](n,10).ngClassUntouched,t["\u0275nov"](n,10).ngClassTouched,t["\u0275nov"](n,10).ngClassPristine,t["\u0275nov"](n,10).ngClassDirty,t["\u0275nov"](n,10).ngClassValid,t["\u0275nov"](n,10).ngClassInvalid,t["\u0275nov"](n,10).ngClassPending)})}function N(l){return t["\u0275vid"](0,[(l()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](1,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](0,null,null,0))],function(l,n){l(n,1,0,n.component.flatTableJson.showHideCols)},null)}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"col",[],null,null,null,null,null)),t["\u0275did"](1,278528,null,0,d.NgStyle,[t.KeyValueDiffers,t.ElementRef,t.Renderer2],{ngStyle:[0,"ngStyle"]},null),t["\u0275pod"](2,{width:0})],function(l,n){var e=l(n,2,0,n.context.$implicit.width+"px");l(n,1,0,e)},null)}function E(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"colgroup",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](2,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,2,0,n.context.$implicit)},null)}function I(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"p-treeTableSortIcon",[],null,null,null,s.e,s.a)),t["\u0275did"](1,245760,null,0,c.TTSortIcon,[c.TreeTable],{field:[0,"field"]},null)],function(l,n){l(n,1,0,n.parent.context.$implicit.field)},null)}function F(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,6,"th",[["ttReorderableColumn",""],["ttResizableColumn",""]],[[2,"ui-sortable-column",null],[2,"ui-state-highlight",null],[1,"tabindex",0]],[[null,"click"],[null,"keydown.enter"],[null,"drop"]],function(l,n,e){var o=!0;return"click"===n&&(o=!1!==t["\u0275nov"](l,1).onClick(e)&&o),"keydown.enter"===n&&(o=!1!==t["\u0275nov"](l,1).onEnterKey(e)&&o),"drop"===n&&(o=!1!==t["\u0275nov"](l,3).onDrop(e)&&o),o},null,null)),t["\u0275did"](1,212992,null,0,c.TTSortableColumn,[c.TreeTable],{field:[0,"field"],ttSortableColumnDisabled:[1,"ttSortableColumnDisabled"]},null),t["\u0275did"](2,4341760,null,0,c.TTResizableColumn,[c.TreeTable,t.ElementRef,t.NgZone],{ttResizableColumnDisabled:[0,"ttResizableColumnDisabled"]},null),t["\u0275did"](3,4341760,null,0,c.TTReorderableColumn,[c.TreeTable,t.ElementRef,t.NgZone],{ttReorderableColumnDisabled:[0,"ttReorderableColumnDisabled"]},null),(l()(),t["\u0275ted"](4,null,[" "," "])),(l()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](6,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,1,0,n.context.$implicit.field,!n.context.$implicit.options.colSort),l(n,2,0,!n.context.$implicit.options.resizable),l(n,3,0,!n.context.$implicit.options.movable),l(n,6,0,n.context.$implicit.options.colSort)},function(l,n){l(n,0,0,t["\u0275nov"](n,1).isEnabled(),t["\u0275nov"](n,1).sorted,t["\u0275nov"](n,1).isEnabled()?"0":null),l(n,4,0,n.context.$implicit.displayName)})}function A(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"input",[["pInputText",""],["style","width: 100%;border-radius: 5px;\n\n                  border: 1px solid #c8c8c8;\n                  padding: 1.3px;"],["type","text"]],[[4,"visibility",null]],[[null,"input"]],function(l,n,e){var o=!0;return"input"===n&&(o=!1!==t["\u0275nov"](l.parent.parent.parent.parent,46).filter(e.target.value,l.parent.context.$implicit.field,l.parent.context.$implicit.filterMatchMode)&&o),o},null,null))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.options.colSearch?"visible":"hidden")})}function $(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,null,null,null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,A)),t["\u0275did"](2,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](0,null,null,0))],function(l,n){l(n,2,0,n.component.isHiddenColumn(n.context.$implicit))},null)}function L(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"tr",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,$)),t["\u0275did"](2,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,2,0,n.parent.context.$implicit)},null)}function P(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"tr",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,F)),t["\u0275did"](2,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,L)),t["\u0275did"](4,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](0,null,null,0))],function(l,n){var e=n.component;l(n,2,0,n.context.$implicit),l(n,4,0,e.flatTableJson.columnSearch)},null)}function z(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"input",[["pInputText",""],["type","text"],["ymInput",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var o=!0;return"input"===n&&(o=!1!==t["\u0275nov"](l,3)._handleInput(e.target.value)&&o),"blur"===n&&(o=!1!==t["\u0275nov"](l,3).onTouched()&&o),"compositionstart"===n&&(o=!1!==t["\u0275nov"](l,3)._compositionStart()&&o),"compositionend"===n&&(o=!1!==t["\u0275nov"](l,3)._compositionEnd(e.target.value)&&o),"ngModelChange"===n&&(o=!1!==(l.parent.parent.parent.context.rowData[l.parent.parent.context.$implicit.field]=e)&&o),o},null,null)),t["\u0275did"](1,278528,null,0,d.NgStyle,[t.KeyValueDiffers,t.ElementRef,t.Renderer2],{ngStyle:[0,"ngStyle"]},null),t["\u0275pod"](2,{width:0}),t["\u0275did"](3,16384,null,0,r.DefaultValueAccessor,[t.Renderer2,t.ElementRef,[2,r.COMPOSITION_BUFFER_MODE]],null,null),t["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,function(l){return[l]},[r.DefaultValueAccessor]),t["\u0275did"](5,671744,null,0,r.NgModel,[[8,null],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,r.NgControl,null,[r.NgModel]),t["\u0275did"](7,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null)],function(l,n){var e=l(n,2,0,0==n.parent.parent.context.index?"90%":"100%");l(n,1,0,e),l(n,5,0,n.parent.parent.parent.context.rowData[n.parent.parent.context.$implicit.field])},function(l,n){l(n,0,0,t["\u0275nov"](n,7).ngClassUntouched,t["\u0275nov"](n,7).ngClassTouched,t["\u0275nov"](n,7).ngClassPristine,t["\u0275nov"](n,7).ngClassDirty,t["\u0275nov"](n,7).ngClassValid,t["\u0275nov"](n,7).ngClassInvalid,t["\u0275nov"](n,7).ngClassPending)})}function V(l){return t["\u0275vid"](0,[(l()(),t["\u0275ted"](0,null,[" "," "])),t["\u0275ppd"](1,3)],null,function(l,n){var e=t["\u0275unv"](n,0,0,l(n,1,0,t["\u0275nov"](n.parent.parent.parent.parent,0),n.parent.parent.parent.context.rowData[n.parent.parent.context.$implicit.field],n.parent.parent.context.$implicit.format,n.parent.parent.context.$implicit.formatConfig));l(n,0,0,e)})}function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,6,"p-treeTableCellEditor",[],null,null,null,s.f,s.c)),t["\u0275did"](1,1097728,null,1,c.TreeTableCellEditor,[c.TreeTable,c.TTEditableColumn],null,null),t["\u0275qud"](603979776,8,{templates:1}),(l()(),t["\u0275and"](0,null,null,1,null,z)),t["\u0275did"](4,16384,[[8,4]],0,m.PrimeTemplate,[t.TemplateRef],{name:[0,"name"]},null),(l()(),t["\u0275and"](0,null,null,1,null,V)),t["\u0275did"](6,16384,[[8,4]],0,m.PrimeTemplate,[t.TemplateRef],{name:[0,"name"]},null)],function(l,n){l(n,4,0,"input"),l(n,6,0,"output")},null)}function O(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](1,null,[" "," "])),t["\u0275ppd"](2,3)],null,function(l,n){var e=t["\u0275unv"](n,1,0,l(n,2,0,t["\u0275nov"](n.parent.parent.parent.parent,0),n.parent.parent.parent.context.rowData[n.parent.parent.context.$implicit.field],n.parent.parent.context.$implicit.format,n.parent.parent.context.$implicit.formatConfig));l(n,1,0,e)})}function J(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"span",[["class","link-style-icon"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.deleteSales(l.parent.parent.parent.context.rowData)&&t),t},null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","far fa-trash-alt"]],null,null,null,null,null))],null,null)}function U(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"span",[["class","link-style-icon"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.editSales(l.parent.parent.parent.context.rowData)&&t),t},null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"i",[["class","fas fa-pencil-alt"]],null,null,null,null,null))],null,null)}function B(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,6,"span",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,O)),t["\u0275did"](2,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,J)),t["\u0275did"](4,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,U)),t["\u0275did"](6,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,2,0,"delete"!=n.parent.context.$implicit.field&&"edit"!=n.parent.context.$implicit.field),l(n,4,0,"delete"==n.parent.context.$implicit.field),l(n,6,0,"edit"==n.parent.context.$implicit.field)},null)}function G(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,6,"td",[["ttEditableColumn",""]],[[8,"title",0]],[[null,"click"],[null,"keydown"]],function(l,n,e){var o=!0;return"click"===n&&(o=!1!==t["\u0275nov"](l,1).onClick(e)&&o),"keydown"===n&&(o=!1!==t["\u0275nov"](l,1).onKeyDown(e)&&o),o},null,null)),t["\u0275did"](1,4210688,null,0,c.TTEditableColumn,[c.TreeTable,t.ElementRef,t.NgZone],{data:[0,"data"]},null),t["\u0275ppd"](2,3),(l()(),t["\u0275and"](16777216,null,null,1,null,k)),t["\u0275did"](4,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,B)),t["\u0275did"](6,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,1,0,""),l(n,4,0,n.context.$implicit.options.editable),l(n,6,0,!n.context.$implicit.options.editable)},function(l,n){var e=t["\u0275unv"](n,0,0,l(n,2,0,t["\u0275nov"](n.parent.parent,0),n.parent.context.rowData[n.context.$implicit.field],n.context.$implicit.format,n.context.$implicit.formatConfig));l(n,0,0,e)})}function H(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"tr",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,G)),t["\u0275did"](2,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,2,0,n.context.columns)},null)}function q(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"p-treeTableToggler",[],null,null,null,s.g,s.d)),t["\u0275did"](1,49152,null,0,c.TreeTableToggler,[c.TreeTable],{rowNode:[0,"rowNode"]},null)],function(l,n){l(n,1,0,n.parent.parent.context.$implicit)},null)}function K(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,6,"td",[],[[8,"title",0]],null,null,null,null)),t["\u0275ppd"](1,3),(l()(),t["\u0275and"](16777216,null,null,1,null,q)),t["\u0275did"](3,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](4,0,null,null,2,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](5,null,[" "," "])),t["\u0275ppd"](6,3)],function(l,n){l(n,3,0,0==n.context.index)},function(l,n){var e=t["\u0275unv"](n,0,0,l(n,1,0,t["\u0275nov"](n.parent.parent,0),n.parent.context.rowData[n.context.$implicit.field],n.context.$implicit.format,n.context.$implicit.formatConfig));l(n,0,0,e);var o=n.parent.context.rowData[n.context.$implicit.field]?t["\u0275unv"](n,5,0,l(n,6,0,t["\u0275nov"](n.parent.parent,0),n.parent.context.rowData[n.context.$implicit.field],n.context.$implicit.format,n.context.$implicit.formatConfig)):"";l(n,5,0,o)})}function Y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"tr",[["style","background: #f4f4f4"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,K)),t["\u0275did"](2,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,2,0,n.context.columns)},null)}function j(l){return t["\u0275vid"](0,[(l()(),t["\u0275ted"](0,null,[" Showing "," to "," of "," Records "]))],null,function(l,n){l(n,0,0,n.context.$implicit.page*n.context.$implicit.rows+1,n.context.$implicit.rows*(n.context.$implicit.page+1)>n.context.$implicit.totalRecords?n.context.$implicit.totalRecords:n.context.$implicit.rows*(n.context.$implicit.page+1),n.context.$implicit.totalRecords)})}function W(l){return t["\u0275vid"](0,[t["\u0275pid"](0,p.a,[]),t["\u0275qud"](402653184,1,{content:0}),(l()(),t["\u0275eld"](2,0,null,null,63,"div",[["id","cpr-component"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,1,"p",[["class","page-title"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Sales Report"])),(l()(),t["\u0275eld"](5,0,null,null,36,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,e){var o=!0,a=l.component;return"submit"===n&&(o=!1!==t["\u0275nov"](l,7).onSubmit(e)&&o),"reset"===n&&(o=!1!==t["\u0275nov"](l,7).onReset()&&o),"ngSubmit"===n&&(o=!1!==a.submitHandler()&&o),o},null,null)),t["\u0275did"](6,16384,null,0,r["\u0275angular_packages_forms_forms_bh"],[],null,null),t["\u0275did"](7,540672,null,0,r.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),t["\u0275prd"](2048,null,r.ControlContainer,null,[r.FormGroupDirective]),t["\u0275did"](9,16384,null,0,r.NgControlStatusGroup,[[4,r.ControlContainer]],null,null),(l()(),t["\u0275eld"](10,0,null,null,31,"div",[["class","ui-g-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,2,"div",[["class","ui-g-1 font-weight-bold"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,1,"label",[["for","fromDate"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["From Date"])),(l()(),t["\u0275eld"](14,0,null,null,7,"div",[["class","ui-g-3"]],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,6,"p-calendar",[["formControlName","fromDate"],["id","fromDate"],["name","fromDate"],["pInputText",""],["placeholder","Select Date"]],[[2,"ui-inputwrapper-filled",null],[2,"ui-inputwrapper-focus",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var t=!0,o=l.component;return"ngModelChange"===n&&(t=!1!==(o.fromDate=e)&&t),"ngModelChange"===n&&(t=!1!==(o.fromDate=e)&&t),t},f.b,f.a)),t["\u0275did"](16,1294336,null,1,g.Calendar,[t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{name:[0,"name"],placeholder:[1,"placeholder"]},null),t["\u0275qud"](603979776,2,{templates:1}),t["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,function(l){return[l]},[g.Calendar]),t["\u0275did"](19,671744,null,0,r.FormControlName,[[3,r.ControlContainer],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR],[2,r["\u0275angular_packages_forms_forms_k"]]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,r.NgControl,null,[r.FormControlName]),t["\u0275did"](21,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null),(l()(),t["\u0275eld"](22,0,null,null,2,"div",[["class","ui-g-1 font-weight-bold"]],null,null,null,null,null)),(l()(),t["\u0275eld"](23,0,null,null,1,"label",[["for","toDate"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["To Date"])),(l()(),t["\u0275eld"](25,0,null,null,7,"div",[["class","ui-g-3"]],null,null,null,null,null)),(l()(),t["\u0275eld"](26,0,null,null,6,"p-calendar",[["formControlName","toDate"],["id","toDate"],["name","toDate"],["pInputText",""],["placeholder","Select Date"]],[[2,"ui-inputwrapper-filled",null],[2,"ui-inputwrapper-focus",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var t=!0,o=l.component;return"ngModelChange"===n&&(t=!1!==(o.toDate=e)&&t),"ngModelChange"===n&&(t=!1!==(o.toDate=e)&&t),t},f.b,f.a)),t["\u0275did"](27,1294336,null,1,g.Calendar,[t.ElementRef,t.Renderer2,t.ChangeDetectorRef],{name:[0,"name"],placeholder:[1,"placeholder"]},null),t["\u0275qud"](603979776,3,{templates:1}),t["\u0275prd"](1024,null,r.NG_VALUE_ACCESSOR,function(l){return[l]},[g.Calendar]),t["\u0275did"](30,671744,null,0,r.FormControlName,[[3,r.ControlContainer],[8,null],[8,null],[6,r.NG_VALUE_ACCESSOR],[2,r["\u0275angular_packages_forms_forms_k"]]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,r.NgControl,null,[r.FormControlName]),t["\u0275did"](32,16384,null,0,r.NgControlStatus,[[4,r.NgControl]],null,null),(l()(),t["\u0275eld"](33,0,null,null,2,"div",[["class","ui-g-1 font-weight-bold"]],null,null,null,null,null)),(l()(),t["\u0275eld"](34,0,null,null,1,"button",[["class","ui-button-primary"],["icon","fa fa-search"],["label","View"],["pButton",""],["type","submit"]],[[8,"disabled",0]],null,null,null,null)),t["\u0275did"](35,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),(l()(),t["\u0275eld"](36,0,null,null,2,"div",[["class","ui-g-1 font-weight-bold"]],null,null,null,null,null)),(l()(),t["\u0275eld"](37,0,null,null,1,"button",[["class","ui-button-danger"],["icon","fa fa-trash"],["label","Clear"],["pButton",""],["type","submit"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.clearFilter()&&t),t},null,null)),t["\u0275did"](38,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),(l()(),t["\u0275eld"](39,0,null,null,2,"div",[["class","ui-g-1 font-weight-bold"]],null,null,null,null,null)),(l()(),t["\u0275eld"](40,0,null,null,1,"button",[["class","ui-button-success"],["icon","fas fa-file-excel"],["label","EXCEL"],["pButton",""],["type","submit"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.exportExcel()&&t),t},null,null)),t["\u0275did"](41,4341760,null,0,h.ButtonDirective,[t.ElementRef],{label:[0,"label"],icon:[1,"icon"]},null),(l()(),t["\u0275eld"](42,0,[[1,0],["content",1]],null,19,"div",[["class","container"],["id","content"]],null,null,null,null,null)),(l()(),t["\u0275eld"](43,0,null,null,18,"div",[["class","p-col-12 mt-1 order-table"],["style","display: inline-block; width: 100%;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](44,0,null,null,17,"p-treeTable",[],null,[[null,"selectionChange"]],function(l,n,e){var t=!0;return"selectionChange"===n&&(t=!1!==(l.component.flatTableJson.selectedColsModal=e)&&t),t},s.h,s.b)),t["\u0275prd"](512,null,c.TreeTableService,c.TreeTableService,[]),t["\u0275did"](46,1294336,[["ttFlat",4]],1,c.TreeTable,[t.ElementRef,t.NgZone,c.TreeTableService],{columns:[0,"columns"],style:[1,"style"],lazy:[2,"lazy"],paginator:[3,"paginator"],rows:[4,"rows"],first:[5,"first"],rowsPerPageOptions:[6,"rowsPerPageOptions"],sortMode:[7,"sortMode"],selectionMode:[8,"selectionMode"],dataKey:[9,"dataKey"],metaKeySelection:[10,"metaKeySelection"],loading:[11,"loading"],scrollable:[12,"scrollable"],scrollHeight:[13,"scrollHeight"],frozenWidth:[14,"frozenWidth"],frozenColumns:[15,"frozenColumns"],resizableColumns:[16,"resizableColumns"],columnResizeMode:[17,"columnResizeMode"],reorderableColumns:[18,"reorderableColumns"],value:[19,"value"],totalRecords:[20,"totalRecords"],selection:[21,"selection"]},{selectionChange:"selectionChange"}),t["\u0275qud"](603979776,4,{templates:1}),t["\u0275pod"](48,{width:0}),t["\u0275pad"](49,4),(l()(),t["\u0275and"](0,null,null,1,null,N)),t["\u0275did"](51,16384,[[4,4]],0,m.PrimeTemplate,[t.TemplateRef],{name:[0,"name"]},null),(l()(),t["\u0275and"](0,null,null,1,null,E)),t["\u0275did"](53,16384,[[4,4]],0,m.PrimeTemplate,[t.TemplateRef],{name:[0,"name"]},null),(l()(),t["\u0275and"](0,null,null,1,null,P)),t["\u0275did"](55,16384,[[4,4]],0,m.PrimeTemplate,[t.TemplateRef],{name:[0,"name"]},null),(l()(),t["\u0275and"](0,null,null,1,null,H)),t["\u0275did"](57,16384,[[4,4]],0,m.PrimeTemplate,[t.TemplateRef],{name:[0,"name"]},null),(l()(),t["\u0275and"](0,null,null,1,null,Y)),t["\u0275did"](59,16384,[[4,4]],0,m.PrimeTemplate,[t.TemplateRef],{name:[0,"name"]},null),(l()(),t["\u0275and"](0,null,null,1,null,j)),t["\u0275did"](61,16384,[[4,4]],0,m.PrimeTemplate,[t.TemplateRef],{name:[0,"name"]},null),(l()(),t["\u0275eld"](62,0,null,null,3,"p-confirmDialog",[],null,null,null,C.b,C.a)),t["\u0275did"](63,180224,null,1,b.ConfirmDialog,[t.ElementRef,t.Renderer2,v.ConfirmationService,t.NgZone],{style:[0,"style"]},null),t["\u0275qud"](335544320,9,{footer:0}),t["\u0275pod"](65,{width:0})],function(l,n){var e=n.component;l(n,7,0,e.formNewRioModel),l(n,16,0,"fromDate","Select Date"),l(n,19,0,"fromDate",e.fromDate),l(n,27,0,"toDate","Select Date"),l(n,30,0,"toDate",e.toDate),l(n,35,0,"View","fa fa-search"),l(n,38,0,"Clear","fa fa-trash"),l(n,41,0,"EXCEL","fas fa-file-excel");var t=e.flatTableJson.selectedColumns,o=l(n,48,0,"100%"),a=e.flatTableJson.lazy,u=e.flatTableJson.page_size,i=e.flatTableJson.page,r=l(n,49,0,10,20,50,100);l(n,46,1,[t,o,a,!0,u,i,r,e.flatTableJson.sortMode,e.flatTableJson.selectionMode,e.flatTableJson.selectionDataKey,e.flatTableJson.metaKeySelection,e.flatTableJson.loading,e.flatTableJson.scrollable,e.flatTableJson.scrollHeight,e.flatTableJson.frozenWidth,e.flatTableJson.frozenCols,e.flatTableJson.resizableColumns,e.flatTableJson.columnResizeMode,e.flatTableJson.reorderableColumns,e.flatTableData,e.flatTableJson.totalRecords,e.flatTableJson.selectedColsModal]),l(n,51,0,"caption"),l(n,53,0,"colgroup"),l(n,55,0,"header"),l(n,57,0,"body"),l(n,59,0,"frozenbody"),l(n,61,0,"paginatorleft");var d=l(n,65,0,"50vw");l(n,63,0,d)},function(l,n){var e=n.component;l(n,5,0,t["\u0275nov"](n,9).ngClassUntouched,t["\u0275nov"](n,9).ngClassTouched,t["\u0275nov"](n,9).ngClassPristine,t["\u0275nov"](n,9).ngClassDirty,t["\u0275nov"](n,9).ngClassValid,t["\u0275nov"](n,9).ngClassInvalid,t["\u0275nov"](n,9).ngClassPending),l(n,15,0,t["\u0275nov"](n,16).filled,t["\u0275nov"](n,16).focus,t["\u0275nov"](n,21).ngClassUntouched,t["\u0275nov"](n,21).ngClassTouched,t["\u0275nov"](n,21).ngClassPristine,t["\u0275nov"](n,21).ngClassDirty,t["\u0275nov"](n,21).ngClassValid,t["\u0275nov"](n,21).ngClassInvalid,t["\u0275nov"](n,21).ngClassPending),l(n,26,0,t["\u0275nov"](n,27).filled,t["\u0275nov"](n,27).focus,t["\u0275nov"](n,32).ngClassUntouched,t["\u0275nov"](n,32).ngClassTouched,t["\u0275nov"](n,32).ngClassPristine,t["\u0275nov"](n,32).ngClassDirty,t["\u0275nov"](n,32).ngClassValid,t["\u0275nov"](n,32).ngClassInvalid,t["\u0275nov"](n,32).ngClassPending),l(n,34,0,!e.formNewRioModel.valid)})}function Z(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ym-sales-report",[],null,null,null,W,w)),t["\u0275did"](1,245760,null,0,M,[D,r.FormBuilder],null,null)],function(l,n){l(n,1,0)},null)}var Q=t["\u0275ccf"]("ym-sales-report",M,Z,{},{},[]),X=e("9+Zv"),ll=e("IP0z"),nl=e("/HVE"),el=e("hOhj"),tl=e("66nc"),ol=e("T+K8"),al=e("nciF"),ul=e("Fa87"),il=e("qgGH"),rl=e("fBTL"),dl=e("eaP2"),sl=e("EjV3"),cl=e("3+Qx"),ml=e("mU/a"),pl=e("bjBz"),fl=e("GS5F"),gl=e("WwML"),hl=e("VYqR"),Cl=e("iInd");e.d(n,"SalesReportModuleNgFactory",function(){return bl});var bl=t["\u0275cmf"](o,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[a.a,Q]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[t.LOCALE_ID,[2,d["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,r["\u0275angular_packages_forms_forms_j"],r["\u0275angular_packages_forms_forms_j"],[]),t["\u0275mpd"](4608,r.FormBuilder,r.FormBuilder,[]),t["\u0275mpd"](4608,p.a,p.a,[]),t["\u0275mpd"](4608,v.ConfirmationService,v.ConfirmationService,[]),t["\u0275mpd"](1073742336,d.CommonModule,d.CommonModule,[]),t["\u0275mpd"](1073742336,r["\u0275angular_packages_forms_forms_bc"],r["\u0275angular_packages_forms_forms_bc"],[]),t["\u0275mpd"](1073742336,r.FormsModule,r.FormsModule,[]),t["\u0275mpd"](1073742336,X.a,X.a,[]),t["\u0275mpd"](1073742336,r.ReactiveFormsModule,r.ReactiveFormsModule,[]),t["\u0275mpd"](1073742336,m.SharedModule,m.SharedModule,[]),t["\u0275mpd"](1073742336,ll.a,ll.a,[]),t["\u0275mpd"](1073742336,nl.b,nl.b,[]),t["\u0275mpd"](1073742336,el.ScrollingModule,el.ScrollingModule,[]),t["\u0275mpd"](1073742336,i.MultiSelectModule,i.MultiSelectModule,[]),t["\u0275mpd"](1073742336,tl.DialogModule,tl.DialogModule,[]),t["\u0275mpd"](1073742336,ol.CheckboxModule,ol.CheckboxModule,[]),t["\u0275mpd"](1073742336,al.DropdownModule,al.DropdownModule,[]),t["\u0275mpd"](1073742336,ul.InputTextModule,ul.InputTextModule,[]),t["\u0275mpd"](1073742336,il.SpinnerModule,il.SpinnerModule,[]),t["\u0275mpd"](1073742336,rl.PanelModule,rl.PanelModule,[]),t["\u0275mpd"](1073742336,h.ButtonModule,h.ButtonModule,[]),t["\u0275mpd"](1073742336,dl.SelectButtonModule,dl.SelectButtonModule,[]),t["\u0275mpd"](1073742336,g.CalendarModule,g.CalendarModule,[]),t["\u0275mpd"](1073742336,sl.ProgressSpinnerModule,sl.ProgressSpinnerModule,[]),t["\u0275mpd"](1073742336,cl.a,cl.a,[]),t["\u0275mpd"](1073742336,ml.PaginatorModule,ml.PaginatorModule,[]),t["\u0275mpd"](1073742336,c.TreeTableModule,c.TreeTableModule,[]),t["\u0275mpd"](1073742336,pl.InputSwitchModule,pl.InputSwitchModule,[]),t["\u0275mpd"](1073742336,b.ConfirmDialogModule,b.ConfirmDialogModule,[]),t["\u0275mpd"](1073742336,fl.ProgressBarModule,fl.ProgressBarModule,[]),t["\u0275mpd"](1073742336,gl.MessagesModule,gl.MessagesModule,[]),t["\u0275mpd"](1073742336,hl.FileUploadModule,hl.FileUploadModule,[]),t["\u0275mpd"](1073742336,Cl.RouterModule,Cl.RouterModule,[[2,Cl["\u0275angular_packages_router_router_a"]],[2,Cl.Router]]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,Cl.ROUTES,function(){return[[{path:"",component:M}]]},[])])})}}]);