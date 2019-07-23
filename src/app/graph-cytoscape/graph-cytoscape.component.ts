import { Component, OnInit } from '@angular/core';
import { FusekirefibraService } from 'src/app/service/fusekirefibra.service'
import { IItemRefibra } from "src/app/basic/itemRefibra.interface"
import { IItemRefibraRelation } from '../basic/itemRefibraRelation.interface';
import { ActivatedRoute, Router } from '@angular/router'

const prefix = "http://metadadorefibra.ufpe/";
const nodesRefibra = [] as  any;
const relationRefibra = [] as  any;
declare var cytoscape: any;
var cytoscapeStyle: any;

@Component({
  selector: 'app-graph-cytoscape-component',
  templateUrl: './graph-cytoscape.component.html',
  styleUrls: ['./graph-cytoscape.component.css' ]
})
export class GraphCytoscapeComponent implements OnInit {
  itensRdf: IItemRefibra[];
  itensRdfRelation: IItemRefibraRelation[];
  constructor(    
    public restApi: FusekirefibraService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
       
  highlight(node){
    var allEles = cytoscape.cy.elements();
    var layoutPadding = 50;
    var aniDur = 500;
    var easing = 'linear';
    var nhood =  node.closedNeighborhood();
    var others = cytoscape.cy.elements().not( nhood ); 
  
    var fit = function(){
      return cytoscape.cy.animation({
        fit: {
          eles: nhood.filter(':visible')
         , padding: layoutPadding
        },
        easing: easing,
        duration: aniDur
      }).play().promise();
    };            
    var showOthersFaded = function(){
        cytoscape.cy.batch(function(){
          others.removeClass('hidden').addClass('faded');
        });                
    };            
    var runLayout = function(){
      var l = nhood.filter(':visible').makeLayout({
        name: 'concentric',
        fit: false,
        animate: true,
        animationDuration: aniDur,
        animationEasing: easing,
        avoidOverlap: true,
        concentric: function( ele ){
          if( ele.same( node ) ){
            return 4;
          } else {
            return 1;
          }
        },
        levelWidth: function(){ return 1; },
        padding: layoutPadding
      });            
      var promise = cytoscape.cy.promiseOn('layoutstop');
      l.run();
      return promise;
    };           

    var reset = function(){
      cytoscape.cy.batch(function(){
        others.addClass('hidden');
        nhood.removeClass('hidden');
        allEles.removeClass('faded highlighted');
        nhood.addClass('highlighted');
      });           
    };
  
    var linas = function(){
      node.connectedEdges().addClass('.edgehighlighted');
    }           
  
    return Promise.resolve()
    .then( reset )
    .then( runLayout )
    .then( fit )
    .then( showOthersFaded )
    .then( linas );
  } 
  getAllItens(){
      this.restApi.getAllItens()
      .subscribe(
        (data: IItemRefibra[]) =>  { //start of (1)
          this.itensRdf = data;
          if(this.itensRdf.length > 0){
            this.itensRdf.forEach((element)=>{
                nodesRefibra.push({ data: { id: element.item.replace(prefix,""), nameImg: element.image} });
            });   
            this.getAllItensRelation();        
          }
          else
           console.log("oi");
        }, //end of (1)
        (error: any)   => console.log(error), //(2) second argument
        ()             => console.log('all data gets') //(3) second argument
      );
  }
  getAllItensRelation(){
    return new Promise(()=>{
    this.restApi.getAllItensRelation()
      .subscribe(
        (data: IItemRefibraRelation[]) =>  { //start of (1)
          this.itensRdfRelation = data;
          if(this.itensRdfRelation.length > 0){
             this.itensRdfRelation.forEach(element=>{
              let item1 = element.item1.replace(prefix,"")
              let item2 = element.item2.replace(prefix,"")
              let label =  element.obj.replace(prefix, "").replace("http://pt.dbpedia.org/resource/","").replace("http://pt.wikipedia.org/wiki/","") ;

              if(relationRefibra.some(x => x.data.source === item2
                && x.data.target === item1
                && x.data.label === label
              ) === false){
                relationRefibra.push( { data: { source: item1, target: item2, label:  label}, classes: 'autorotate' } ); 
              }
              
            });
            //this.loadCytoscape();
            this.loadStyle();
          }
          else
           console.log("oi");
        }, //end of (1)
        (error: any)   => console.log(error), //(2) second argument
        ()             => console.log('all data gets') //(3) second argument
      );
    });
  }
  loadStyle(){
    
    cytoscapeStyle  = cytoscape.stylesheet()
    .selector('node')
    .css({
      'height': 50,
      'width': 50,
      'background-fit': 'cover',
      'border-color': '#000',
      'border-width': 3,
      'border-opacity': 0.5
    })
    .selector('.autorotate')
    .css({
      "edge-text-rotation": "autorotate"
    }) 
   
    .selector('node:selected')
    .css({
      'width': 80,
    'height': 80,
    'border-color': 'rgb(187, 219, 247)',
    'border-opacity': 0.5,
    'border-width': 10,
    })
    .selector('node.highlighted')
    .css({
      "min-zoomed-font-size": "0",
      'z-index': '9999'
    })
    .selector('.edgehighlighted')
    .css({
      'z-index': '9999',
      'line-color': '#ffaaaa',
      'font-size': 15,
      'color': '#000',
      "opacity": "1",
      'width': 5 
    })
    .selector('.hidden')
    .css({
      "display": "none"
    })
    .selector('.faded')
    .css({
      "events": "no"
    })
    .selector('node.faded')
    .css({
      "opacity": "0.08"
    })
    .selector('edge.faded')
    .css({
      "opacity": "0.06"
    })
  .selector('edge')
    .css({
      'curve-style': 'bezier',
      'width': 4,
      'font-size': 12,
      'line-color': '#d1d1e0',
      'target-arrow-color': '#ffaaaa',
      'label': 'data(label)' 
    });
     nodesRefibra.forEach(element => {
        cytoscapeStyle.selector('#' +element.data.id.replace(prefix,""))
          .css({
          'background-image': "url(data:image/jpg;base64," +(element.data.nameImg)+ ")"
        });
      });

        this.loadCytoscape(); 
  }
  loadCytoscape(){
    
    cytoscape.cy = cytoscape({
      container: document.getElementById('cy'),
      style: cytoscapeStyle ,
      elements: {
        nodes: nodesRefibra,
        edges: relationRefibra        
      },
      layout: {
        name: 'circle',
        padding: 10
      } 
    });    
    
     /*****************EVENTS */
     cytoscape.cy.on('doubleTap', function(event, originalTapEvent) {    
      alert("double-click");
     });

     var previousTapStamp = 0;
     cytoscape.cy.on('tap', 'node', (e)=>{ 
       this.highlight(e.target);   
      
        var doubleClickDelayMs = 350;      
        var currentTapStamp = e.timeStamp;
        var msFromLastTap = currentTapStamp - previousTapStamp;
    
        console.log("last: " +msFromLastTap);
        console.log("Delay: " + doubleClickDelayMs);

        if (msFromLastTap < doubleClickDelayMs) {
            e.target.trigger('doubleTap', e);
        }
        else{
          //alert("click");
        }
        previousTapStamp = currentTapStamp;
      
    });
    /************************** */


  }
  ngOnInit(){
    this.route
      .queryParams
      .subscribe(params => {
        let valueSearch = params['valueSearch'];
        if(valueSearch !== undefined){
          this.getItensByRelationName(valueSearch);
        }
        else{
          this.getAllItens();
        }
      });

    
  }  

  getItensByRelationName(valueSearch: string){
    this.restApi.getItensByRelationName(valueSearch)
    .subscribe(
      (data: IItemRefibra[]) =>  { //start of (1)
        this.itensRdf = data;
        
        if(this.itensRdf.length > 0){
           this.itensRdf.forEach((element)=>{
               nodesRefibra.push({ data: { id: element.title.replace(prefix,""), nameImg: element.image} });
               element.listRelationItem.forEach(relation => {
              
                let item1 = relation.item1.replace(prefix,"")
                let item2 = relation.item2.replace(prefix,"")
                let label =  relation.obj.replace(prefix, "").replace("http://pt.dbpedia.org/resource/","").replace("http://pt.wikipedia.org/wiki/","") ;

                if(this.itensRdf.some(x => x.title === item1) &&
                  this.itensRdf.some(x => x.title === item2)){

                    if(relationRefibra.some(x => x.data.source === item2
                      && x.data.target === item1
                      && x.data.label === label
                    ) === false){
                      relationRefibra.push( { data: { source: item1, target: item2, label:  label}, classes: 'autorotate' } ); 
                    }
                    
                }
               });
              
              });   

              console.log(relationRefibra);
                 

              this.loadStyle();
        }
        else
         console.log("oi");
      }, //end of (1)
      (error: any)   => console.log(error), //(2) second argument
      ()             => console.log('all data gets') //(3) second argument
    );
}
}  