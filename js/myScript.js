var Item = function(name, article, cost, number, date, time) {
	this.name = name;
	this.article = article;
	this.cost = cost;
	this.number = number;
	this.date = date;
	this.time = time;
}

var calculatedSum = 0;


$(document).ready(function(){

	//add item at the table
	$("#add").click(function(){
		var date = new Date();
		//var sumArray = new Array();
		var fullDate = date.getDate() + 
										'/' + (date.getMonth()+1) + //months start from 0 
										'/' + date.getFullYear() ,
				fullTime = date.getHours() + 
										':' + date.getMinutes() + 
										':' + date.getSeconds(),

				//getting data from inputs to items
				items = new Item(
					$('#name').val(),
					$('#article').val(),
					$('#cost').val(),
					$('#number').val(),
					fullTime,
					fullDate
				);

		//this needs for bootstrap tooltips
		var html_tr = '<tr data-original-title= "' + items.article + '" rel="tooltip"></tr>';
		
		//add data to items table
		$(html_tr).appendTo('#items');

			var selection = $('<td>' + items.name + '</td>' +
					'<td>' + items.cost + '</td>' +
					'<td>' + items.number + '</td>' + 
					'<td>' + items.date + '</td>' + 
					'<td>' + items.time + '</td>'
				).appendTo('tbody tr:last-child');
	
		updateRows(selection);
		calculatedSum += items.number*items.cost;
		//sumArray.push(calculatedSum);
	});



	//need for dynamic content (dynamic rows)
	$("#items").on("mouseover", 'tr', function() {
 		$("[rel='tooltip']").tooltip({ placement: 'right' });
	});


	//calculate all goods with price*number
	$("#calculate").click(function(){
		alert('Общая сумма = ' + calculatedSum + '$');
	});


});

//delete rows on RMB-click and delete all tooltips on this page
var updateRows = function(selection) {
	selection.mousedown(function(event) {
		if (event.button == 2) {
			selection.parent('tr').remove();

			//remove bootstrap tooltips after deleting some row
			$('div[role=tooltip]').remove();  
		}
	});
}

//accept deleting if this is not header td's 
$('#items').on("click",'td', function(){
	if ( $(this).parent().is('tr[rel=tooltip]') ) {
		$(this).html(prompt('Enter new value:'));
	}
});
