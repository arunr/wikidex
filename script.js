 $(document).ready(function() {
	 $("#name").blur(getData);
	 $("#slide").hide();
 });


 var getData = function() {
 	var container = $('#data');
 	val = $("#name").val();
 	var url = "http://en.wikipedia.org/wiki/"+encodeURIComponent(val);
	
	$.getJSON(
		"http://query.yahooapis.com/v1/public/yql?" +
		"q=select%20*%20from%20html%20where%20url%3D%22" + 
		encodeURIComponent(url)+ 
		"%22&format=json'&callback=?",
		function(data){
			if(data.results[0]){
				var data = data.results[0];
				container.html(data);
			} else {
				containter.html("error");
			}
		}
	);
	
	$("#data").hide();
	$("#loading").html("Coming up shortly, hand crafted specially for you, a WikiDex about <strong><i>" + val + "</i></strong>");
	window.setTimeout(firstSlide, 10000);
 };

 var firstSlide = function() {
 	slideInits();
 	$("#substance").html(filterData($("#mw-content-text>p:eq(0)").html())); 	
 	$("#index").html("Slide #1");
 	$("#slide").fadeIn("slow");
 };

var control = function() {
	var id = null;
	if (event.srcElement.innerText === ">") {
	 	id = parseInt(($("#index").html().split("Slide #"))[1])+1;
	} else {
		id = parseInt(($("#index").html().split("Slide #"))[1])-1;
	}
 	var slide_number = "#mw-content-text>p:eq(" + id + ")";
 	slideInits();

 	$("#substance").html(filterData($(slide_number).html())); 	
 	$("#index").html("Slide #" + id);
};

var slideInits = function() {
	$("#title").html($("#firstHeading>span").html()); 	
	$("#left").html("<p><a href='#' id = 'prev'>&lt;</a></p>");	
	$("#right").html("<p><a href='#' id = 'next'>&gt;</a></p>");	
	$("#next").click(control);	 
	$("#prev").click(control);	 
 	$("#slide").fadeIn("slow");
};

var filterData = function(data) {
	data = replacePointies(data);
	elems = data.split(". ");

	var ret = "<ul>";
	for (elem in elems) {
		if (elems[elem] != "")
			ret += "<li>" + elems[elem] + "</li>";
	}
	ret += "</ul>";
	return ret;
};

/* Not proud of this function, but it works. The regexps arent working, to figure out why */
//data = data.replace(/<a href="(.*)".*>/g,RegExp.$1);
//data.match(/<a href=(.*)>(.*)<\/a>/ig);
//data = data.replace(/<sup>.*<\/sup>/, '');
//data = data.replace(/\r\n/, '\n').replace(/^(.*)\n*$/gm, RegExp.$1);
//data = data.replace(/<sup>.*<\/sup>/ig, '');
//data.replace(/\<a.*href=(.*)\>(.*)\<\/a\>/ig, RegExp.$1); 
var replacePointies = function(data) {
	var elems = data.split(/\r\n/);
	data = elems.join('');
	elems = data.split(/<\/sup>/ig); data = elems.join(''); elems =
	data.split(/<sup.*>*/ig); data = elems.join(''); elems =
	data.split(/<\/span>/ig); data = elems.join(''); elems =
	data.split(/<span.*>.*/ig); data = elems.join(''); elems =
	data.split(/\[.*\]/ig); data = elems.join('');
	elems = data.split(/<\/a>/ig);
	data = elems.join('');
	elems = data.split(/<a.*href=.*>/ig);
	data = elems.join('');
	return data;
}