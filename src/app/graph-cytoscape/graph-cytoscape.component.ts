import { Component, OnInit } from '@angular/core';
import { FusekirefibraService } from 'src/app/service/fusekirefibra.service'
import { IItemRefibra } from "src/app/basic/itemRefibra.interface"
import { IItemRefibraRelation } from '../basic/itemRefibraRelation.interface';
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';

declare var cytoscape: any;
const nodesRefibra = [] as  any;
const relationRefibra = [] as  any;

@Component({
  selector: 'app-graph-cytoscape-component',
  templateUrl: './graph-cytoscape.component.html',
  styleUrls: ['./graph-cytoscape.component.css' ]
})
export class GraphCytoscapeComponent implements OnInit {

  constructor(    
    public restApi: FusekirefibraService,
  ) {}
  
  
  
  
  itensRdf: IItemRefibra[];
  itensRdfRelation: IItemRefibraRelation[];


   /*************************** */            
   async highlight( node ) : Promise<void>{
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
  async  getAllItens() : Promise<void>{
    this.restApi.getAllItens()
      .subscribe(
        (data: IItemRefibra[]) =>  { //start of (1)
          this.itensRdf = data;
          if(this.itensRdf.length > 0){
            this.itensRdf.forEach((element)=>{
                nodesRefibra.push({ data: { id: element.item, foo: 3, bar: 5, baz: 2 } });
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

  async getAllItensRelation() : Promise<void> {
    this.restApi.getAllItensRelation()
      .subscribe(
        (data: IItemRefibraRelation[]) =>  { //start of (1)
          this.itensRdfRelation = data;
          if(this.itensRdfRelation.length > 0){
             this.itensRdfRelation.forEach(element=>{
              relationRefibra.push( { data: { source: element.item1, target: element.item2 } });
            });
             
            this.loadCytoscape();
             
          }
          else
           console.log("oi");
        }, //end of (1)
        (error: any)   => console.log(error), //(2) second argument
        ()             => console.log('all data gets') //(3) second argument
      );
  }

  async loadCytoscape() : Promise<void>{
    cytoscape.cy = cytoscape({
      container: document.getElementById('cy'),

      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          'width': '60px',
          'height': '60px',
          'content': 'data(id)',
          'pie-size': '80%',
          'pie-1-background-color': '#E8747C',
          'pie-1-background-size': 'mapData(foo, 0, 10, 0, 100)',
          'pie-2-background-color': '#74CBE8',
          'pie-2-background-size': 'mapData(bar, 0, 10, 0, 100)',
          'pie-3-background-color': '#74E883',
          'pie-3-background-size': 'mapData(baz, 0, 10, 0, 100)'
        })
        .selector('edge')
        .css({
          'curve-style': 'bezier',
          'width': 4,
          'target-arrow-shape': 'triangle',
          'opacity': 0.5
        })
        .selector(':selected')
        .css({
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'opacity': 1
        })
        .selector('.faded')
        .css({
          'opacity': 0.25,
          'text-opacity': 0
        }),

      elements: {
        nodes: nodesRefibra,
        edges: relationRefibra        
      },

      layout: {
        name: 'circle',
        padding: 10
      },
     
    });

     /*****************EVENTS */
     cytoscape.cy.on('doubleTap', function(event, originalTapEvent) {    
      alert("double-click");
     });

     var previousTapStamp = 0;
     cytoscape.cy.on('tap', 'node', (e)=>{     
      this.highlight(this);   
      
      var doubleClickDelayMs = 350;
     
      var currentTapStamp = e.timeStamp;
      var msFromLastTap = currentTapStamp - previousTapStamp;
  
      console.log("last: " +msFromLastTap);
      console.log("Delay: " + doubleClickDelayMs);

      if (msFromLastTap < doubleClickDelayMs) {
          e.target.trigger('doubleTap', e);
      }
      else{
        alert("click");
      }
      previousTapStamp = currentTapStamp;
      
    });
    /************************** */


  }

   ngOnInit(){

 this.getAllItens();
    
    console.log(nodesRefibra);
    console.log(relationRefibra);
      
         
           
           /**************************** */
    }  
  }
  