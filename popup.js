$(function(){
    var doc = new jsPDF();

    $('#submit').on('click', function(){
      var query = $('#query').val();
      var resultList = [];
      chrome.storage.local.get(['baseUrl', 'username', 'password'], function(result) {
	      $.ajax({
	             url: result.baseUrl + '/rest/api/latest/search?jql=' + query + '&maxResults=500',
	             type: "GET",
	             beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Basic ' + btoa(result.username + ':' + result.password));},
	             success: function(json) { 
	             	$.each(json.issues, function(index, item) {
	             		resultList.push({'key': item.key, 'summary': item.fields.summary, 'priority' : item.fields.priority.name});
	             	})
	             	preparePdf(resultList);
	             }
	        });
  		});
    });

    function preparePdf(issues) {
    	var width = doc.internal.pageSize.getWidth();
    	var height = doc.internal.pageSize.getHeight();
    	var offset = height / 4;
    	var keyPositionY = 10;
    	var dividerPositionY = 15;
    	var summaryPositionY = 25;
    	var priorityPositionY = 38;
        var rectPositionY = 45;
    	var positionX = 10;
        var rectWidth = width * 0.8;
        var rectHeight = 10;
    	$.each(issues, function(index, item) {
    		var indexForPage = index % 4
    		if (index > 0 && indexForPage == 0) {
    			doc.addPage();
    		}
    		doc.setLineWidth(1);
    		doc.setDrawColor(100, 100, 100);
    		doc.rect(3, indexForPage * offset,  width - 6 , offset - 2);
    		doc.setFontSize('22');
    		doc.setFontStyle('bold');
    		doc.text(item.key, positionX, keyPositionY + indexForPage * offset);
    		doc.setFontStyle('normal');
    		doc.setFontSize('15');
    		doc.text('_____________________________', positionX, dividerPositionY + indexForPage * offset);
    		doc.text(padText(item.summary), positionX, summaryPositionY + indexForPage * offset);
    		doc.setFontStyle('italic');
    		doc.setFontSize('10');
    		doc.text('Priority: ' + item.priority, positionX, priorityPositionY + indexForPage * offset);
            setPriorityColor(item.priority, doc)
            doc.rect(positionX, rectPositionY + indexForPage * offset, rectWidth, rectHeight, 'F')
    	});
		doc.save('tickets.pdf');
    }

    function padText(text) {
        if (text.length > 80) {
            return text.substring(0, 80) + "...";
        }
        return text
    }

    function setPriorityColor(priority, doc) {
        var priorityColors = {
            'Unassigned' : unassigned,
            'Blocker' : blocker,
            'Critical' : critical,
            'High' : high,
            'Medium': medium,
            'Low' : low,
            'Lowest' : lowest,
            'P1': blocker,
            'P2': critical,
            'P3': high,
            'P4': medium,
            'P5': low
        }

        colorfunc = priorityColors[priority](doc);
    }

    function unassigned(doc) {
        doc.setFillColor(150, 150, 150)
    }
    function blocker(doc) {
        doc.setFillColor(255, 0, 0)
    }
    function critical(doc) {
        doc.setFillColor(255, 105, 0)
    }
    function high(doc) {
        doc.setFillColor(254, 253, 63)
    }
    function medium(doc) {
        doc.setFillColor(212, 244, 66)
    }
    function low(doc) {
        doc.setFillColor(0, 250, 0)
    }
    function lowest(doc) {
        doc.setFillColor(0,255,255)
    }



});

