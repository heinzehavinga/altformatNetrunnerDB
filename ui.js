var dc;
var checked = false;
//chrome.storage.local.clear()
$(function () {
    //    //Should probably add some UI to the screen
    //    $("#wrapper").append("<div class='row'><div class='col-xs-12'><h1>custom format checker</h1></div></div>");
    var patt1a = /deck\/edit/i;
    var patt1b = /deck\/build/i;
    var patt2 = /deck\/view/i;
    var patt3 = /\/decklist\//i;
    var rightPage = false;
    var uiChange;
    if (patt1a.test(location.pathname) || patt1b.test(location.pathname)) {
        
        //I want a new tab inserted here "alt format"
        //https://netrunnerdb.com/en/deck/edit/501311
        rightPage = true;
        uiChange = function (formats, formatResults) {
        
                $(".nav[role='tablist']").append('<li role="presentation"><a href="#tab-pane-altformat" aria-controls="tab-pane-altformat" role="tab" data-toggle="tab" id="tab-header-altformat">Alt format</a></li>');
                $(".tab-content").append('<div role="tabpanel" class="tab-pane active" id="tab-pane-altformat"></div>');
                $("#tab-pane-altformat").append('<table class="table table-condensed" id="table-alt"><thead><tr><th colspan="1"><span class="glyphicon glyphicon-barcode"></span> Alt formats</th></tr></thead><tbody></tbody></table>');
                createFormatRows(formats, formatResults);
                $(".tab-content").append('<button id="recheckDeck" class="btn">Recheck deck</button> ');
                $(".tab-content").append('<button id="newFormat" class="btn btn-success">New Format</button> ');
                $(".tab-content").append('<button id="importFormat" class="btn btn-primary">Import</button>');
                createEditForm($("#tab-pane-altformat"));
                createImportForm($("#tab-pane-altformat"));
                $(".importform").hide();
                $(".formatform").hide();
                $("#newFormat").click(function (event) {
                    emptyForm();
                    $(".formatform").show("slow", function () {
                        // Animation complete.
                    });
                });
                $("#importFormat").click(function (event) {
                    $(".importform").show("slow", function () {
                        // Animation complete.
                    });
                    $("#importString").val('');
                    $("#importFormatButton").show();
                });
                $(document.body).on('click', ".delete", function (e) {
                    var formatIndex = $(this).attr("data-index");
                    dc.deleteFormat(formatIndex);
                    $('.altformat' + formatIndex + '').fadeOut("slow", function () {
                        $('.altformat' + formatIndex + '').remove();
                        createFormatRows(dc.formats, dc.formatsErrors);
                    })
                });
                $(document.body).on('click', "#recheckDeck", function (e) {
                    event.preventDefault();
                    dc.checkDeck();
                    createFormatRows(dc.formats, dc.formatsErrors);
                });
                $(document.body).on('click', ".export", function (e) {
                    event.preventDefault();
                    var index = $(this).attr("data-index");
                    var text = dc.exportFormat(index);
                    $(".importform").show("slow", function () {
                        // Animation complete.
                    });
                    $("#importString").val(text);
                    $("#importFormatButton").hide();
                });
                $(document.body).on('click', ".edit", function (e) {
                    event.preventDefault();
                    var index = $(this).attr("data-index");
                    console.log("fill id", index);
                    fillForm(index);
                    $(".formatform").show("slow", function () {
                        // Animation complete.
                    });
                });
            }
            //Gatherup all the cards in the current deck
            
    }
    else if (patt2.test(location.pathname)) {
        
        //https://netrunnerdb.com/en/deck/view/501311
        rightPage = true;
        uiChange = function (formats, formatResults) {
            
            $.each(formatResults, function (index, formatResult) {
                var dataContent = createErrorString(formatResult.mgs);
            
                var iconString = ((formatResult.mgs.length > 0) ? "glyphicon-thumbs-down" : "glyphicon-thumbs-up");
                var colorString = ((formatResult.mgs.length > 0) ? "red" : "green");
            
                $("#latestpack").parent().append('<div id="alt_format"><span class="glyphicon ' + iconString + '" style="color:' + colorString + '"></span> <a href="#" class="altformat' + index + '" data-container="body" data-toggle="popover" data-placement="right" data-content=>' + formats[index].name + '</a></div>');
            
                qtip(".altformat" + index, dataContent, formats[index], formatResult);
            
                showErrors(".altformat" + index, formatResult.deckCards, formatResult);
            
            })
            
        };
    }
    else if (patt3.test(location.pathname)) {
        console.log("patt3");
        rightPage = true;
        uiChange = function (formats, formatResults) {
            
                $("#table-mwl").prepend('<table class="table table-condensed" id="table-alt"><thead><tr><th colspan="1"><span class="glyphicon glyphicon-barcode"></span> Alt formats</th></tr></thead><tbody></tbody></table>');
                $.each(formatResults, function (index, formatResult) {
                    var dataContent = createErrorString(formatResult.mgs);
                    var iconString = ((formatResult.mgs.length > 0) ? "glyphicon-thumbs-down" : "glyphicon-thumbs-up");
                    var colorString = ((formatResult.mgs.length > 0) ? "red" : "green");
                    $("#table-alt").append('<tr><td><span class="glyphicon ' + iconString + '" style="color:' + colorString + '"></span><a href="#" class="altformat' + index + '"> ' + formats[index].name + '</a></td></tr>');
                    qtip(".altformat" + index, dataContent, formats[index], formatResult);
                    showErrors(".altformat" + index, formatResult.deckCards);
                });
            }
            
            //https://netrunnerdb.com/en/decklist/36474/nexus-kate-remastered
            //Onder tools een nieuw lijstje met alle formats die je ingeladen hebt (misschien daar ook een description?)
    }
    if ($(".card").length > 0 && rightPage) {
        if (!checked) {
            dc = new DeckChecker(uiChange);
            checked = true;
        }
    }
    else {
        $(document).arrive(".card", function () {
            // 'this' refers to the newly created element
            if (!checked) {
                if (rightPage) {
                    
                    //give function with it to create the right UI differences;
                    dc = new DeckChecker(uiChange);
                    checked = true;
                }
            }
        });
    }
})

function createFormatRows(formats, formatResults) {
    $(".formatRows").remove();
    $.each(formatResults, function (index, formatResult) {
        var dataContent = createErrorString(formatResult.mgs);
        var iconString = ((formatResult.mgs.length > 0) ? "glyphicon-thumbs-down" : "glyphicon-thumbs-up");
        var colorString = ((formatResult.mgs.length > 0) ? "red" : "green");
        var tableRow = '<tr>';
        tableRow += '<td class="formatRows"><span class="glyphicon ' + iconString + '" style="color:' + colorString + '"></span><a href="#" class="altformat' + index + '"> ' + formats[index].name + '</a></td>'
        tableRow += '<td class="formatRows"><a href="#" class="export" data-index="' + index + '"><span class="glyphicon glyphicon-export" style="color:black;"></span></a></td>'
        tableRow += '<td class="formatRows"><a href="#" class="edit" data-index="' + index + '"><span class="glyphicon glyphicon-pencil" style="color:black;"></span></a></td>'
        tableRow += '<td class="formatRows"><a href="#" class="delete" data-index="' + index + '"><span class="glyphicon glyphicon-trash" style="color:black;"></span></a></td>'
        tableRow += '</tr>';
        $("#table-alt").append(tableRow);
        qtip(".altformat" + index, dataContent, formats[index], formatResult);
        showErrors(".altformat" + index, formatResult.deckCards);
    });
}

function qtip(selector, dataContent, format, formatResult) {
    
    var qtipString = '<div class="row"><div class="col-xs-12"><h4 class="card-title">' + format.name + '</h4>';
    qtipString += '<p class="card-info"><span class="card-type">Version</span><span class="card-keywords">: ' + format.version + '</span></p></div></div>';
    qtipString += '<div class="row"><div class="col-xs-6">';
    qtipString += '<div class="card-text border-shaper"><p>' + format.description + '</p></div>';
    qtipString += '<p class="card-faction" style="text-align:right;clear:right"><span class="author">' + format.author + '</span></p>';
    qtipString += '</div>';
    qtipString += '<div class="col-xs-6">';
    qtipString += dataContent;
    qtipString += '</div></div>';
    $(selector).qtip({ // Grab some elements to apply the tooltip to
        content: {
            text: qtipString
        }
        , style: {
            classes: 'qtip-bootstrap'
        }
        , position: {
            my: 'center left', // Position my top left...
            at: 'center right', // at the bottom right of...
            target: $(selector) // my target
        }
    })
}

function createImportForm(selector) {
    var formString = '<div class="importform">';
    formString += '<h4>Use JSON strings to import/export <span class="glyphicon glyphicon glyphicon-menu-up hidebtn" id="hidebtnimport"></span></h4>';
    formString += '<div class="form-group">';
    formString += '<textarea class="form-control" rows="4" id="importString" placeholder="importString"></textarea>';
    formString += '<button type="submit" id="importFormatButton" class="btn btn-default">Submit</button>';
    formString += '</div>';
    formString += '</div>';
    selector.append(formString);
    
    $("#hidebtnimport").click(function(event){
        $(".importform").hide("slow");
    })
    
    $("#importFormatButton").click(function (event) {
        event.preventDefault();
        var response = $("#importString").val();
        if (response) {
            try {
                var newFormat = JSON.parse(response);
                dc.importFormat(newFormat, function () {
                    console.log("callback");
                    dc.checkDeck();
                    createFormatRows(dc.formats, dc.formatsErrors);
                });
                $(".importform").hide();
                $("#importString").val("");
                $(".errorImport").remove();
//                return true;
            }
            catch (e) {
                console.log(e);
                $(".importform").append("<p class='errorImport'>Something is not right in this JSON string!</p>");
                setTimeout(function () {
                    $(".errorImport").fadeOut("slow", function () {
                        $(this).remove();
                    })
                }, 3000);
                return false; //error in the above string(in this case,yes)!
            }
        }
    })
}

function createErrorString(errors) {
    
    var errorString = "";
    if (errors.length == 0) {
        errorString = "This deck can be used in this format!";
    }
    else if (errors.length > 5) {
        
        while(errors[0] == ""){
            errors.splice(0,1);
        }
        
        errorString = errors.slice(0, 2).join("<br />");
        errorString += "<br />";
        errorString += '<span class="errorCard">' + (errors.length - 2) + ' more errors</span>';
    }
    else {
        for(var i=0;i<errors.length;i++){
            if(errors[i] != "" && errors[i] != undefined){
                errorString += errors[i] + "<br />";
            }
        }
    }
    return errorString;
}

function showErrors(selector, deckCards) {
    $(selector).click(function (event) {
        event.preventDefault();
        //color card with error
        $(".card").removeClass("errorCard").removeClass("wildCard");
        $.each(deckCards, function (index, card) {
            if (card.error) {
                $(".card[data-index='" + card.name + "']").addClass('errorCard');
            }
            else if (card.error === false) {
                $(".card[data-index='" + card.name + "']").addClass('wildCard');
            }
        });
    });
}