function createEditForm(selector) {
    var formString = '<div class="formatform"><form id="formatform">';
    formString += '<h4 class="title">Create new format <span class="glyphicon glyphicon glyphicon-menu-up hidebtn" id="hidebtnnew"></span></h4>';
    formString += '<div class="row"><div class="col-xs-6">';
    //Name   
    formString += '<div class="form-group">';
    formString += '<h3 class="title">Format details</h3>';
    formString += '<input type="hidden" id="new_or_edit" name="new_or_edit" value="-1">';
    formString += '<label for="name">Format name:</label>';
    formString += '<input type="text" class="form-control" id="formatform_name" placeholder="Name" required>';
    formString += '</div>';
    //Description
    formString += '<div class="form-group">';
    formString += '<label for="description">Format description:</label>';
    formString += '<textarea id="formatform_description" class="form-control" rows="3" required></textarea>'
    formString += '</div>';
    //Author
    formString += '<div class="form-group">';
    formString += '<label for="author">Format author:</label>';
    formString += '<input type="text" class="form-control" id="formatform_author" placeholder="author" required>';
    formString += '</div>';
    //Version
    formString += '<div class="form-group">';
    formString += '<label for="version">Version:</label>';
    formString += '<input type="text" class="form-control" id="formatform_version" placeholder="" required>';
    formString += '</div>';
    //URL
    formString += '<div class="form-group">';
    formString += '<label for="url">URL:</label>';
    formString += '<input type="text" class="form-control" id="formatform_url" placeholder="">';
    formString += '</div>';
    
    formString += '</div>';
    //Add rules + exceptions
    formString += '<div class="col-xs-6">';
    //Number of Cores
    formString += '<div class="form-group">';
    formString += '<h3 class="title">Format rules</h3>';
    formString += '<label for="allowedCores"><a href="#" id="label_formatform_allowedCores">Allowed Cores:</a></label>';
    formString += '<input type="number" min="0" max="3" class="form-control" id="formatform_allowedCores" placeholder="3">';
    formString += '</div>';
    //   "allowedPacks": ["*"],
    formString += '<div class="form-group">';
    formString += '<label for="allowedPacks"><a href="#" id="label_formatform_allowedPacks">Allowed packs:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_allowedPacks">';
    formString += '</div>';
    //   "allowedCylces": ["*"],
    formString += '<div class="form-group">';
    formString += '<label for="allowedCylces"><a href="#" id="label_formatform_allowedCylces">Allowed cycles:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_allowedCylces">';
    formString += '</div>';
    //   "allowedIDFactions": ["*"],
    formString += '<div class="form-group">';
    formString += '<label for="formatform_allowedIDFactions"><a href="#" id="label_formatform_allowedIDFactions">Allowed ID factions:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_allowedIDFactions">';
    formString += '</div>';
    //   "allowedCardFactions": ["*"],
    formString += '<div class="form-group">';
    formString += '<label for="formatform_allowedCardFactions"><a href="#" id="label_formatform_allowedCardFactions">Allowed cardfactions:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_allowedCardFactions">';
    formString += '</div>';
    //Number of Datapacks
    formString += '<div class="form-group">';
    formString += '<label for="formatform_allowedUniqueDataPacks"><a href="#" id="label_formatform_allowedUniqueDataPacks">Allowed number of datapacks:</a></label>';
    formString += '<input type="number" min="-1" class="form-control" id="formatform_allowedUniqueDataPacks">';
    formString += '</div>';
    //Number of Big expensions
    formString += '<div class="form-group">';
    formString += '<label for="formatform_allowedUniqueBigPacks"><a href="#" id="label_formatform_allowedUniqueBigPacks">Allowed number of big expansions:</a></label>';
    formString += '<input type="number" min="-1" class="form-control" id="formatform_allowedUniqueBigPacks">';
    formString += '</div>';
    //Forbidden cards
    formString += '<div class="form-group">';
    formString += '<label for="formatform_forbiddencards"><a href="#" id="label_formatform_forbiddencards">Forbidden cards:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_forbiddencards">';
    formString += '</div>';
    //exceptions
    formString += '<h3>Format exceptions</h3>';
    //exemptedTypeCodes
    formString += '<div class="form-group">';
    formString += '<label for="formatform_exemptedTypeCodes"><a href="#" id="label_formatform_exemptedTypeCodes">Exempted cardtypes:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_exemptedTypeCodes">';
    formString += '</div>';
    //exemptedPackCodes
    formString += '<div class="form-group">';
    formString += '<label for="formatform_exemptedPackCodes"><a href="#" id="label_formatform_exemptedPackCodes">Exempted packs:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_exemptedPackCodes">';
    formString += '</div>';
    //exemptedFactionCodes
    formString += '<div class="form-group">';
    formString += '<label for="formatform_exemptedFactionCodes"><a href="#" id="label_formatform_exemptedFactionCodes">Exempted cardfactions:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_exemptedFactionCodes">';
    formString += '</div>';
    //exemptedWildCards
    formString += '<div class="form-group">';
    formString += '<label for="exemptedFactionCodes" id="WildcardLabel">Wildcards:</label>';
    formString += '<div id="wildcard_field"></div>';
    formString += '<button class="btn btn-info" id="addWildCard">+</button>';
    formString += '<button class="btn btn-danger" id="removeWildCard">-</button>';
    formString += '</div>';
    //exemptedCards
    formString += '<div class="form-group">';
    formString += '<label for="exemptedCards"><a href="#" id="label_formatform_exemptedCards">Exempted cards:</a></label>';
    formString += '<input type="text" data-role="tagsinput" class="form-control taginput" id="formatform_exemptedCards">';
    formString += '</div>';
    formString += '<button id="submit" type="submit" class="btn btn-default submit-btn">Submit</button>';
    formString += '</div>';
    formString += '</div>';
    formString += '</div>';
    formString += '</form>';
    formString += '</div>';
    selector.append(formString);
    addTypeahead('#formatform_forbiddencards', "card");
    addTypeahead('#formatform_exemptedCards', "card");
    addTypeahead('#formatform_allowedPacks', "pack");
    addTypeahead('#formatform_exemptedPackCodes', "pack");
    addTypeahead('#formatform_allowedCylces', "cycle");
    addTypeahead('#formatform_allowedIDFactions', "faction");
    addTypeahead('#formatform_allowedCardFactions', "faction");
    addTypeahead('#formatform_exemptedFactionCodes', "faction");
    addTypeahead('#formatform_exemptedTypeCodes', "type");
    
    //Add qtips
    qtiphelp('#label_formatform_allowedCores', 'how many core set are allowed?', 'e.g. 1 just allows for 2 Scorched Earths in a deck');
    qtiphelp('#label_formatform_allowedPacks', 'which expansions are allowed?', 'don\'t use in combination with cycles, use expemted packs for this');
    qtiphelp('#label_formatform_allowedCylces', 'which cylces are allowed?', 'e.g. just the Core Set and Genesis cycle');
    qtiphelp('#label_formatform_allowedIDFactions', 'ID from which factions are allowed?', 'If you want to allow cards from some faction, but ID\'s from all, use exemptions!');
    qtiphelp('#label_formatform_allowedCardFactions', 'Cards from which factions are allowed?', 'e.g. This format only allows Anarch and Neutral cards');
    qtiphelp('#label_formatform_allowedUniqueDataPacks', 'Amount of unique datapacks you can use cards from', 'e.g. Decks in the format force you to build a deck using a single datapack');
    qtiphelp('#label_formatform_allowedUniqueBigPacks', 'Amount of unique big expansions you can use cards from', 'e.g. Decks in the format force you to build a deck using a single big expansion');
    qtiphelp('#label_formatform_exemptedTypeCodes', 'Which cardtype don\'t fall under the format rules?', 'e.g. You can still use all identities in this format');
    qtiphelp('#label_formatform_exemptedPackCodes', 'Which expansions don\'t fall under the format rules?', 'e.g. You can still use cards from Opening Moves');
    qtiphelp('#label_formatform_exemptedFactionCodes', 'Which factions don\'t fall under the format rules?', 'e.g. You can still use cards Adam');
    qtiphelp('#WildcardLabel', 'A number of cards, you can fill in any way you want', 'e.g. You can still chose two cards not allowed under the rules and have 3 copies of those in your deck');
    qtiphelp('#label_formatform_exemptedCards', 'Which factions don\'t fall under the format rules?', 'e.g. You can still use Jackson Howard in your deck');
    qtiphelp('#label_formatform_forbiddencards', 'which card are forbidden?', 'e.g. this format doesn\'t allow Heritage Committee');
    
    
    //Add events
    
    $("#hidebtnnew").click(function(event){
        $(".formatform").hide("slow");
    })
    
    $("#addWildCard").click(function (event) {
        event.preventDefault();
        var formString = '<div class="form-inline formatform_wildcard">';
        formString += '<div class="form-group">';
        formString += '<label for="formatform_exemptedFactionCodes">Unique wildcards:</label>';
        formString += '<input type="number" class="form-control uniqueWc">';
        formString += '</div>';
        formString += '<div class="form-group">';
        formString += '<label for="formatform_exemptedFactionCodes"> copies:</label>';
        formString += '<input type="number" class="form-control amountWc">';
        formString += '</div>';
        formString += '</div>';
        $("#wildcard_field").append(formString);
    })
    $("#removeWildCard").click(function (event) {
        event.preventDefault();
        $(".formatform_wildcard").last().remove();
    })
    $("#formatform").submit(function (event) {
        event.preventDefault();
        if ($("#new_or_edit").val() > -1) {    
            editFormat($("#new_or_edit").val());
        }
        else {
            saveFormat();
        }
    });
}

function emptyForm() {
    $('#formatform_forbiddencards').tagsinput('removeAll');
    $('#formatform_exemptedCards').tagsinput('removeAll');
    $('#formatform_allowedPacks').tagsinput('removeAll');
    $('#formatform_exemptedPackCodes').tagsinput('removeAll');
    $('#formatform_allowedCylces').tagsinput('removeAll');
    $('#formatform_allowedIDFactions').tagsinput('removeAll');
    $('#formatform_allowedCardFactions').tagsinput('removeAll');
    $('#formatform_exemptedFactionCodes').tagsinput('removeAll');
    $('#formatform_exemptedTypeCodes').tagsinput('removeAll');
    $(':input', '#formatform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
    $("#new_or_edit").val(-1);
    $(".formatform_wildcard").remove();
}

function fillForm(index) {
    emptyForm();
    $("#new_or_edit").val(index);
    var format = dc.formats[index];
    
    $("#formatform_name").val(format.name);
    $("#formatform_description").val(format.description);
    $("#formatform_author").val(format.author);
    $("#formatform_version").val(format.version);
    $("#formatform_url").val(format.url);
    $("#formatform_allowedCores").val(format.rules.allowedCores);
    
    $.each(dc.getPackNames(format.rules.allowedPacks), function (index, value) {
        if (value != "*") {
            $("#formatform_allowedPacks").tagsinput('add', value);
        }
    });
    $.each(format.rules.allowedCylces, function (index, value) {
        if (value != "*") {
            $("#formatform_allowedCylces").tagsinput('add', value);
        }
    });
    $.each(format.rules.allowedIDFactions, function (index, value) {
        if (value != "*") {
            $("#formatform_allowedIDFactions").tagsinput('add', value);
        }
    });
    $.each(format.rules.allowedCardFactions, function (index, value) {
        if (value != "*") {
            $("#formatform_allowedCardFactions").tagsinput('add', value);
        }
    });
    $("#formatform_allowedUniqueDataPacks").val(format.rules.allowedUniqueDataPacks);
    $("#formatform_allowedUniqueBigPacks").val(format.rules.allowedUniqueBigPacks);
    $.each(dc.getCardNames(format.rules.forbiddenCards), function (index, value) {
        $("#formatform_forbiddencards").tagsinput('add', value);
    });
    $.each(format.exceptions.exemptedTypeCodes, function (index, value) {
        $("#formatform_exemptedTypeCodes").tagsinput('add', value);
    });
    $.each(dc.getPackNames(format.exceptions.exemptedPackCodes), function (index, value) {
        $("#formatform_exemptedPackCodes").tagsinput('add', value);
    });
    $.each(format.exceptions.exemptedFactionCodes, function (index, value) {
        $("#formatform_exemptedFactionCodes").tagsinput('add', value);
    });
    $.each(format.exceptions.exemptedWildCards, function (index, value) {
        var formString = '<div class="form-inline formatform_wildcard">';
        formString += '<div class="form-group">';
        formString += '<label for="formatform_exemptedFactionCodes">Unique wildcards:</label>';
        formString += '<input type="number" class="form-control uniqueWc" value="' + value.uniqueCards + '">';
        formString += '</div>';
        formString += '<div class="form-group">';
        formString += '<label for="formatform_exemptedFactionCodes"> copies:</label>';
        formString += '<input type="number" class="form-control amountWc" value="' + value.amountofCards + '">';
        formString += '</div>';
        formString += '</div>';
        $("#wildcard_field").append(formString);
    })
    $.each(dc.getCardNames(format.exceptions.exemptedCards), function (index, value) {
        $("#formatform_exemptedCards").tagsinput('add', value);
    });
}

function editFormat(index) {
    //Delete current format
    dc.deleteFormat(index);
    saveFormat();
}

function saveFormat() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day;
    wildCards = [];
    $(".formatform_wildcard").each(function (index, value) {
        var wildCard = {
            "uniqueCards": $(".uniqueWc").eq(index).val()
            , "amountofCards": $(".amountWc").eq(index).val()
        }
        wildCards.push(wildCard);
    })
    
    var format = {
        "name": $("#formatform_name").val()
        , "description": $("#formatform_description").val()
        , "author": $("#formatform_author").val()
        , "version": $("#formatform_version").val()
        , "url": $("#formatform_url").val()
        , "created": newdate
        , "rules": {
            "allowedCores": (($("#formatform_allowedCores").val() != "") ? $("#formatform_allowedCores").val() : 3)
            , "allowedPacks": (($("#formatform_allowedPacks").val() != "") ? dc.getPackCode($("#formatform_allowedPacks").tagsinput('items')) : ["*"])
            , "allowedCylces": (($("#formatform_allowedCylces").val() != "") ? $("#formatform_allowedCylces").tagsinput('items').slice() : ["*"])
            , "allowedIDFactions": (($("#formatform_allowedIDFactions").val() != "") ? $("#formatform_allowedIDFactions").tagsinput('items').slice() : ["*"])
            , "allowedCardFactions": (($("#formatform_allowedCardFactions").val() != "") ? $("#formatform_allowedCardFactions").tagsinput('items').slice() : ["*"])
            , "allowedUniqueDataPacks": (($("#formatform_allowedUniqueDataPacks").val() != "") ? $("#formatform_allowedUniqueDataPacks").val() : -1)
            , "allowedUniqueBigPacks": (($("#formatform_allowedUniqueBigPacks").val() != "") ? $("#formatform_allowedUniqueBigPacks").val() : -1)
            , "forbiddenCards": (($("#formatform_forbiddencards").val() != "") ? dc.getCardIds($("#formatform_forbiddencards").tagsinput('items')) : [])
        }
        , "exceptions": {
            "exemptedTypeCodes": (($("#formatform_exemptedTypeCodes").val() != "") ? $("#formatform_exemptedTypeCodes").tagsinput('items').slice() : [])
            , "exemptedPackCodes": (($("#formatform_exemptedPackCodes").val() != "") ? dc.getPackCode($("#formatform_exemptedPackCodes").tagsinput('items')) : [])
            , "exemptedFactionCodes": (($("#formatform_exemptedFactionCodes").val() != "") ? $("#formatform_exemptedFactionCodes").tagsinput('items').slice() : [])
            , "exemptedWildCards": wildCards
            , "exemptedCards": (($("#formatform_exemptedCards").val() != "") ? dc.getCardIds($("#formatform_exemptedCards").tagsinput('items')) : [])
        }
    };
    
    dc.importFormat(format, function () {
        dc.checkDeck();
        createFormatRows(dc.formats, dc.formatsErrors);
        $(".formatform").toggle("slow", function () {
            // Animation complete.
        });
        emptyForm();
    });
}

function addTypeahead(selector, type) {
    var $input = $(selector);
    var objectList;
    if (type == "card") {
        objectList = $.map(dc.cards, function (obj, key) {
            return {
                "name": obj.title
                , "id": obj.title
            };
        });
    }
    else if (type == "pack") {
        objectList = $.map(dc.packList, function (obj, key) {
            return {
                "name": obj.name
                , "id": obj.name
            };
        });
    }
    else if (type == "cycle") {
        objectList = $.map(dc.cycles, function (obj, key) {
            return {
                "name": obj
                , "id": obj
            };
        });
    }
    else if (type == "type") {
        objectList = $.map(dc.types, function (obj, key) {
            return {
                "name": obj
                , "id": obj
            };
        });
    }
    else if (type == "faction") {
        objectList = $.map(dc.factions, function (obj, key) {
            return {
                "name": obj
                , "id": obj
            };
        });
    }
    var bh = new Bloodhound({
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        }
        , queryTokenizer: Bloodhound.tokenizers.whitespace
        , local: objectList
    });
    // initialize the bloodhound suggestion engine
    bh.initialize();
    // instantiate the typeahead UI
    $input.tagsinput({
        typeaheadjs: {
            name: 'bh'
            , displayKey: 'name'
            , valueKey: 'id'
            , source: bh.ttAdapter()
        }
    });
}

function qtiphelp(selector, info, example) {
    var qtipString = '<div class="row"><div class="col-xs-12">';
    qtipString += info;
    qtipString += '<br />';
    qtipString += '<span class="eg">'+example+'</span>';
    qtipString += '</div>';
    $(selector).qtip({ // Grab some elements to apply the tooltip to
        content: {
            text: qtipString
        }
        , style: {
            classes: 'qtip-bootstrap'
        }
        , position: {
            my: 'center right', // Position my top left...
            at: 'center left', // at the bottom right of...
            target: $(selector) // my target
        }
    })
}