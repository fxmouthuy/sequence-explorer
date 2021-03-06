import * as d3 from "d3";

export function transitionToSingle(parent, clickedElement, _trans) {
  var trans = (typeof _trans !== "undefined") ? _trans : d3.transition().duration(1000);
    
  parent.selectAll("g.sankeyFrame")
    .each(function() {
      if (this === clickedElement) {
        d3.select(this) // set class
            .classed("multiples", false)
            .classed("single", true);

        d3.select(this) // transition frame
            .transition(trans)
            .attr("transform", "translate(0, 0)");
            
        d3.select(this).selectAll("g.pTop") // transition top padding
            .transition(trans)
            .attr("transform", function(d) {return d.single;});
          
        d3.select(this).selectAll("text.col.multiples") // hide col title on top
            .transition(trans)
            .style("opacity", 0);
            
        d3.select(this).selectAll("text.col.single") // display row + col title on top
            .transition(trans)
            .style("opacity", 1); 
            
        d3.select(this).selectAll("text.nodeLabel") // display nodeLabels
            .transition(trans)
            .style("opacity", 1); 
          
        d3.select(this).selectAll("g.pLeft") // hide left padding g
            .transition(trans)
            .style("opacity", 0); 
          
        d3.select(this).selectAll(".sankeyNode,.sankeyNodeInfo") // display edge of rectangles
            .transition(trans)
            .style("stroke-width", "1px");          
          
        d3.select(this).selectAll("g.sankeySeq") // transition graph 
            .transition(trans)
            .attr("transform", function(d) {return d.single;});
            
        parent.selectAll(".axis") // show axes for sequence and categories
            .transition().delay(800)
            .style("opacity", 1); 

        parent.selectAll(".coverSankeySeq") // hide surrounding rectangle
            .transition(trans)
            .style("opacity", 0);                         

      } else {
        d3.select(this) // set class
            .classed("multiples", false);

        d3.select(this)
              .transition(trans)
              .attr("transform", function(d) {return d.single;})
              .style("opacity", 0)
              .style("pointer-events", "none");
              
        d3.select(this).selectAll(".sankeyNode,.sankeyNodeInfo") // display edge of rectangles
              .transition(trans)
              .style("stroke-width", "1px");  
      }
    });
  return false;
}
  
export function transitionToMultiples(parent, clickedElement) {
  var trans = d3.transition()
      .duration(1000);
      
  parent.selectAll("g.sankeyFrame")
    .classed("multiples", true)
    .each(function() {
      if (this === clickedElement) {
        d3.select(this) // set class
            .classed("single", false);

        d3.select(this)
            .transition(trans)
            .attr("transform", function(d) { return d.multiples;});

        d3.select(this).selectAll("g.pTop") // transition top padding
            .transition(trans)
            .attr("transform", function(d) {return d.multiples;});  
            
        d3.select(this).selectAll("text.col.multiples") // display col title on top
            .transition(trans)
            .style("opacity", 1);
            
        d3.select(this).selectAll("text.col.single") // hide row + col title on top
            .transition(trans)
            .style("opacity", 0);           

        d3.select(this).selectAll("text.nodeLabel") // hide nodeLabels
            .transition(trans)
            .style("opacity", 0); 
            
        d3.select(this).selectAll("g.pLeft") // display left padding g
            .transition(trans)
            .style("opacity", 1); 
          
        d3.select(this).selectAll(".sankeyNode,.sankeyNodeInfo") // hide edge of rectangles
            .transition(trans)
            .style("stroke-width", "0px");           
          
        d3.select(this).selectAll("g.sankeySeq") // transition graph 
            .transition(trans)
            .attr("transform", function(d) {return d.multiples;});  

        parent.selectAll(".axis")
            .transition(trans)
            .style("opacity", 0);
            
        parent.selectAll(".coverSankeySeq")
            .transition(trans)
            .style("opacity", 1);     
                      
      } else {
        d3.select(this)
            .transition(trans)
            .attr("transform", function(d) {return d.multiples;})
            .style("opacity", 1)
            .style("pointer-events", "auto");
            
        d3.select(this).selectAll(".sankeyNode,.sankeyNodeInfo") // hide edge of rectangles
            .transition(trans)
            .style("stroke-width", "0px");
      }
    });   
  return true;
}